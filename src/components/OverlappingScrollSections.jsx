import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OverlappingScrollSections = () => {
  const sectionsRef = useRef([])
  const containerRef = useRef(null)
  
  useEffect(() => {
    const sections = sectionsRef.current
    const container = containerRef.current
    
    if (!container || sections.length === 0) return
    
    // Set initial styles for better performance
    gsap.set(container, {
      overflow: 'hidden',
      height: '100vh',
      position: 'relative'
    })
    
    // Set initial styles for sections
    gsap.set(sections, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    })
    
    // Create overlapping scroll effects
    sections.forEach((section, index) => {
      // Skip the first section as it will be our base
      if (index === 0) {
        gsap.set(section, { zIndex: 1 })
        return
      }
      
      // Set initial position (off-screen)
      gsap.set(section, {
        y: '100vh',
        zIndex: index + 1
      })
      
      // Create scroll animation
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${index * 15}vh bottom`,
        end: `+=${window.innerHeight * 1.5}`,
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Smooth overlapping animation
          gsap.to(section, {
            y: `${100 - self.progress * 100}vh`,
            ease: 'none',
            duration: 0.1
          })
          
          // Scale and opacity effect for depth
          gsap.to(section, {
            scale: 0.9 + self.progress * 0.1,
            opacity: self.progress,
            duration: 0.1
          })
          
          // Parallax effect for previous section
          if (index > 1) {
            gsap.to(sections[index - 1], {
              y: `-${self.progress * 15}vh`,
              duration: 0.1,
              ease: 'none'
            })
          }
        }
      })
    })
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Generate random pastel background colors
  const generatePastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 80%)`
  }
  
  // Create section content
  const sections = [
    {
      title: 'Immersive Fashion',
      content: 'Explore our latest collections with interactive browsing',
      bgColor: generatePastelColor()
    },
    {
      title: 'Sustainable Choices',
      content: 'Eco-friendly materials for conscious shoppers',
      bgColor: generatePastelColor()
    },
    {
      title: 'Exclusive Designs',
      content: 'Limited edition pieces curated just for you',
      bgColor: generatePastelColor()
    },
    {
      title: 'Personal Styling',
      content: 'Get custom recommendations from our style experts',
      bgColor: generatePastelColor()
    }
  ]
  
  return (
    <div 
      className="overlapping-sections"
      ref={containerRef}
      style={{
        height: `${sections.length * 100}vh`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {sections.map((section, index) => (
        <div
          key={`section-${index}`}
          ref={el => sectionsRef.current[index] = el}
          className="section flex items-center justify-center flex-col text-center"
          style={{ 
            backgroundColor: section.bgColor,
            borderRadius: '20px',
            margin: '20px',
            height: 'calc(100% - 40px)'
          }}
        >
          <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
          <p className="text-xl max-w-md">{section.content}</p>
          
          <div className="mt-10">
            <button className="px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300">
              Explore More
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OverlappingScrollSections 