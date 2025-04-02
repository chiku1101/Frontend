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
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
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
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
