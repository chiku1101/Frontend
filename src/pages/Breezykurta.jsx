import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Breezykurta = () => {
  const { addToCart } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const [kurtas, setKurtas] = useState([
    {
      id: 1,
      name: 'Summer Floral Maxi',
      price: '₹2,499',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '30% off',
      category: 'maxi',
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      name: 'Spring Bloom Dress',
      price: '₹1,999',
      image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '25% off',
      category: 'midi',
      rating: 4.2,
      isNew: false
    },
    {
      id: 3,
      name: 'Rose Garden Midi',
      price: '₹2,299',
      image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '20% off',
      category: 'midi',
      rating: 4.7,
      isNew: true
    },
    {
      id: 4,
      name: 'Botanical Print Sundress',
      price: '₹1,799',
      image: 'https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '15% off',
      category: 'mini',
      rating: 4.0,
      isNew: false
    },
    {
      id: 5,
      name: 'Tropical Paradise Dress',
      price: '₹2,699',
      image: 'https://images.pexels.com/photos/7691384/pexels-photo-7691384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '10% off',
      category: 'maxi',
      rating: 4.8,
      isNew: true
    },
    {
      id: 6,
      name: 'Floral Embroidered Gown',
      price: '₹3,499',
      image: 'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '35% off',
      category: 'gown',
      rating: 4.9,
      isNew: false
    },
    {
      id: 7,
      name: 'Cherry Blossom Mini',
      price: '₹1,599',
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '20% off',
      category: 'mini',
      rating: 4.3,
      isNew: true
    },
    {
      id: 8,
      name: 'Wildflower Wrap Dress',
      price: '₹2,199',
      image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      discount: '15% off',
      category: 'wrap',
      rating: 4.6,
      isNew: false
    }
  ])
  
  const [filteredKurtas, setFilteredKurtas] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')  
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedKurta, setSelectedKurta] = useState(null)
  const itemsPerPage = 4

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Dresses' },
    { id: 'maxi', name: 'Maxi Dresses' },
    { id: 'midi', name: 'Midi Dresses' },
    { id: 'mini', name: 'Mini Dresses' },
    { id: 'gown', name: 'Gowns' },
    { id: 'wrap', name: 'Wrap Dresses' }
  ]

  // Filter kurtas based on category and search query
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      let result = [...kurtas]
      
      // Apply category filter
      if (activeFilter !== 'all') {
        result = result.filter(kurta => kurta.category === activeFilter)
      }
      
      // Apply search filter
      if (searchQuery) {
        result = result.filter(kurta => 
          kurta.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      setFilteredKurtas(result)
      setIsLoading(false)
      setCurrentPage(1) // Reset to first page when filters change
    }, 500)
    
    return () => clearTimeout(timer)
  }, [activeFilter, searchQuery, kurtas])

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredKurtas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredKurtas.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
          <div className="p-4 bg-white">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Breezy Kurta Collection</h1>
        
        {/* Search bar */}
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search kurtas..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex overflow-x-auto no-scrollbar pb-4 mb-6 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${activeFilter === category.id ? 'bg-[#e80071] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                {item.isNew && (
                  <span className="absolute top-2 left-2 bg-[#e80071] text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.discount}
                </span>
                <button
                  onClick={() => {
                    const isInWishlist = wishlistItems.some(wishlistItem => wishlistItem.id === item.id);
                    if (isInWishlist) {
                      removeFromWishlist(item.id);
                    } else {
                      addToWishlist({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image
                      });
                    }
                  }}
                  className="absolute top-2 right-8 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-[#e80071] hover:text-white transition-all duration-300"
                >
                  {wishlistItems.some(wishlistItem => wishlistItem.id === item.id) ? (
                    <FaHeart className="w-4 h-4 text-[#e80071] hover:text-white" />
                  ) : (
                    <FaRegHeart className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">{item.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-sm ${index < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#e80071]">{item.price}</span>
                  <button
                    onClick={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: 1
                    })}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && filteredKurtas.length > 0 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#e80071] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      
      {/* No results message */}
      {!isLoading && filteredKurtas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}

export default Breezykurta