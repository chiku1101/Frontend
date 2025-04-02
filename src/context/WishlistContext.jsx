import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the wishlist context
const WishlistContext = createContext();

// Custom hook to use the wishlist context
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// Wishlist provider component
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add item to wishlist
  const addToWishlist = (item) => {
    // Check if item already exists in wishlist
    const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
    
    if (!existingItem) {
      // If item doesn't exist, add it to wishlist
      setWishlistItems([...wishlistItems, item]);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};