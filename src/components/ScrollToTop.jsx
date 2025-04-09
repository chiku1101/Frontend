import React, { useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Memoize the scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if ((scrollTop > 300 && !isVisible) || (scrollTop <= 300 && isVisible)) {
      setIsVisible(scrollTop > 300)
    }
  }, [isVisible])

  // Use passive event listener for better scroll performance
  useEffect(() => {
    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [handleScroll])

  const scrollToTop = () => {
    // First, create a smoother button animation
    gsap.to('#scroll-top-button', {
      scale: 0.9,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('#scroll-top-button', {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
    
    // Using Lenis for ultra-smooth scrolling
    if (window.lenis) {
      // Create a smooth scroll animation with GSAP integration
      const scrollDuration = 2.0; // Ultra smooth
      const scrollEasing = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      // Get current scroll position
      const currentPosition = window.scrollY || window.pageYOffset;
      const startTime = performance.now();
      
      // Prepare for scroll
      window.lenis.stop();
      
      // Create animation frame
      const smoothScroll = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (scrollDuration * 1000), 1);
        const easedProgress = scrollEasing(progress);
        
        // Calculate new position
        const newPosition = currentPosition * (1 - easedProgress);
        
        // Manually set scroll position
        window.scrollTo(0, newPosition);
        
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(smoothScroll);
        } else {
          window.lenis.start();
        }
      };
      
      requestAnimationFrame(smoothScroll);
    } else {
      // Fallback to native smooth scrolling
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Only render the button if it's visible to save rendering resources
  if (!isVisible) return null;

  return (
    <button
      id="scroll-top-button"
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-black/80 backdrop-blur-sm
        shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110
        hover:bg-black/90 focus:outline-none group translate-y-0 opacity-100"
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

export default ScrollToTop