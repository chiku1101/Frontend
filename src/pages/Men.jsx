import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const Men = () => {
  const navigate = useNavigate()
  // Complete product data with all the necessary properties
  const menProducts = [
    {
      id: 1,
      name: 'Classic White Dress Shirt',
      price: 2499,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      category: 'Shirts',
      type: 'Formal',
      color: 'White',
      occasion: 'Formal'
    },
    {
      id: 2,
      name: 'Navy Blue Slim Fit Suit',
      price: 12999,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      category: 'Suits',
      type: 'Formal',
      color: 'Blue',
      occasion: 'Formal'
    },
    {
      id: 3,
      name: 'Distressed Blue Jeans',
      price: 3999,
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      category: 'Jeans',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual'
    },
    {
      id: 4,
      name: 'Graphic Print T-Shirt',
      price: 999,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Black',
      occasion: 'Casual'
    },
    {
      id: 5,
      name: 'Brown Leather Jacket',
      price: 7999,
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
      category: 'Jackets',
      type: 'Casual',
      color: 'Brown',
      occasion: 'Casual'
    },
    {
      id: 6,
      name: 'Khaki Chino Pants',
      price: 2999,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      category: 'Pants',
      type: 'Casual',
      color: 'Khaki',
      occasion: 'Smart Casual'
    },
    {
      id: 7,
      name: 'Striped Polo Shirt',
      price: 1499,
      image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg',
      category: 'T-Shirts',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual'
    },
    {
      id: 8,
      name: 'Black Formal Blazer',
      price: 8999,
      image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg',
      category: 'Suits',
      type: 'Formal',
      color: 'Black',
      occasion: 'Formal'
    },
    {
      id: 9,
      name: 'Denim Jacket',
      price: 4599,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      category: 'Jackets',
      type: 'Casual',
      color: 'Blue',
      occasion: 'Casual'
    },
    {
      id: 10,
      name: 'White Sneakers',
      price: 2999,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      category: 'Shoes',
      type: 'Casual',
      color: 'White',
      occasion: 'Casual'
    },
    {
      id: 11,
      name: 'Formal Oxford Shoes',
      price: 6999,
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
      category: 'Shoes',
      type: 'Formal',
      color: 'Brown',
      occasion: 'Formal'
    },
    {
      id: 12,
      name: 'Printed Summer Shirt',
      price: 1999,
      image: 'https://images.pexels.com/photos/1043148/pexels-photo-1043148.jpeg',
      category: 'Shirts',
      type: 'Casual',
      color: 'Multi',
      occasion: 'Casual'
    }
  ]

  const [filteredProducts, setFilteredProducts] = useState(menProducts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All Types')
  const [activeColor, setActiveColor] = useState('All Colors')
  const [activeOccasion, setActiveOccasion] = useState('All Occasions')
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [sortBy, setSortBy] = useState('default')

  // Categories for filter
  const categories = ['All', 'Shirts', 'Suits', 'Jeans', 'T-Shirts', 'Jackets', 'Pants', 'Shoes']

  const handleCategoryClick = (category) => {
    if (category === 'Jeans') {
      navigate('/men/jeans')
    } else if (category === 'Shirts') {
      navigate('/men/shirts')
    } else if (category === 'T-Shirts') {
      navigate('/men/tshirts')
    } else {
      setActiveCategory(category)
    }
  }

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', value: [0, 15000] },
    { label: 'Under ₹2,000', value: [0, 2000] },
    { label: '₹2,000 - ₹5,000', value: [2000, 5000] },
    { label: 'Above ₹5,000', value: [5000, 15000] }
  ]

  // Additional filter options
  const clothingTypes = [
    'All Types',
    'Formal',
    'Casual',
    'Smart Casual'
  ]

  const colors = [
    'All Colors',
    'White',
    'Black',
    'Blue',
    'Brown',
    'Khaki',
    'Multi'
  ]

  const occasions = [
    'All Occasions',
    'Formal',
    'Casual',
    'Smart Casual'
  ]

  // Memoized filter functions
  const filterByCategory = useCallback((products, category) => {
    return category === 'All' ? products : products.filter(product => product.category === category)
  }, [])

  const filterByType = useCallback((products, type) => {
    return type === 'All Types' ? products : products.filter(product => product.type === type)
  }, [])

  const filterByColor = useCallback((products, color) => {
    return color === 'All Colors' ? products : products.filter(product => product.color === color)
  }, [])

  const filterByOccasion = useCallback((products, occasion) => {
    return occasion === 'All Occasions' ? products : products.filter(product => product.occasion === occasion)
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
    let result = filterByCategory(menProducts, activeCategory)
    result = filterByType(result, activeType)
    result = filterByColor(result, activeColor)
    result = filterByOccasion(result, activeOccasion)
    result = filterByPrice(result, priceRange)
    result = sortProducts(result, sortBy)
    return result
  }, [activeCategory, activeType, activeColor, activeOccasion, priceRange, sortBy, filterByCategory, filterByType, filterByColor, filterByOccasion, filterByPrice, sortProducts])

  // Update filtered products
  useEffect(() => {
    setFilteredProducts(filteredProductsResult)
  }, [filteredProductsResult])

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveCategory('All')
    setActiveType('All Types')
    setActiveColor('All Colors')
    setActiveOccasion('All Occasions')
    setPriceRange([0, 15000])
    setSortBy('default')
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Men's Collection</h1>
      
      {/* Filters section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 flex-wrap">
          {/* Category filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeCategory === category 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Type filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {clothingTypes.map(type => (
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
          
          {/* Occasion filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Occasions</h3>
            <div className="flex flex-wrap gap-2">
              {occasions.map(occasion => (
                <button
                  key={occasion}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeOccasion === occasion 
                      ? 'bg-[#e80071] text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveOccasion(occasion)}
                >
                  {occasion}
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
          {(activeCategory !== 'All' || 
            activeType !== 'All Types' || 
            activeColor !== 'All Colors' || 
            activeOccasion !== 'All Occasions' || 
            priceRange[0] !== 0 || 
            priceRange[1] !== 15000) && (
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
                  {product.category} • {product.color} • {product.occasion}
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

export default Men