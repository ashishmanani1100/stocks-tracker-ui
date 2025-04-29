"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export const dataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter()

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard")
    } else {
      localStorage.removeItem("user");
      router.push("/login")
    }
  }, [user]);

  return (
    <dataContext.Provider value={{ user, setUser, logout }}>
      {children}
    </dataContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
