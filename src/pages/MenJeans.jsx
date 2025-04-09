import React, { useState, useEffect, useMemo, useCallback } from 'react'

const MenJeans = () => {
  // Jeans specific products
  const jeansProducts = [
    {
      id: 1,
      name: 'Distressed Blue Jeans',
      price: 3999,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual',
      fit: 'Slim'
    },
    {
      id: 2,
      name: 'Black Straight Fit Jeans',
      price: 2999,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Black',
      occasion: 'Casual',
      fit: 'Straight'
    },
    {
      id: 3,
      name: 'Light Wash Regular Fit Jeans',
      price: 2499,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Light Blue',
      occasion: 'Casual',
      fit: 'Regular'
    },
    {
      id: 4,
      name: 'Dark Wash Skinny Jeans',
      price: 3499,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Dark Blue',
      occasion: 'Smart Casual',
      fit: 'Skinny'
    },
    {
      id: 5,
      name: 'Relaxed Fit Jeans',
      price: 2799,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Medium Blue',
      occasion: 'Casual',
      fit: 'Relaxed'
    },
    {
      id: 6,
      name: 'Bootcut Jeans',
      price: 3299,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Dark Blue',
      occasion: 'Smart Casual',
      fit: 'Bootcut'
    },
    {
      id: 7,
      name: 'Tapered Fit Jeans',
      price: 2999,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Grey',
      occasion: 'Smart Casual',
      fit: 'Tapered'
    },
    {
      id: 8,
      name: 'Acid Wash Jeans',
      price: 3599,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Light Blue',
      occasion: 'Casual',
      fit: 'Slim'
    },
    {
      id: 9,
      name: 'Carpenter Jeans',
      price: 3199,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual',
      fit: 'Relaxed'
    },
    {
      id: 10,
      name: 'Athletic Fit Jeans',
      price: 3399,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Dark Blue',
      occasion: 'Smart Casual',
      fit: 'Athletic'
    },
    {
      id: 11,
      name: 'Vintage Wash Jeans',
      price: 2899,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Medium Blue',
      occasion: 'Casual',
      fit: 'Regular'
    },
    {
      id: 12,
      name: 'Cargo Style Jeans',
      price: 3799,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Black',
      occasion: 'Casual',
      fit: 'Relaxed'
    },
    {
      id: 13,
      name: 'Premium Stretch Jeans',
      price: 4199,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Blue',
      occasion: 'Smart Casual',
      fit: 'Slim'
    },
    {
      id: 14,
      name: 'Raw Denim Jeans',
      price: 4499,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Smart Casual',
      color: 'Indigo',
      occasion: 'Smart Casual',
      fit: 'Straight'
    }
  ]

  const [filteredProducts, setFilteredProducts] = useState(jeansProducts)
  const [activeType, setActiveType] = useState('All Types')
  const [activeColor, setActiveColor] = useState('All Colors')
  const [activeFit, setActiveFit] = useState('All Fits')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('default')

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', value: [0, 5000] },
    { label: 'Under ₹2,500', value: [0, 2500] },
    { label: '₹2,500 - ₹3,500', value: [2500, 3500] },
    { label: 'Above ₹3,500', value: [3500, 5000] }
  ]

  // Filter options specific to jeans
  const jeansTypes = [
    'All Types',
    'Casual',
    'Smart Casual'
  ]

  const colors = [
    'All Colors',
    'Blue',
    'Black',
    'Light Blue',
    'Dark Blue'
  ]

  const fits = [
    'All Fits',
    'Slim',
    'Straight',
    'Regular',
    'Skinny'
  ]

  // Memoized filter functions
  const filterByType = useCallback((products, type) => {
    return type === 'All Types' ? products : products.filter(product => product.type === type)
  }, [])

  const filterByColor = useCallback((products, color) => {
    return color === 'All Colors' ? products : products.filter(product => product.color === color)
  }, [])

  const filterByFit = useCallback((products, fit) => {
    return fit === 'All Fits' ? products : products.filter(product => product.fit === fit)
  }, [])

  const filterByPrice = useCallback((products, range) => {
    return products.filter(product => product.price >= range[0] && product.price <= range[1])
  }, [])

  const sortProducts = useCallback((products, sortType) => {
    if (sortType === 'price-low-high') {
      return [...products].sort((a, b) => a.price - b.price)
    } else if (sortType === 'price-high-low') {
      return [...products].sort((a, b) => b.price - a.price)
    }
    return products
  }, [])

  // Memoized filtered products
  const filteredProductsResult = useMemo(() => {
    let result = filterByType(jeansProducts, activeType)
    result = filterByColor(result, activeColor)
    result = filterByFit(result, activeFit)
    result = filterByPrice(result, priceRange)
    result = sortProducts(result, sortBy)
    return result
  }, [activeType, activeColor, activeFit, priceRange, sortBy, filterByType, filterByColor, filterByFit, filterByPrice, sortProducts])

  // Update filtered products
  useEffect(() => {
    setFilteredProducts(filteredProductsResult)
  }, [filteredProductsResult])

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveType('All Types')
    setActiveColor('All Colors')
    setActiveFit('All Fits')
    setPriceRange([0, 5000])
    setSortBy('default')
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Men's Jeans Collection</h1>
      
      {/* Filters section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 flex-wrap">
          {/* Type filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {jeansTypes.map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeType === type 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeColor === color 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Fit filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Fits</h3>
            <div className="flex flex-wrap gap-2">
              {fits.map(fit => (
                <button
                  key={fit}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFit === fit 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFit(fit)}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>
          
          {/* Price range filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full ${
                    priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setPriceRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort options */}
          <div className="md:ml-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Active filters display */}
        <div className="flex items-center text-sm text-gray-600">
          <span>Showing {filteredProducts.length} products</span>
          {(activeType !== 'All Types' || 
            activeColor !== 'All Colors' || 
            activeFit !== 'All Fits' || 
            priceRange[0] !== 0 || 
            priceRange[1] !== 5000) && (
            <button 
              className="ml-4 text-[#e80071] hover:underline"
              onClick={clearAllFilters}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
      
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#" className="hover:text-[#e80071]">
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.fit} • {product.color} • {product.type}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products match your selected filters</p>
          <button 
            className="mt-4 px-4 py-2 bg-[#e80071] text-white rounded-md"
            onClick={clearAllFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default MenJeans