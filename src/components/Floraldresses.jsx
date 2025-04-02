import React from 'react'

const Floraldresses = () => {
  const dresses = [
    {
      id: 1,
      name: 'Summer Floral Maxi',
      price: '₹2,499',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '30% off'
    },
    {
      id: 2,
      name: 'Spring Bloom Dress',
      price: '₹1,999',
      image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '25% off'
    },
    {
      id: 3,
      name: 'Rose Garden Midi',
      price: '₹2,299',
      image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '20% off'
    },
    // Add more dresses as needed
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Floral Dresses Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dresses.map((dress) => (
          <div key={dress.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">{dress.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">{dress.price}</span>
                <span className="text-sm font-medium text-green-600">{dress.discount}</span>
              </div>
              <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Floraldresses