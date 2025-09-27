import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data for development
  const mockUsers = {
    admin: {
      id: 1,
      username: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@rjms.com',
      role: 'ADMIN',
      lastLogin: new Date(),
      createdAt: new Date('2024-01-01'),
      unreadNotifications: 3
    },
    author: {
      id: 2,
      username: 'author',
      firstName: 'Research',
      lastName: 'Author',
      email: 'author@rjms.com',
      role: 'AUTHOR',
      lastLogin: new Date(),
      createdAt: new Date('2024-02-01'),
      unreadNotifications: 2
    },
    editor: {
      id: 3,
      username: 'editor',
      firstName: 'Journal',
      lastName: 'Editor',
      email: 'editor@rjms.com',
      role: 'EDITOR',
      lastLogin: new Date(),
      createdAt: new Date('2024-03-01'),
      unreadNotifications: 5
    },
    reviewer: {
      id: 4,
      username: 'reviewer',
      firstName: 'Peer',
      lastName: 'Reviewer',
      email: 'reviewer@rjms.com',
      role: 'REVIEWER',
      lastLogin: new Date(),
      createdAt: new Date('2024-04-01'),
      unreadNotifications: 1
    },
    testuser: {
      id: 5,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@rjms.com',
      role: 'AUTHOR',
      lastLogin: new Date(),
      createdAt: new Date('2024-05-01'),
      unreadNotifications: 0
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers[credentials.username];
      
      // Support multiple password patterns
      const validPasswords = [
        `${credentials.username}123`,
        credentials.username,
        'admin123',
        'author123',
        'editor123',
        'reviewer123',
        'testuser123'
      ];
      
      if (user && validPasswords.includes(credentials.password)) {
        setUser(user);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(user));
        
        return { success: true, user };
      } else {
        throw new Error('Invalid username or password. Try: admin/admin123, author/author123, etc.');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};