import React from 'react'
import { Link } from 'react-router-dom'

const TrendingCategories = () => {
  const trendingItems = [
    {
      title: 'Floral Dresses',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/women',
      gradient: 'from-[#ff7f50] to-[#ffa07a]'
    },
    {
      title: 'Breezy Kurta Sets',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/3146784/pexels-photo-3146784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/breezy-kurta',
      gradient: 'from-[#ffff00] to-[#fafad2]'
    },
    {
      title: 'Iconic Blue Denim',
      subtitle: 'Up to 70% off',
      image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/denim',
      gradient: 'from-[#87ceeb] to-[#b0e0e6]'
    },
    {
      title: 'Airy Co-ords',
      subtitle: 'Up to 70% off',
      image: 'https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/coords',
      gradient: 'from-[#ff69b4] to-[#ffc0cb]'
    },
    {
      title: 'Statement Handbags',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/handbags',
      gradient: 'from-[#dda0dd] to-[#e6e6fa]'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 tracking-tight">TRENDIEST CATEGORIES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.title}</h3>
                <p className="text-white/90 text-base font-medium transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingCategories