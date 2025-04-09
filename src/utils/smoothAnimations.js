/**
 * Smooth Animation Utilities for Premium UX
 */
import { gsap } from 'gsap';

/**
 * Advanced easing functions for ultra-smooth animations
 */
export const easings = {
  // Smooth elastic out - premium bounce effect
  elasticOut: (t) => {
    const c4 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 
      : t === 1 ? 1 
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  
  // Buttery smooth cubic bezier
  smoothOut: (t) => {
    return 1 - Math.pow(1 - t, 3);
  },
  
  // Extra premium smooth out
  premiumOut: (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  
  // Silky smooth bezier easing
  silky: (t) => {
    return t * t * (3 - 2 * t);
  },
  
  // Special bounce effect
  bounceOut: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }
};

/**
 * Apply premium scroll animation to an element
 * @param {HTMLElement} element - The element to animate
 * @param {Object} options - Animation options
 */
export const applyScrollAnimation = (element, options = {}) => {
  if (!element) return;
  
  const defaults = {
    opacity: [0, 1],
    y: [30, 0],
    duration: 0.8,
    ease: easings.premiumOut,
    stagger: 0.08,
    delay: 0
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.fromTo(element, 
    { 
      opacity: config.opacity[0], 
      y: config.y[0],
      transformPerspective: options.perspective || 600
    }, 
    { 
      opacity: config.opacity[1], 
      y: config.y[1],
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      delay: config.delay,
      clearProps: "transform"
    }
  );
};

/**
 * Create a smooth hover effect for an element
 * @param {HTMLElement} element - The element to apply hover to
 * @param {Object} options - Hover animation options
 */
export const applyHoverEffect = (element, options = {}) => {
  if (!element) return;
  
  const defaults = {
    scale: 1.05,
    y: -5,
    duration: 0.4,
    ease: "power2.out",
    hoverClass: ''
  };
  
  const config = { ...defaults, ...options };
  
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: config.scale,
      y: config.y,
      duration: config.duration,
      ease: config.ease
    });
    
    if (config.hoverClass) {
      element.classList.add(config.hoverClass);
    }
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: config.duration * 1.2,
      ease: config.ease
    });
    
    if (config.hoverClass) {
      element.classList.remove(config.hoverClass);
    }
  });
  
  return {
    cleanup: () => {
      element.removeEventListener('mouseenter', null);
      element.removeEventListener('mouseleave', null);
    }
  };
};

/**
 * Add parallax effect to elements on scroll
 * @param {HTMLElement} container - The container element
 * @param {NodeList|Array} elements - Elements to apply parallax to
 * @param {Object} options - Parallax options
 */
export const applyParallaxEffect = (container, elements, options = {}) => {
  if (!container || !elements || !elements.length) return;
  
  const defaults = {
    speed: 0.1,
    direction: 'vertical', // or 'horizontal'
    ease: 0.1
  };
  
  const config = { ...defaults, ...options };
  
  // Set initial positions
  elements.forEach(el => {
    gsap.set(el, { 
      willChange: 'transform',
      transformOrigin: 'center center'
    });
  });
  
  // Create parallax animation
  let scrollY = window.scrollY || window.pageYOffset;
  let ticking = false;
  
  const updateParallax = () => {
    elements.forEach((el, index) => {
      const speed = (config.speed * (index + 1) * 0.2) || config.speed;
      
      if (config.direction === 'vertical') {
        const yPos = -scrollY * speed;
        gsap.to(el, { 
          y: yPos, 
          ease: config.ease,
          duration: 0.6
        });
      } else {
        const xPos = -scrollY * speed;
        gsap.to(el, { 
          x: xPos, 
          ease: config.ease,
          duration: 0.6
        });
      }
    });
    ticking = false;
  };
  
  const onScroll = () => {
    scrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
  
  // Attach scroll event
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Return cleanup function
  return {
    cleanup: () => {
      window.removeEventListener('scroll', onScroll);
      elements.forEach(el => {
        gsap.set(el, { clearProps: 'all' });
      });
    }
  };
}; 