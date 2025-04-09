const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:50001/api';

export const productService = {
  // Add a new product
  addProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in addProduct:', error);
      throw error;
    }
  },

  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  },

  // Update a product
  updateProduct: async (productId, productData) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  },
};