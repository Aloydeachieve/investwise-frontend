"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  kyc_status?: "not_submitted" | "pending" | "approved" | "rejected";
}

export type AuthPayload = {
  user: User;
  token: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (payload: AuthPayload) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      // ✅ Load from sessionStorage or fallback to localStorage
      const storedUser =
        sessionStorage.getItem("user") || localStorage.getItem("user");
      const storedToken =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse user/token from storage", error);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  const login = (payload: AuthPayload) => {
    setUser(payload.user);
    setToken(payload.token);

    // ✅ Save to both storages
    sessionStorage.setItem("user", JSON.stringify(payload.user));
    sessionStorage.setItem("token", payload.token);

    localStorage.setItem("user", JSON.stringify(payload.user));
    localStorage.setItem("token", payload.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    router.push("/");
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...data };

      sessionStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    });
  };

  const value = { user, token, login, logout, updateUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
