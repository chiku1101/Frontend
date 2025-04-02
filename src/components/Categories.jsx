import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = [
    {
      name: 'Indianwear',
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/indianwear'
    },
    {
      name: 'Westernwear',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/westernwear'
    },
    {
      name: 'Men',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/men'
    },
    {
      name: 'Footwear',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/footwear'
    },
    {
      name: 'Lingerie',
      image: 'https://images.pexels.com/photos/6311251/pexels-photo-6311251.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/lingerie'
    },
    {
      name: 'Jewellery',
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/jewellery'
    },
    {
      name: 'Bags',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/bags'
    },
    {
      name: 'Kids',
      image: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/kids'
    },
   
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex overflow-x-auto no-scrollbar gap-6 sm:gap-8 
        sm:grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 
        before:shrink-0 before:w-4 sm:before:w-0
        after:shrink-0 after:w-4 sm:after:w-0">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="flex flex-col items-center flex-shrink-0 group 
              transform transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] 
              rounded-full overflow-hidden 
              bg-gradient-to-tr from-pink-100 via-pink-50 to-white 
              p-0.5 shadow-sm hover:shadow-lg transition-all duration-300
              hover:from-pink-200 hover:via-pink-100 hover:to-pink-50">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover 
                    transform transition-all duration-500 ease-out
                    group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
            </div>
            <span className="mt-3 text-sm font-medium text-gray-800 
              transition-all duration-300 ease-in-out
              group-hover:text-[#e80071] group-hover:translate-y-0.5">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories