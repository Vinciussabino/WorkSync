import { Link, useLocation } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/tarefas", label: "Tarefas" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#111] border-b border-gray-700 font-mono">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo simples */}
          <Link to="/">
            <span className="text-xl font-bold text-white">
              WorkSync
            </span>
          </Link>

          {/* Navegação básica */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded text-sm ${
                  isActive(link.path)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Área do usuário simples */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded">
                  <User className="h-4 w-4 text-gray-300" />
                  <span className="text-sm text-white">{user?.nome}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gray-700 text-white">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
