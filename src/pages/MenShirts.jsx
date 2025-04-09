import React, { useState, useEffect, useMemo, useCallback } from 'react'

const MenShirts = () => {
  // Shirts specific products
  const shirtsProducts = [
    {
      id: 1,
      name: 'Classic White Business Shirt',
      price: 2499,
      image: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'White',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 2,
      name: 'Navy Blue Striped Shirt',
      price: 2799,
      image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg',
      category: 'Shirts',
      type: 'Smart Casual',
      color: 'Blue',
      occasion: 'Smart Casual',
      pattern: 'Striped'
    },
    {
      id: 3,
      name: 'Light Pink Oxford Shirt',
      price: 2299,
      image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
      category: 'Shirts',
      type: 'Smart Casual',
      color: 'Pink',
      occasion: 'Smart Casual',
      pattern: 'Solid'
    },
    {
      id: 4,
      name: 'Casual Denim Shirt',
      price: 2599,
      image: 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual',
      pattern: 'Solid'
    },
    {
      id: 5,
      name: 'Black Formal Shirt',
      price: 2899,
      image: 'https://images.pexels.com/photos/6626967/pexels-photo-6626967.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'Black',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 6,
      name: 'Floral Summer Shirt',
      price: 1999,
      image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Floral'
    },
    {
      id: 7,
      name: 'Light Blue Chambray Shirt',
      price: 2399,
      image: 'https://images.pexels.com/photos/6626959/pexels-photo-6626959.jpeg',
      category: 'Shirts',
      type: 'Smart Casual',
      color: 'Light Blue',
      occasion: 'Smart Casual',
      pattern: 'Solid'
    },
    {
      id: 8,
      name: 'Checkered Casual Shirt',
      price: 2199,
      image: 'https://images.pexels.com/photos/6626979/pexels-photo-6626979.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Checkered'
    },
    {
      id: 9,
      name: 'White Oxford Dress Shirt',
      price: 2699,
      image: 'https://images.pexels.com/photos/6626912/pexels-photo-6626912.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'White',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 10,
      name: 'Printed Resort Shirt',
      price: 1899,
      image: 'https://images.pexels.com/photos/5384427/pexels-photo-5384427.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Printed'
    },
    {
      id: 11,
      name: 'Grey Herringbone Shirt',
      price: 2799,
      image: 'https://images.pexels.com/photos/6626953/pexels-photo-6626953.jpeg',
      category: 'Shirts',
      type: 'Smart Casual',
      color: 'Grey',
      occasion: 'Smart Casual',
      pattern: 'Herringbone'
    },
    {
      id: 12,
      name: 'Linen Beach Shirt',
      price: 2299,
      image: 'https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Beige',
      occasion: 'Casual',
      pattern: 'Solid'
    },
    {
      id: 13,
      name: 'Classic White Dress Shirt',
      price: 2499,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'White',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 14,
      name: 'Printed Summer Shirt',
      price: 1999,
      image: 'https://images.pexels.com/photos/1043148/pexels-photo-1043148.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Printed'
    },
    {
      id: 15,
      name: 'Blue Striped Business Shirt',
      price: 2799,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'Blue',
      occasion: 'Formal',
      pattern: 'Striped'
    },
    {
      id: 16,
      name: 'Casual Checkered Shirt',
      price: 1799,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Checkered'
    },
    {
      id: 17,
      name: 'Oxford Business Shirt',
      price: 2599,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'Light Blue',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 18,
      name: 'Floral Print Casual Shirt',
      price: 1899,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Floral'
    },
    {
      id: 19,
      name: 'Slim Fit Dress Shirt',
      price: 2299,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'Pink',
      occasion: 'Formal',
      pattern: 'Solid'
    },
    {
      id: 20,
      name: 'Linen Beach Shirt',
      price: 2199,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Beige',
      occasion: 'Casual',
      pattern: 'Solid'
    },
    {
      id: 21,
      name: 'Pinstripe Business Shirt',
      price: 2899,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'White',
      occasion: 'Formal',
      pattern: 'Pinstripe'
    },
    {
      id: 22,
      name: 'Denim Casual Shirt',
      price: 2399,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual',
      pattern: 'Solid'
    },
    {
      id: 23,
      name: 'Mandarin Collar Shirt',
      price: 2499,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Smart Casual',
      color: 'White',
      occasion: 'Smart Casual',
      pattern: 'Solid'
    },
    {
      id: 24,
      name: 'Plaid Flannel Shirt',
      price: 1999,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Plaid'
    },
    {
      id: 25,
      name: 'Herringbone Dress Shirt',
      price: 2699,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'Grey',
      occasion: 'Formal',
      pattern: 'Herringbone'
    },
    {
      id: 26,
      name: 'Hawaiian Print Shirt',
      price: 1799,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual',
      pattern: 'Hawaiian'
    }
  ]

  const [filteredProducts, setFilteredProducts] = useState(shirtsProducts)
  const [activeType, setActiveType] = useState('All Types')
  const [activeColor, setActiveColor] = useState('All Colors')
  const [activePattern, setActivePattern] = useState('All Patterns')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('default')

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', value: [0, 5000] },
    { label: 'Under ₹2,000', value: [0, 2000] },
    { label: '₹2,000 - ₹3,000', value: [2000, 3000] },
    { label: 'Above ₹3,000', value: [3000, 5000] }
  ]

  // Filter options specific to shirts
  const shirtTypes = [
    'All Types',
    'Formal',
    'Casual',
    'Smart Casual'
  ]

  const colors = [
    'All Colors',
    'White',
    'Blue',
    'Black',
    'Multi'
  ]

  const patterns = [
    'All Patterns',
    'Solid',
    'Striped',
    'Checkered',
    'Printed'
  ]

  // Memoized filter functions
  const filterByType = useCallback((products, type) => {
    return type === 'All Types' ? products : products.filter(product => product.type === type)
  }, [])

  const filterByColor = useCallback((products, color) => {
    return color === 'All Colors' ? products : products.filter(product => product.color === color)
  }, [])

  const filterByPattern = useCallback((products, pattern) => {
    return pattern === 'All Patterns' ? products : products.filter(product => product.pattern === pattern)
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
    let result = filterByType(shirtsProducts, activeType)
    result = filterByColor(result, activeColor)
    result = filterByPattern(result, activePattern)
    result = filterByPrice(result, priceRange)
    result = sortProducts(result, sortBy)
    return result
  }, [activeType, activeColor, activePattern, priceRange, sortBy, filterByType, filterByColor, filterByPattern, filterByPrice, sortProducts])

  // Update filtered products
  useEffect(() => {
    setFilteredProducts(filteredProductsResult)
  }, [filteredProductsResult])

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveType('All Types')
    setActiveColor('All Colors')
    setActivePattern('All Patterns')
    setPriceRange([0, 5000])
    setSortBy('default')
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Men's Shirts Collection</h1>
      
      {/* Filters section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 flex-wrap">
          {/* Type filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {shirtTypes.map(type => (
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
          
          {/* Pattern filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Patterns</h3>
            <div className="flex flex-wrap gap-2">
              {patterns.map(pattern => (
                <button
                  key={pattern}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activePattern === pattern 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActivePattern(pattern)}
                >
                  {pattern}
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
            activePattern !== 'All Patterns' || 
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
                  {product.pattern} • {product.color} • {product.type}
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

export default MenShirts