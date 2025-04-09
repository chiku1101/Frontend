import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null)
  
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })
    
    // Get Lenis instance
    const lenis = lenisRef.current
    
    // Make Lenis available globally for other components
    window.lenis = lenis
    
    // Create RAF function
    let rafId = null
    
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    
    // Start the loop
    rafId = requestAnimationFrame(raf)
    
    // Setup GSAP integration
    ScrollTrigger.scrollerProxy('body', {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value)
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0, 
          left: 0, 
          width: window.innerWidth, 
          height: window.innerHeight
        }
      },
      pinType: document.querySelector('body').style.transform ? "transform" : "fixed"
    })
    
    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)
    
    // Refresh ScrollTrigger on resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    
    resizeObserver.observe(document.body)
    
    // Clean up
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      resizeObserver.disconnect()
      window.lenis = null
    }
  }, [])
  
  return (
    <div className="smooth-wrapper">
      {children}
    </div>
  )
}

export default SmoothScroll 