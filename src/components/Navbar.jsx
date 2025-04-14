import React, { useState } from 'react'
import { Search, Menu, X, LogOut, ShoppingBag, Heart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  // Update the destructuring at the top
  const { user, logout } = useAuth()  // Change currentUser to user

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* Top utility bar */}
      <div className="flex justify-end bg-gray-900 px-4 sm:px-8 py-2 text-xs gap-6 sm:gap-8">
        <Link to="/app-download" className="hover:text-[#e80071] transition-colors duration-200 flex items-center gap-1.5 text-gray-200">
          App Download
        </Link>
        <Link to="/help" className="hover:text-[#e80071] transition-colors duration-200 flex items-center gap-1.5 text-gray-200">
          Help Center
        </Link>
      </div>
      
      {/* Main navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and main navigation */}
            <div className="flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-[#e80071] whitespace-nowrap tracking-tight">
                EXROSS
              </Link>
              <div className="hidden md:flex space-x-6 lg:space-x-8 ml-10 lg:ml-12">
                <Link to="/women" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">Women</Link>
                <Link to="/men" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">Men</Link>
                <Link to="/kids" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">Kids</Link>
                <Link to="/home" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">Home</Link>
                <Link to="/brands" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">All Brands</Link>
                <Link to="/more" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium whitespace-nowrap">More</Link>
              </div>
            </div>

            {/* Search and user actions */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-md w-60 lg:w-80 border border-gray-200 focus-within:border-[#e80071] focus-within:ring-1 focus-within:ring-[#e80071] transition-all duration-200">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, styles, brands"
                  className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>
              <div className="hidden sm:flex items-center space-x-6 lg:space-x-8">
                {user ? (
                  <div className="flex items-center gap-6">
                    <Link 
                      to="/profile"
                      className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200"
                    >
                      <User size={18} className="text-gray-600" />
                      <span className="text-sm font-medium">
                        {user.name || user.email}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                    <User size={18} className="text-gray-600" />
                    <span className="text-sm font-medium">Login</span>
                  </Link>
                )}
                <Link to="/wishlist" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                  <Heart size={18} className="text-gray-600" />
                  <span className="text-sm font-medium">Wishlist</span>
                </Link>
                <Link to="/cart" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                  <div className="relative">
                    <ShoppingBag size={18} className="text-gray-600" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#e80071] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">Cart</span>
                </Link>
              </div>
              <button 
                className="md:hidden text-gray-700 hover:text-[#e80071] transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-5 border-t border-gray-100 mt-4 animate-fadeIn">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-md mb-5 border border-gray-200">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, styles, brands"
                  className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Link to="/women" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">Women</Link>
                <Link to="/men" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">Men</Link>
                <Link to="/kids" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">Kids</Link>
                <Link to="/home" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">Home</Link>
                <Link to="/brands" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">All Brands</Link>
                <Link to="/more" className="text-gray-700 hover:text-[#e80071] transition-colors duration-200 text-sm font-medium">More</Link>
                <div className="flex space-x-6 pt-4 border-t border-gray-100 mt-2">
                  {user ? (
                    <div className="flex items-center gap-6">
                      <Link 
                        to="/profile"
                        className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200"
                      >
                        <User size={18} className="text-gray-600" />
                        <span className="text-sm font-medium">
                          {user.name || user.email}
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                      <User size={18} className="text-gray-600" />
                      <span className="text-sm font-medium">Login</span>
                    </Link>
                  )}
                  <Link to="/wishlist" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                    <Heart size={18} className="text-gray-600" />
                    <span className="text-sm font-medium">Wishlist</span>
                  </Link>
                  <Link to="/cart" className="flex items-center gap-1.5 text-gray-700 hover:text-[#e80071] transition-colors duration-200">
                    <div className="relative">
                      <ShoppingBag size={18} className="text-gray-600" />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#e80071] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {getCartCount()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">Cart</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar