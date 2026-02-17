import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const remembered = localStorage.getItem('auth_user');
    if (remembered) {
      setUser(JSON.parse(remembered));
    }
    setLoading(false);
  }, []);

  const login = (email, password, rememberMe) => {
    // Static credentials check
    if (email === 'intern@demo.com' && password === 'intern123') {
      const userData = { email, name: 'Productivity Legend' };
      setUser(userData);
      
      if (rememberMe) {
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('auth_user', JSON.stringify(userData));
      }
      return { success: true };
    }
    return { success: false, message: 'Hmm... that doesn\'t look right 😅' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged: !!user, loading }}>
      {!loading && children}
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
