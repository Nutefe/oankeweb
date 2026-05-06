"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { Users } from "@/types/auth";
import { getUser, clearUser } from "@/auth/authUtils";

interface AuthContextValue {
  user: Users | null;
  setUser: (u: Users | null) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<Users | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserState(getUser());
    setIsLoading(false);
  }, []);

  const setUser = useCallback((u: Users | null) => {
    setUserState(u);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
