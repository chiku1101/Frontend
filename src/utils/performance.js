/**
 * Performance utilities for smoother animations and scrolling
 */

// Throttle function to limit how often a function runs
export const throttle = (callback, delay = 150) => {
  let isThrottled = false;
  
  return function(...args) {
    if (!isThrottled) {
      callback.apply(this, args);
      isThrottled = true;
      
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
};

// Debounce function to wait until a function hasn't been called for a specified time
export const debounce = (callback, delay = 300) => {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

// RAF (requestAnimationFrame) throttle for high-performance animations
export const rafThrottle = (callback) => {
  let ticking = false;
  
  return function(...args) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Optimize GSAP animations
export const optimizeGSAP = (timeline) => {
  if (!timeline) return timeline;
  
  return timeline.invalidate().restart()
    .eventCallback('onComplete', () => {
      // Clear transforms and other expensive properties after animation
      const targets = timeline.getChildren()
        .reduce((acc, child) => [...acc, ...(child.targets() || [])], []);
      
      // Clear props that might cause lag
      if (targets.length) {
        targets.forEach(target => {
          if (target && target.style) {
            target.style.willChange = 'auto';
          }
        });
      }
    });
};

// Enable hardware acceleration for an element
export const enableHardwareAcceleration = (element) => {
  if (!element || !element.style) return;
  
  element.style.transform = 'translateZ(0)';
  element.style.willChange = 'transform, opacity';
  
  // Force GPU rendering
  element.style.backfaceVisibility = 'hidden';
};

// Disable hardware acceleration when no longer needed
export const disableHardwareAcceleration = (element) => {
  if (!element || !element.style) return;
  
  element.style.willChange = 'auto';
  element.style.backfaceVisibility = 'visible';
}; 