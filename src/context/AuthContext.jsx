import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedUserId = localStorage.getItem('userId');
    const savedRole = localStorage.getItem('userRole');

    if (savedToken) {
      setToken(savedToken);
      setUser(savedUser);
      setUserId(savedUserId);
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  const login = (tokenData, userData, userIdData, roleData) => {
    setToken(tokenData);
    setUser(userData);
    setUserId(userIdData);
    setRole(roleData);

    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', userData);
    localStorage.setItem('userId', userIdData);
    localStorage.setItem('userRole', roleData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
    setRole(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    role,
    userId,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
