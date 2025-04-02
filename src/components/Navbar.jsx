import React, { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()

  return (
    <>
      <div className="flex justify-end bg-black px-4 sm:px-6 py-1 text-xs gap-4 sm:gap-6 border-b border-white">
        <Link to="/app-download" className="hover:text-[#e80071] flex items-center gap-1 text-white">
          📱 App Download
        </Link>
        <Link to="/help" className="hover:text-[#e80071] flex items-center gap-1 text-white">
          ❔ Help
        </Link>
      </div>
      <nav className="sticky top-0 z-50 bg-white border-b border-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-[#e80071] whitespace-nowrap tracking-tight">
                EXROSS
              </Link>
              <div className="hidden md:flex space-x-6 lg:space-x-8 ml-8 lg:ml-10">
                <Link to="/women" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">Women</Link>
                <Link to="/men" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">Men</Link>
                <Link to="/kids" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">Kids</Link>
                <Link to="/home" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">Home</Link>
                <Link to="/brands" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">All Brands</Link>
                <Link to="/more" className="text-gray-800 hover:text-[#e80071] text-[13px] whitespace-nowrap">More</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-60 lg:w-80">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for products, styles, brands"
                  className="bg-transparent outline-none w-full text-[13px] text-gray-800 placeholder:text-gray-500"
                />
              </div>
              <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
                <Link to="/account" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                  <span className="text-lg">👤</span>
                  <span className="text-[13px] whitespace-nowrap">Account</span>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                  <span className="text-lg">🤍</span>
                  <span className="text-[13px] whitespace-nowrap">Wishlist</span>
                </Link>
                <Link to="/cart" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                  <div className="relative">
                    <span className="text-lg">🛒</span>
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#e80071] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] whitespace-nowrap">Cart</span>
                </Link>
              </div>
              <button 
                className="md:hidden text-gray-800 hover:text-[#e80071]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md mb-4">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for products, styles, brands"
                  className="bg-transparent outline-none w-full text-[13px] text-gray-800 placeholder:text-gray-500"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Link to="/women" className="text-gray-800 hover:text-[#e80071] text-[13px]">Women</Link>
                <Link to="/men" className="text-gray-800 hover:text-[#e80071] text-[13px]">Men</Link>
                <Link to="/kids" className="text-gray-800 hover:text-[#e80071] text-[13px]">Kids</Link>
                <Link to="/home" className="text-gray-800 hover:text-[#e80071] text-[13px]">Home</Link>
                <Link to="/brands" className="text-gray-800 hover:text-[#e80071] text-[13px]">All Brands</Link>
                <Link to="/more" className="text-gray-800 hover:text-[#e80071] text-[13px]">More</Link>
                <div className="flex space-x-4 pt-2">
                  <Link to="/account" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                    <span className="text-lg">👤</span>
                    <span className="text-[13px]">Account</span>
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                    <span className="text-lg">🤍</span>
                    <span className="text-[13px]">Wishlist</span>
                  </Link>
                  <Link to="/cart" className="flex items-center gap-1.5 text-gray-800 hover:text-[#e80071]">
                    <div className="relative">
                      <span className="text-lg">🛒</span>
                      {getCartCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#e80071] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {getCartCount()}
                        </span>
                      )}
                    </div>
                    <span className="text-[13px]">Cart</span>
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