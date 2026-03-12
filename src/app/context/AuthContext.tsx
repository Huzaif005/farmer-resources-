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
    // Attempt local API fetch, default back to mock
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${email}`);
      if (res.ok) {
        const u = await res.json();
        if (u && u.email) {
          const loadedUser = {
            id: u.id || "1",
            name: u.full_name,
            email: u.email,
            phone: u.phone,
            farmName: u.farm_name,
            address: u.address,
            totalArea: u.land_area,
            cropType: u.crop_type
          };
          setUser(loadedUser);
          localStorage.setItem("farmer_auth_user", JSON.stringify(loadedUser));
          return;
        }
      }
    } catch(err) {
      console.log("Backend not running, using mock local login");
    }

    // Mock login fallback
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
    const u = {
      id: String(Date.now()),
      name: name,
      email: email,
      farmName: farmName,
    };
    // Attempt local API save
    try {
      await fetch(`http://localhost:5000/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          email: email,
          farm_name: farmName
        })
      });
    } catch(err) {
      console.log("Backend not running, mock local registration used");
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(u);
    localStorage.setItem("farmer_auth_user", JSON.stringify(u));
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("farmer_auth_user", JSON.stringify(updatedUser));

    // Attempt local API save dynamically
    try {
      await fetch(`http://localhost:5000/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          farm_name: updatedUser.farmName,
          address: updatedUser.address,
          land_area: updatedUser.totalArea,
          crop_type: updatedUser.cropType
        })
      });
    } catch (err) {
      console.log("Backend not running. Saved only to LocalStorage");
    }
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
