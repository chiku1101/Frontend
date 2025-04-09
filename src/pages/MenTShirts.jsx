import React, { useState, useEffect, useMemo, useCallback } from 'react'

const MenTShirts = () => {
  // T-Shirts specific products
  const tshirtsProducts = [
    {
      id: 1,
      name: 'Graphic Print T-Shirt',
      price: 999,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Black',
      pattern: 'Graphic Print',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 2,
      name: 'Striped Polo Shirt',
      price: 1499,
      image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg',
      category: 'T-Shirts',
      type: 'Smart Casual',
      color: 'Blue',
      pattern: 'Striped',
      sleeve: 'Half',
      neckline: 'Polo'
    },
    {
      id: 3,
      name: 'Solid V-Neck T-Shirt',
      price: 799,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'White',
      pattern: 'Solid',
      sleeve: 'Half',
      neckline: 'V-Neck'
    },
    {
      id: 4,
      name: 'Full Sleeve Plain T-Shirt',
      price: 1299,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Grey',
      pattern: 'Solid',
      sleeve: 'Full',
      neckline: 'Round'
    },
    {
      id: 5,
      name: 'Henley Neck T-Shirt',
      price: 1199,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Navy',
      pattern: 'Solid',
      sleeve: 'Full',
      neckline: 'Henley'
    },
    {
      id: 6,
      name: 'Color Block T-Shirt',
      price: 1399,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Smart Casual',
      color: 'Multi',
      pattern: 'Color Block',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 7,
      name: 'Muscle Fit T-Shirt',
      price: 899,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Red',
      pattern: 'Solid',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 8,
      name: 'Vintage Print T-Shirt',
      price: 1599,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Black',
      pattern: 'Graphic Print',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 9,
      name: 'Long Line T-Shirt',
      price: 1299,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Smart Casual',
      color: 'White',
      pattern: 'Solid',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 10,
      name: 'Sports T-Shirt',
      price: 1699,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Blue',
      pattern: 'Solid',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 11,
      name: 'Tie-Dye T-Shirt',
      price: 1199,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Multi',
      pattern: 'Tie-Dye',
      sleeve: 'Half',
      neckline: 'Round'
    },
    {
      id: 12,
      name: 'Premium Polo T-Shirt',
      price: 1899,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Smart Casual',
      color: 'Green',
      pattern: 'Solid',
      sleeve: 'Half',
      neckline: 'Polo'
    },
    {
      id: 13,
      name: 'Raglan Sleeve T-Shirt',
      price: 1499,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Grey',
      pattern: 'Color Block',
      sleeve: 'Full',
      neckline: 'Round'
    },
    {
      id: 14,
      name: 'Minimal Design T-Shirt',
      price: 999,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Black',
      pattern: 'Minimal',
      sleeve: 'Half',
      neckline: 'V-Neck'
    }
  ]

  const [filteredProducts, setFilteredProducts] = useState(tshirtsProducts)
  const [activeType, setActiveType] = useState('All Types')
  const [activeColor, setActiveColor] = useState('All Colors')
  const [activePattern, setActivePattern] = useState('All Patterns')
  const [activeSleeve, setActiveSleeve] = useState('All Sleeves')
  const [activeNeckline, setActiveNeckline] = useState('All Necklines')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState('default')

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', value: [0, 2000] },
    { label: 'Under ₹1,000', value: [0, 1000] },
    { label: '₹1,000 - ₹1,500', value: [1000, 1500] },
    { label: 'Above ₹1,500', value: [1500, 2000] }
  ]

  // Filter options specific to t-shirts
  const tshirtTypes = [
    'All Types',
    'Casual',
    'Smart Casual'
  ]

  const colors = [
    'All Colors',
    'Black',
    'White',
    'Grey',
    'Blue'
  ]

  const patterns = [
    'All Patterns',
    'Solid',
    'Graphic Print',
    'Striped'
  ]

  const sleeves = [
    'All Sleeves',
    'Half',
    'Full'
  ]

  const necklines = [
    'All Necklines',
    'Round',
    'V-Neck',
    'Polo'
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

  const filterBySleeve = useCallback((products, sleeve) => {
    return sleeve === 'All Sleeves' ? products : products.filter(product => product.sleeve === sleeve)
  }, [])

  const filterByNeckline = useCallback((products, neckline) => {
    return neckline === 'All Necklines' ? products : products.filter(product => product.neckline === neckline)
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
    let result = filterByType(tshirtsProducts, activeType)
    result = filterByColor(result, activeColor)
    result = filterByPattern(result, activePattern)
    result = filterBySleeve(result, activeSleeve)
    result = filterByNeckline(result, activeNeckline)
    result = filterByPrice(result, priceRange)
    result = sortProducts(result, sortBy)
    return result
  }, [activeType, activeColor, activePattern, activeSleeve, activeNeckline, priceRange, sortBy, filterByType, filterByColor, filterByPattern, filterBySleeve, filterByNeckline, filterByPrice, sortProducts])

  // Update filtered products
  useEffect(() => {
    setFilteredProducts(filteredProductsResult)
  }, [filteredProductsResult])

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveType('All Types')
    setActiveColor('All Colors')
    setActivePattern('All Patterns')
    setActiveSleeve('All Sleeves')
    setActiveNeckline('All Necklines')
    setPriceRange([0, 2000])
    setSortBy('default')
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Men's T-Shirts Collection</h1>
      
      {/* Filters section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 flex-wrap">
          {/* Type filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {tshirtTypes.map(type => (
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

          {/* Sleeve filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sleeves</h3>
            <div className="flex flex-wrap gap-2">
              {sleeves.map(sleeve => (
                <button
                  key={sleeve}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeSleeve === sleeve 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSleeve(sleeve)}
                >
                  {sleeve}
                </button>
              ))}
            </div>
          </div>

          {/* Neckline filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Necklines</h3>
            <div className="flex flex-wrap gap-2">
              {necklines.map(neckline => (
                <button
                  key={neckline}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeNeckline === neckline 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveNeckline(neckline)}
                >
                  {neckline}
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
            activeSleeve !== 'All Sleeves' || 
            activeNeckline !== 'All Necklines' || 
            priceRange[0] !== 0 || 
            priceRange[1] !== 2000) && (
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
                  {product.pattern} • {product.sleeve} Sleeve • {product.neckline}
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

export default MenTShirts