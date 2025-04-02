import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (item) => {
    addToCart(item)
    removeFromWishlist(item.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <span className="text-6xl">🤍</span>
        <h2 className="text-2xl font-semibold text-gray-800">Your wishlist is empty</h2>
        <p className="text-gray-600 text-center">Browse our categories and discover our best deals!</p>
        <Link to="/" className="mt-4 px-6 py-2 bg-[#e80071] text-white rounded-md hover:bg-[#c80064] transition-colors">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">My Wishlist ({wishlistItems.length} items)</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h3 className="text-gray-800 font-medium mb-2">{item.name}</h3>
            <p className="text-[#e80071] font-semibold mb-4">₹{item.price}</p>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full py-2 bg-[#e80071] text-white rounded-md hover:bg-[#c80064] transition-colors"
              >
                Move to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist