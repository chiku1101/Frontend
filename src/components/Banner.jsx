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
    <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-full overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#90B355]/90 to-transparent">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
              <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4">
                  {image.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      <br />
                    </React.Fragment>
                  ))}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all cursor-pointer hover:bg-white ${
              currentImage === index ? 'bg-white w-3 sm:w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner