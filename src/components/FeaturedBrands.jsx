import React from 'react';

const FeaturedBrands = () => {
  const brands = [
    {
      id: 1,
      name: 'GLOBAL STORE',
      description: 'Your one-stop-shop for the latest trends from labels, around the world',
      image: '/images/global-store.svg',
      link: '/global-store'
    },
    {
      id: 2,
      name: 'HOUSE OF NYKAA',
      description: 'Explore the latest collections from our most loved in house labels',
      image: '/images/house-of-nykaa.svg',
      link: '/house-of-nykaa'
    },
    {
      id: 3,
      name: 'REVOLVE',
      description: 'Shop classic neutrals from 700+ celebrity approved brands',
      image: '/images/revolve.svg',
      link: '/revolve'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 tracking-tight">Featured Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="group relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-white"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-[450px] object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-300">
                <h3 className="text-3xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-[-8px]">{brand.name}</h3>
                <p className="text-base mb-6 text-gray-200 leading-relaxed transform transition-transform duration-300 group-hover:translate-y-[-8px]">{brand.description}</p>
                <a
                  href={brand.link}
                  className="inline-flex items-center text-base font-semibold text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  Explore {brand.name.split(' ')[0].toLowerCase()}
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;