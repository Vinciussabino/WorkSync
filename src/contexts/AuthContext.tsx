import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/Task";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  register: (nome: string, email: string, senha: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("worksync-user", null);
  const [users, setUsers] = useLocalStorage<Array<User & { senha: string }>>(
    "worksync-users",
    [{ id: "1", nome: "Admin", email: "admin@worksync.com", senha: "123456" }]
  );

  const isAuthenticated = user !== null;

  const login = (email: string, senha: string): boolean => {
    const foundUser = users.find((u) => u.email === email && u.senha === senha);
    if (foundUser) {
      const { senha: _, ...userData } = foundUser;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (nome: string, email: string, senha: string): boolean => {
    const exists = users.some((u) => u.email === email);
    if (exists) return false;

    const newUser = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
    };
    setUsers((prev) => [...prev, newUser]);
    setUser({ id: newUser.id, nome, email });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
