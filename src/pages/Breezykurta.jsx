import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { loadScript } from '../utils/razorpay'

const Breezykurta = () => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [showQuickView, setShowQuickView] = useState(false)
  const { addToCart } = useCart()
  const [paymentLoading, setPaymentLoading] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const product = selectedProduct

  const handleAddToCart = () => {
    const sizeDetails = product.sizes[selectedSize]
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: sizeDetails.price,
      originalPrice: sizeDetails.originalPrice,
      discount: sizeDetails.discount,
      selectedSize,
      quantity: 1
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Product Grid - more responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.sizes['M'].discount}
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 truncate">{item.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-[#e80071]">{item.sizes['M'].price}</span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">{item.sizes['M'].originalPrice}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(item)}
                className="w-full bg-[#e80071] text-white py-1.5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-[#c6005f] transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Section - better responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Product Image - responsive aspect ratio */}
        <div className="aspect-square sm:aspect-auto sm:h-auto overflow-hidden rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="mt-3 sm:mt-4 flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{product.sizes[selectedSize].price}</span>
            <span className="text-base sm:text-lg text-gray-500 line-through">{product.sizes[selectedSize].originalPrice}</span>
            <span className="text-xs sm:text-sm font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{product.sizes[selectedSize].discount}</span>
          </div>

          {/* Size Selection - better layout for smaller screens */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.keys(product.sizes).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-medium
                    ${selectedSize === size
                      ? 'bg-[#e80071] text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Features */}
          <div className="mt-6 sm:mt-8">
            <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
            <div className="mt-2 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <p>• Premium cotton blend fabric</p>
              <p>• Breathable and comfortable</p>
              <p>• Traditional design with modern touch</p>
              <p>• Perfect for casual and festive wear</p>
              <p>• Easy maintenance and wrinkle-resistant</p>
            </div>
          </div>

          {/* CTA Buttons - stack on mobile */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => setShowQuickView(true)}
              className="w-full sm:flex-1 border border-[#e80071] text-[#e80071] py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#e80071] hover:text-white transition-colors duration-300 text-sm sm:text-base"
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Quick View
              </span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 bg-[#e80071] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#c6005f] transition-colors duration-300 text-sm sm:text-base"
            >
              Add to Cart
            </button>
          </div>

          {/* Modal - improved responsive design */}
          {showQuickView && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-2xl font-bold">{product.name}</h2>
                  <button
                    onClick={() => setShowQuickView(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                  />
                  <div>
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Size Guide</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        {Object.entries(product.sizes).map(([size, details]) => (
                          <div key={size} className="text-center p-2 sm:p-3 border rounded-lg">
                            <div className="font-bold text-sm sm:text-base mb-0.5 sm:mb-1">{size}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{details.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-gray-600">• Premium cotton blend fabric</p>
                      <p className="text-xs sm:text-sm text-gray-600">• Breathable and comfortable</p>
                      <p className="text-xs sm:text-sm text-gray-600">• Traditional design with modern touch</p>
                      <p className="text-xs sm:text-sm text-gray-600">• Perfect for casual and festive wear</p>
                      <p className="text-xs sm:text-sm text-gray-600">• Easy maintenance and wrinkle-resistant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Breezykurta