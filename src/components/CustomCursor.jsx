import React, { useEffect, useState, useRef } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cursorRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const updateCursor = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (cursorRef.current) {
        const x = lerp(position.x, targetRef.current.x, 0.25)
        const y = lerp(position.y, targetRef.current.y, 0.25)
        setPosition({ x, y })
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') ||
          e.target.closest('button') ||
          e.target.closest('.group')) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseover', handleMouseOver)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [position])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'hover' : ''}`}
      style={{
        transform: 'translate3d(0px, 0px, 0)',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease'
      }}
    />
  )
}

export default CustomCursor