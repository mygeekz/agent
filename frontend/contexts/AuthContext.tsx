import React, { createContext, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// NOTE: This is a mock authentication. In a real app, you would make an API call.
const mockApiLogin = (email: string): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ email });
        }, 500);
    });
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      // Check for saved user session
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage. Clearing corrupted data.", error);
      // If parsing fails, start with a clean slate to prevent app crash
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = async (email: string) => {
    const userData = await mockApiLogin(email);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};