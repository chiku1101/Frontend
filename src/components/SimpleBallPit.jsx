import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SimpleBallPit = ({ categoryName }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set parent container to black
    const parentElement = canvas.parentElement;
    if (parentElement) {
      parentElement.style.backgroundColor = '#000000';
    }
    
    // Colors for different categories
    const categoryColors = {
      'Footwear': ['#6ecbf5', '#ffffff', '#2c8cb5'], // Blue-white like in the image
      'Lingerie': ['#800080', '#ffffff', '#D8BFD8'], // Purple and white
      'Bags': ['#8B4513', '#ffffff', '#DEB887'], // Brown and white
      'Kids': ['#FF8C00', '#ffffff', '#FFD700'], // Orange-yellow and white
      'Jewellery': ['#DAA520', '#ffffff', '#B8860B'], // Gold and white
      'Statement Handbags': ['#8B4513', '#ffffff', '#DEB887'], // Same as Bags
      'default': ['#6ecbf5', '#ffffff', '#2c8cb5'] // Default blue-white like in the image
    };
    
    // Get colors for this category
    const colors = categoryColors[categoryName] || categoryColors.default;
    
    // Setup basic Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(
      60, 
      canvas.clientWidth / canvas.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create balls
    const balls = [];
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create 50 balls with random positions and sizes
    for (let i = 0; i < 50; i++) {
      // Choose color from our palette
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = new THREE.Color(colors[colorIndex]);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        reflectivity: 1.0
      });
      
      const ball = new THREE.Mesh(ballGeometry, material);
      
      // Position balls at the bottom of the container, with some variation
      const size = 0.5 + Math.random() * 0.8;
      ball.scale.set(size, size, size);
      
      // Spread balls horizontally, with a curve (more at bottom, some at top)
      const xRange = 12;
      const x = (Math.random() * 2 - 1) * xRange;
      
      // Position in the lower half of the container, with some in the upper area
      const yBottom = -4;
      const yHeight = 8;
      let y;
      
      // 80% of balls at bottom, 20% higher up
      if (Math.random() < 0.8) {
        y = yBottom + Math.random() * (yHeight * 0.5); // Lower half
      } else {
        y = yBottom + (yHeight * 0.5) + Math.random() * (yHeight * 0.5); // Upper half
      }
      
      // Some balls in front, some in back
      const zRange = 4;
      const z = (Math.random() * 2 - 1) * zRange;
      
      ball.position.set(x, y, z);
      
      // Also add random rotation
      ball.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store velocity for animation
      ball.userData.velocity = {
        x: 0,
        y: 0,
        z: 0
      };
      
      scene.add(ball);
      balls.push(ball);
    }
    
    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Simple physics-like motion
      balls.forEach(ball => {
        // Apply "gravity" and movement
        ball.userData.velocity.y += -0.005; // Gravity
        
        // Apply some horizontal drift
        if (Math.random() < 0.05) {
          ball.userData.velocity.x += (Math.random() * 2 - 1) * 0.01;
        }
        
        // Apply some z drift
        if (Math.random() < 0.05) {
          ball.userData.velocity.z += (Math.random() * 2 - 1) * 0.01;
        }
        
        // Apply velocity
        ball.position.x += ball.userData.velocity.x;
        ball.position.y += ball.userData.velocity.y;
        ball.position.z += ball.userData.velocity.z;
        
        // Add rotation for visual interest
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;
        
        // Boundary bounce - bottom
        if (ball.position.y < -5) {
          ball.position.y = -5;
          ball.userData.velocity.y = -ball.userData.velocity.y * 0.7; // Bounce with energy loss
          
          // Add random horizontal movement on bounce
          ball.userData.velocity.x = (Math.random() * 2 - 1) * 0.05;
          ball.userData.velocity.z = (Math.random() * 2 - 1) * 0.05;
        }
        
        // Boundary bounce - top (less likely to hit)
        if (ball.position.y > 5) {
          ball.position.y = 5;
          ball.userData.velocity.y = -ball.userData.velocity.y * 0.7;
        }
        
        // Boundary bounce - sides
        if (Math.abs(ball.position.x) > 12) {
          ball.position.x = Math.sign(ball.position.x) * 12;
          ball.userData.velocity.x = -ball.userData.velocity.x * 0.7;
        }
        
        // Boundary bounce - z
        if (Math.abs(ball.position.z) > 5) {
          ball.position.z = Math.sign(ball.position.z) * 5;
          ball.userData.velocity.z = -ball.userData.velocity.z * 0.7;
        }
        
        // Apply friction/drag to slow motion
        ball.userData.velocity.x *= 0.99;
        ball.userData.velocity.z *= 0.99;
      });
      
      // Render scene
      renderer.render(scene, camera);
      
      // Store scene for cleanup
      sceneRef.current = { 
        scene, 
        renderer, 
        animationId
      };
    };
    
    // Handle resize
    const handleResize = () => {
      if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }
    };
    
    // Initial size setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        
        // Dispose resources
        balls.forEach(ball => {
          ball.geometry.dispose();
          ball.material.dispose();
          scene.remove(ball);
        });
        
        sceneRef.current.renderer.dispose();
      }
    };
  }, [categoryName]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ 
        background: 'black'
      }}
    />
  );
};

export default SimpleBallPit; 