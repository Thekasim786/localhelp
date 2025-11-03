import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing user on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint (optional, for server-side cleanup)
      try {
        await authAPI.logout();
      } catch (error) {
        // Don't fail logout if backend call fails
        console.warn('Backend logout failed:', error);
      }

      // Clear all authentication data
      localStorage.removeItem('user');
      sessionStorage.clear(); // Clear any session data
      
      // Clear any cookies (if using them)
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });

      setUser(null);
      
      // Redirect to login page
      navigate('/login-signup');
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const requireAuth = (redirectTo = '/login-signup') => {
    if (!isAuthenticated()) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    requireAuth
  };

  return (
    
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
    
  );
};
