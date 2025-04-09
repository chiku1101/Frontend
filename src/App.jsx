import React from 'react'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import Floraldresses from './pages/Floraldresses'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Breezykurta from './pages/Breezykurta'
import Wishlist from './pages/Wishlist'
import IndianWear from './pages/IndianWear'
import Men from './pages/Men'
import MenJeans from './pages/MenJeans'
import MenShirts from './pages/MenShirts'
import MenTShirts from './pages/MenTShirts'
import SmoothScrollDemo from './pages/SmoothScrollDemo'
import Login from './pages/Login'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SmoothScroll>
                <div className="min-h-screen">
                  <CustomCursor />
                  <ScrollToTop />
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/women" element={<ProtectedRoute><Floraldresses /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/breezy-kurta" element={<ProtectedRoute><Breezykurta /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/indianwear" element={<ProtectedRoute><IndianWear /></ProtectedRoute>} />
                    <Route path="/men" element={<ProtectedRoute><Men /></ProtectedRoute>} />
                    <Route path="/men/jeans" element={<ProtectedRoute><MenJeans /></ProtectedRoute>} />
                    <Route path="/men/shirts" element={<ProtectedRoute><MenShirts /></ProtectedRoute>} />
                    <Route path="/men/tshirts" element={<ProtectedRoute><MenTShirts /></ProtectedRoute>} />
                    <Route path="/smooth-scroll" element={<SmoothScrollDemo />} />
                    <Route path="/admin" element={
                      <ProtectedRoute adminOnly={true}>
                        <Admin />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </div>
              </SmoothScroll>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  )
}

export default App
