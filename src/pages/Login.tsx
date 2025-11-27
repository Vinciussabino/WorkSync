import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 font-serif">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-600 p-5 rounded-sm w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
