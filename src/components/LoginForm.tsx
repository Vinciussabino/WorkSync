import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(email, senha);
      if (success) {
        toast({
          title: "Bem-vindo!",
          description: "Login realizado com sucesso.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } else {
      if (!nome.trim()) {
        toast({
          title: "Erro",
          description: "Preencha o nome.",
          variant: "destructive",
        });
        return;
      }
      const success = register(nome, email, senha);
      if (success) {
        toast({
          title: "Conta criada!",
          description: "Bem-vindo ao WorkSync.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro",
          description: "Este email já está cadastrado.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="glass rounded-xl p-8 w-full max-w-md animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? "Entrar" : "Criar Conta"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isLogin
            ? "Acesse sua conta para continuar"
            : "Cadastre-se para começar"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          {isLogin ? (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Cadastrar
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {isLogin
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Faça login"}
        </button>
      </div>

      {isLogin && (
        <div className="">
          
        </div>
      )}
    </div>
  );
}
