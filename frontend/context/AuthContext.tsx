"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = () => localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/api/v1/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      setUser(data.user);
    } catch (error) {
      console.error("Auth error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchUser();
  };
  const logout = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
        {
          method: "POST",
        },
      );
      const res = await data.json();
      console.log("Response", res);

      if (!res.success) {
        throw new Error(res.message || "Logout Failed");
      }
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
};