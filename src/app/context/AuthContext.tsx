import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  farmName: string;
  phone?: string;
  address?: string;
  totalArea?: string;
  cropType?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, farmName: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("farmer_auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 500));
    const u = {
      id: "1",
      name: "John Farmer",
      email: email,
      farmName: "Green Valley Farm",
    };
    setUser(u);
    localStorage.setItem("farmer_auth_user", JSON.stringify(u));
  };

  const register = async (name: string, email: string, password: string, farmName: string) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 500));
    const u = {
      id: String(Date.now()),
      name: name,
      email: email,
      farmName: farmName,
    };
    setUser(u);
    localStorage.setItem("farmer_auth_user", JSON.stringify(u));
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("farmer_auth_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("farmer_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
