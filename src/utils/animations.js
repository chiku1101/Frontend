import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in animation with y-axis movement
 * @param {string} target - CSS selector or reference to DOM element
 * @param {Object} options - Animation options
 */
export const fadeInUp = (target, options = {}) => {
  const defaults = {
    y: 50,
    duration: 1,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: target,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
    ...options
  };

  return gsap.from(target, defaults);
};

/**
 * Fade in animation with scale
 * @param {string} target - CSS selector or reference to DOM element
 * @param {Object} options - Animation options
 */
export const fadeInScale = (target, options = {}) => {
  const defaults = {
    scale: 0.8,
    duration: 1,
    opacity: 0,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: target,
      start: 'top 75%',
      end: 'bottom 25%',
      toggleActions: 'play none none reverse',
    },
    ...options
  };

  return gsap.from(target, defaults);
};

/**
 * Staggered reveal animation for multiple elements
 * @param {string} target - CSS selector or reference to DOM elements
 * @param {Object} options - Animation options
 */
export const staggerReveal = (target, options = {}) => {
  const defaults = {
    y: 30,
    duration: 0.8,
    opacity: 0,
    ease: 'power1.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: target,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    ...options
  };

  return gsap.from(target, defaults);
};

/**
 * Parallax effect for background elements
 * @param {string} target - CSS selector or reference to DOM element
 * @param {Object} options - Animation options
 */
export const parallaxEffect = (target, options = {}) => {
  const defaults = {
    y: '-20%',
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    ...options
  };

  return gsap.to(target, defaults);
};