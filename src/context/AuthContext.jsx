import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Phone Number Sign In
  const sendOtp = async (phoneNumber) => {
    try {
      setLoading(true);
      // TODO: Replace with your backend API call
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` })
      });
      
      if (!response.ok) throw new Error('Failed to send OTP');
      return await response.json();
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Verify OTP
  const verifyOtp = async (phoneNumber, otp) => {
    try {
      setLoading(true);
      // TODO: Replace with your backend API call
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+91${phoneNumber}`, otp })
      });
      
      if (!response.ok) throw new Error('Invalid OTP');
      
      const userData = await response.json();
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign Out
  const logout = async () => {
    try {
      setLoading(true);
      // TODO: Replace with your backend API call
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Logout failed');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const value = {
    currentUser,
    sendOtp,
    verifyOtp,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;