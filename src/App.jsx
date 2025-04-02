import React from 'react'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Floraldresses from './pages/Floraldresses'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Breezykurta from './pages/Breezykurta'
import Wishlist from './pages/Wishlist'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen">
              <CustomCursor />
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/women" element={<Floraldresses />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/breezy-kurta" element={<Breezykurta />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
