import React, { useState, useEffect } from 'react'

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070',
      title: 'SPRING SUMMER 2025',
      subtitle: "Your little crash-course on what's moving this season"
    },
    {
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
      title: 'NEW COLLECTION',
      subtitle: 'Discover the latest trends in fashion'
    },
    {
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070',
      title: 'LUXURY BRANDS',
      subtitle: 'Explore premium fashion at its finest'
    }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="bg-white">
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] w-full overflow-hidden rounded-lg shadow-md">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 cursor-pointer ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setCurrentImage(index)}
            style={{
              backgroundImage: `url('${image.url}')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#90B355]/80 to-transparent">
              <div className="max-w-[1440px] mx-auto px-6 sm:px-8 py-10 sm:py-14 md:py-20 lg:py-24">
                <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-5 leading-tight">
                    {image.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        <br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-md">
                    {image.subtitle}
                  </p>
                  <button className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-white text-[#90B355] font-medium rounded-full hover:bg-[#90B355] hover:text-white transition-all duration-300 shadow-md">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all cursor-pointer border border-white ${
                currentImage === index ? 'bg-white w-4 sm:w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner