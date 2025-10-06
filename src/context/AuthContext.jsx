import { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: 1,
      email,
      name: 'John Doe',
      role: 'team_member', // super_admin, admin, team_member, client
      avatar: null,
      isAdmin: false,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const adminLogin = async (email, password) => {
    // Simulate admin API call
    const mockAdminUser = {
      id: 999,
      email,
      name: 'Admin User',
      role: 'super_admin',
      avatar: null,
      isAdmin: true,
    };
    
    setUser(mockAdminUser);
    localStorage.setItem('user', JSON.stringify(mockAdminUser));
    return mockAdminUser;
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    const mockUser = {
      id: Date.now(),
      email,
      name,
      role: 'team_member',
      avatar: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    adminLogin,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};