import React, { useState, useEffect } from 'react'

const IndianWear = () => {
  // Complete product data with all the necessary properties
  const indianWearProducts = [
    {
      id: 1,
      name: 'Kanjivaram Pure Silk Saree',
      price: 15999,
      image: 'https://5.imimg.com/data5/SELLER/Default/2021/12/YN/VO/QG/52493242/kanjivaram-silk-saree-1000x1000.jpg',
      category: 'Saree',
      type: 'Kanjivaram',
      color: 'Red',
      occasion: 'Wedding'
    },
    {
      id: 2,
      name: 'Banarasi Silk Wedding Saree',
      price: 12999,
      image: 'https://5.imimg.com/data5/ANDROID/Default/2021/1/KI/VM/UG/42692862/product-jpeg-500x500.jpg',
      category: 'Saree',
      type: 'Banarasi',
      color: 'Gold',
      occasion: 'Wedding'
    },
    {
      id: 3,
      name: 'Mysore Pure Silk Saree',
      price: 8999,
      image: 'https://m.media-amazon.com/images/I/81Gy9RnKTQL._AC_UY1000_.jpg',
      category: 'Saree',
      type: 'Silk',
      color: 'Green',
      occasion: 'Festival'
    },
    {
      id: 4,
      name: 'Designer Anarkali Suit',
      price: 5999,
      image: 'https://m.media-amazon.com/images/I/61Nnb7vUPBL._AC_UY1000_.jpg',
      category: 'Anarkali',
      type: 'Embroidered',
      color: 'Blue',
      occasion: 'Party'
    },
    {
      id: 5,
      name: 'Bridal Lehenga Choli',
      price: 15999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/lehenga-choli/m/f/z/free-half-sleeve-bridal-lehenga-choli-for-wedding-red-color-original-imaggng8hhvfzfgz.jpeg',
      category: 'Lehenga',
      type: 'Bridal',
      color: 'Red',
      occasion: 'Wedding'
    },
    {
      id: 6,
      name: 'Designer Party Wear Gown',
      price: 7999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/gown/j/t/t/na-free-half-sleeve-semi-stitched-rayon-gown-pink-color-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Gown',
      type: 'Party Wear',
      color: 'Pink',
      occasion: 'Party'
    },
    {
      id: 7,
      name: 'Chanderi Cotton Saree',
      price: 3999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/d/a/t/free-chanderi-cotton-saree-with-blouse-piece-yellow-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Saree',
      type: 'Cotton',
      color: 'Yellow',
      occasion: 'Casual'
    },
    {
      id: 8,
      name: 'Patola Silk Saree',
      price: 9999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/p/a/t/free-patola-silk-saree-with-blouse-piece-purple-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Saree',
      type: 'Silk',
      color: 'Purple',
      occasion: 'Festival'
    },
    {
      id: 9,
      name: 'Georgette Party Wear Saree',
      price: 4599,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/b/g/w/free-georgette-saree-with-blouse-piece-blue-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Saree',
      type: 'Georgette',
      color: 'Blue',
      occasion: 'Party'
    },
    {
      id: 10,
      name: 'Chiffon Casual Saree',
      price: 2999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/sari/c/h/i/free-chiffon-saree-with-blouse-piece-pink-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Saree',
      type: 'Chiffon',
      color: 'Pink',
      occasion: 'Casual'
    },
    {
      id: 11,
      name: 'Embroidered Sharara Suit',
      price: 6999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/salwar-kurta-dupatta/s/h/a/free-sharara-suit-for-women-green-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Sharara',
      type: 'Embroidered',
      color: 'Green',
      occasion: 'Festival'
    },
    {
      id: 12,
      name: 'Designer Palazzo Suit',
      price: 4999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/salwar-kurta-dupatta/p/a/l/free-palazzo-suit-for-women-yellow-original-imaghvzhzgdpbkxh.jpeg',
      category: 'Palazzo',
      type: 'Designer',
      color: 'Yellow',
      occasion: 'Casual'
    }
  ]

  const [filteredProducts, setFilteredProducts] = useState(indianWearProducts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All Types')
  const [activeColor, setActiveColor] = useState('All Colors')
  const [activeOccasion, setActiveOccasion] = useState('All Occasions')
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [sortBy, setSortBy] = useState('default')

  // Categories for filter
  const categories = ['All', 'Saree', 'Lehenga', 'Anarkali', 'Gown']

  // Price ranges
  const priceRanges = [
    { label: 'All Prices', value: [0, 20000] },
    { label: 'Under ₹5,000', value: [0, 5000] },
    { label: '₹5,000 - ₹10,000', value: [5000, 10000] },
    { label: 'Above ₹10,000', value: [10000, 20000] }
  ]

  // Additional filter options
  const sareeTypes = [
    'All Types',
    'Kanjivaram',
    'Banarasi',
    'Silk',
    'Cotton',
    'Embroidered',
    'Bridal',
    'Party Wear'
  ]

  const colors = [
    'All Colors',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Pink',
    'Purple',
    'Gold'
  ]

  const occasions = [
    'All Occasions',
    'Wedding',
    'Festival',
    'Party',
    'Casual'
  ]

  // Apply filters
  useEffect(() => {
    let result = [...indianWearProducts]
    
    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(product => product.category === activeCategory)
    }
    
    // Type filter - only apply when a specific type is selected
    if (activeType !== 'All Types') {
      result = result.filter(product => product.type === activeType)
    }
    
    // Color filter - only apply when a specific color is selected
    if (activeColor !== 'All Colors') {
      result = result.filter(product => product.color === activeColor)
    }
    
    // Occasion filter - only apply when a specific occasion is selected
    if (activeOccasion !== 'All Occasions') {
      result = result.filter(product => product.occasion === activeOccasion)
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price)
    }
    
    setFilteredProducts(result)
  }, [activeCategory, activeType, activeColor, activeOccasion, priceRange, sortBy])

  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveCategory('All')
    setActiveType('All Types')
    setActiveColor('All Colors')
    setActiveOccasion('All Occasions')
    setPriceRange([0, 20000])
    setSortBy('default')
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Indian Wear Collection</h1>
      
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
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Type filters - show only when relevant */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {sareeTypes.map(type => (
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
            priceRange[1] !== 20000) && (
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

export default IndianWear