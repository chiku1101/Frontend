import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BallPitModal from './BallPitModal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { enableHardwareAcceleration, disableHardwareAcceleration } from '../utils/performance';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoriesRef = useRef(null);
  const categoryRefs = useRef([]);
  
  // List of categories that should show the ball pit
  const ballPitCategories = ['Footwear', 'Lingerie', 'Bags', 'Kids', 'Jewellery'];
  
  const categories = [
    {
      name: 'Indianwear',
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/indianwear'
    },
    {
      name: 'Westernwear',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/westernwear'
    },
    {
      name: 'Men',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/men'
    },
    {
      name: 'Footwear',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/footwear'
    },
    {
      name: 'Lingerie',
      image: 'https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/lingerie'
    },
    {
      name: 'Jewellery',
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/jewellery'
    },
    {
      name: 'Bags',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/bags'
    },
    {
      name: 'Kids',
      image: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/kids'
    },
  ];
  
  useEffect(() => {
    // Check for high-end device for better animations
    const isHighEndDevice = window.devicePixelRatio >= 2 || navigator.hardwareConcurrency > 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, skip intensive animations
    if (prefersReducedMotion) {
      gsap.set(categoryRefs.current, { opacity: 1 });
      return;
    }
    
    // GSAP animations for categories - extra smooth premium animations
    if (categoriesRef.current && categoryRefs.current.length) {
      // Apply hardware acceleration to improve performance
      categoryRefs.current.forEach(el => {
        if (el) enableHardwareAcceleration(el);
      });
      
      // Use device detection for animation approach
      const isMobile = window.innerWidth <= 768;
      
      // Premium smooth animation with staggered 3D effect
      gsap.set(categoryRefs.current, { 
        opacity: 0,
        y: isMobile ? 15 : 25, 
        rotationX: isHighEndDevice ? -5 : 0,
        transformPerspective: 600
      });
      
      // Create a master timeline for synchronized animations
      const masterTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
          duration: isHighEndDevice ? 0.7 : 0.5
        }
      });
      
      // Stagger animation for categories
      masterTl.to(categoryRefs.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: isHighEndDevice ? 0.08 : 0.06,
        onComplete: () => {
          // Remove hardware acceleration after animation
          categoryRefs.current.forEach(el => {
            if (el) {
              gsap.set(el, { clearProps: "transform,opacity" });
              disableHardwareAcceleration(el);
            }
          });
        }
      });
      
      // Add hover animations for each category
      categoryRefs.current.forEach(el => {
        if (el) {
          // Create hover effect
          el.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion && isHighEndDevice) {
              gsap.to(el, {
                y: -8,
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
              });
            }
          });
          
          el.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion && isHighEndDevice) {
              gsap.to(el, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });
        }
      });
      
      // Trigger the timeline with ScrollTrigger
      ScrollTrigger.create({
        trigger: categoriesRef.current,
        start: "top bottom-=80",
        onEnter: () => masterTl.play(),
        once: true
      });
    }
    
    return () => {
      // Clean up event listeners and ScrollTrigger instances
      categoryRefs.current.forEach(el => {
        if (el) {
          el.removeEventListener('mouseenter', null);
          el.removeEventListener('mouseleave', null);
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleCategoryClick = (category) => {
    if (ballPitCategories.includes(category.name)) {
      setSelectedCategory(category);
      setModalOpen(true);
      return false; // Prevent default navigation
    }
    return true; // Allow default navigation
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Shop By Category</h2>
        <p className="text-gray-600 text-sm md:text-base">Discover our curated collection of fashion and lifestyle products</p>
      </div>

      {/* Categories Grid */}
      <div 
        ref={categoriesRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8"
      >
        {categories.map((category, index) => (
          <div 
            key={category.name}
            ref={el => categoryRefs.current[index] = el}
            className="flex flex-col items-center group category-item"
          >
            {ballPitCategories.includes(category.name) ? (
              <div className="w-full aspect-square 
                rounded-xl overflow-hidden 
                bg-gradient-to-tr from-pink-100 via-pink-50 to-white 
                p-0.5 shadow-lg hover:shadow-2xl transition-all duration-300
                hover:from-pink-200 hover:via-pink-100 hover:to-pink-50
                transform hover:-translate-y-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover 
                      transform transition-all duration-500 ease-out
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
              </div>
            ) : (
              <Link
                to={category.link}
                className="w-full aspect-square
                  rounded-xl overflow-hidden 
                  bg-gradient-to-tr from-pink-100 via-pink-50 to-white 
                  p-0.5 shadow-lg hover:shadow-2xl transition-all duration-300
                  hover:from-pink-200 hover:via-pink-100 hover:to-pink-50
                  transform hover:-translate-y-1"
              >
                <div className="w-full h-full rounded-xl overflow-hidden bg-white relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover 
                      transform transition-all duration-500 ease-out
                      group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
              </Link>
            )}
            
            <span className="mt-3 text-sm font-semibold text-gray-800 
              transition-all duration-300 ease-in-out
              group-hover:text-[#e80071]">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-pink-50 to-white rounded-xl shadow-sm">
          <div className="text-center">
            <span className="text-3xl mb-3 block">🚚</span>
            <h3 className="font-semibold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders above ₹999</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-pink-50 to-white rounded-xl shadow-sm">
          <div className="text-center">
            <span className="text-3xl mb-3 block">⚡️</span>
            <h3 className="font-semibold text-gray-800 mb-2">Express Delivery</h3>
            <p className="text-sm text-gray-600">2-3 business days</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-pink-50 to-white rounded-xl shadow-sm">
          <div className="text-center">
            <span className="text-3xl mb-3 block">💫</span>
            <h3 className="font-semibold text-gray-800 mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600">100% quality guarantee</p>
          </div>
        </div>
      </div>

      {/* Ball Pit Modal */}
      {selectedCategory && (
        <BallPitModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          categoryName={selectedCategory.name}
          categoryLink={selectedCategory.link}
        />
      )}
    </div>
  );
};

export default Categories;