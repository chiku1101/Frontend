import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa'

const Floraldresses = () => {
  const { addToCart } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist()
  const [dresses, setDresses] = useState([
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
  
  const [filteredDresses, setFilteredDresses] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')  
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDress, setSelectedDress] = useState(null)
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

  // Filter dresses based on category and search query
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      let result = [...dresses]
      
      // Apply category filter
      if (activeFilter !== 'all') {
        result = result.filter(dress => dress.category === activeFilter)
      }
      
      // Apply search filter
      if (searchQuery) {
        result = result.filter(dress => 
          dress.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      setFilteredDresses(result)
      setIsLoading(false)
      setCurrentPage(1) // Reset to first page when filters change
    }, 500)
    
    return () => clearTimeout(timer)
  }, [activeFilter, searchQuery, dresses])

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDresses.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredDresses.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Quick view modal
  const openQuickView = (dress) => {
    setSelectedDress(dress)
  }

  const closeQuickView = () => {
    setSelectedDress(null)
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
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Floral Dresses Collection</h1>
          
          {/* Search bar */}
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search dresses..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e80071] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <FaSearch />
            </span>
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

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredDresses.length} {filteredDresses.length === 1 ? 'dress' : 'dresses'}
        </p>
        
        {/* Product grid with loading state */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredDresses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No dresses found matching your criteria</p>
            <button 
              className="mt-4 px-6 py-2 bg-[#e80071] text-white rounded-md hover:bg-[#c6005f] transition-colors duration-300"
              onClick={() => {
                setActiveFilter('all')
                setSearchQuery('')
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((dress) => (
              <div key={dress.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {/* New tag */}
                {dress.isNew && (
                  <div className="absolute top-2 left-2 z-10 bg-[#e80071] text-white text-xs font-bold px-2 py-1 rounded-md">
                    NEW
                  </div>
                )}
                
                {/* Quick view button */}
                <button 
                  onClick={() => openQuickView(dress)}
                  className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Quick view"
                >
                  👁️
                </button>
                
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold mb-1">{dress.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(dress.rating) ? '★' : i < dress.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({dress.rating})</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-gray-900">{dress.price}</span>
                    <span className="text-sm font-medium text-green-600">{dress.discount}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => addToCart(dress)}
                      className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        const isInWishlist = wishlistItems.some(item => item.id === dress.id)
                        if (isInWishlist) {
                          removeFromWishlist(dress.id)
                        } else {
                          addToWishlist({
                            id: dress.id,
                            name: dress.name,
                            price: dress.price,
                            image: dress.image
                          })
                        }
                      }}
                      className="w-10 flex items-center justify-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-300"
                    >
                      {wishlistItems.some(item => item.id === dress.id) ? (
                        <FaHeart className="w-4 h-4 text-[#e80071]" />
                      ) : (
                        <FaRegHeart className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && filteredDresses.length > 0 && (
          <div className="flex justify-center mt-10">
            <div className="flex space-x-1">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                &lt;
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#e80071] text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
        
        {/* Quick view modal */}
        {selectedDress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="relative">
                <button 
                  onClick={closeQuickView}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white z-10"
                >
                  ✕
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={selectedDress.image}
                      alt={selectedDress.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-2">{selectedDress.name}</h2>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(selectedDress.rating) ? '★' : i < selectedDress.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({selectedDress.rating})</span>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <span className="text-2xl font-bold text-gray-900 mr-3">{selectedDress.price}</span>
                      <span className="text-sm font-medium text-green-600">{selectedDress.discount}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      This beautiful {selectedDress.name.toLowerCase()} features a stunning floral pattern that's perfect for any occasion. Made with high-quality fabric for comfort and durability.
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Select Size</h3>
                      <div className="flex space-x-2">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <button key={size} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-[#e80071] hover:text-[#e80071]">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 mt-auto">
                      <button 
                        onClick={() => addToCart(selectedDress)}
                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => {
                          const isInWishlist = wishlistItems.some(item => item.id === selectedDress.id)
                          if (isInWishlist) {
                            removeFromWishlist(selectedDress.id)
                          } else {
                            addToWishlist({
                              id: selectedDress.id,
                              name: selectedDress.name,
                              price: selectedDress.price,
                              image: selectedDress.image
                            })
                          }
                        }}
                        className="w-12 flex items-center justify-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-300"
                      >
                        {wishlistItems.some(item => item.id === selectedDress.id) ? (
                          <FaHeart className="w-5 h-5 text-[#e80071]" />
                        ) : (
                          <FaRegHeart className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Floraldresses