import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiPost, apiGet } from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (name, email, password) => {
    try {
      const response = await apiPost('/auth/register', { name, email, password });
      if (response.token) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
        setUser(response.user);
        return response;
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await apiPost('/auth/login', { email, password });
      console.log('Login response:', response);
      
      if (response && response.token) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        
        // Store the complete user object
        const userData = {
          ...response.user,
          token: response.token
        };
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
        setUser(userData);
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
      
      if (!token || !tokenExpiration) {
        setLoading(false);
        return;
      }

      if (new Date(tokenExpiration) < new Date()) {
        logout();
        setLoading(false);
        return;
      }

      // Always set the saved user first
      if (savedUser) {
        setUser(savedUser);
      }

      // No need to make profile request if we have saved user data
      if (savedUser && savedUser.token === token) {
        setLoading(false);
        return;
      }

      const response = await apiGet('/auth/profile');
      if (response) {
        const userData = { ...response, token };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.warn('Auth check error:', error);
      // Keep the user logged in if we have valid saved data
      if (!savedUser) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);