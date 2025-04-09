import React from 'react'
import SmoothScroll from '../components/SmoothScroll'
import OverlappingScrollSections from '../components/OverlappingScrollSections'

const SmoothScrollDemo = () => {
  return (
    <SmoothScroll>
      <div className="smooth-scroll-demo">
        <section className="hero min-h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Immersive Scrolling Experience</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">Scroll down to experience smooth overlapping sections with Lenis</p>
          <div className="animate-bounce mt-20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
        
        <OverlappingScrollSections />
        
        <section className="call-to-action min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <div className="max-w-4xl p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Shopping Experience</h2>
            <p className="text-xl mb-8">Our innovative scrolling technique creates a more engaging and interactive shopping journey.</p>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all duration-300">
              Explore Collections
            </button>
          </div>
        </section>
      </div>
    </SmoothScroll>
  )
}

export default SmoothScrollDemo 