import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckSquare, Users, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: CheckSquare,
      titulo: "Kanban Simples",
      descricao: "Organize tarefas em colunas de forma fácil.",
    },
    {
      icon: Users,
      titulo: "Trabalho em Equipe",
      descricao: "Colabore com outros usuários.",
    },
    {
      icon: Zap,
      titulo: "Rápido",
      descricao: "Interface leve e direta ao ponto.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Header />

      <main className="flex-1">
        {/* Hero simples */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">
              Gerencie suas tarefas com WorkSync
            </h1>

            <p className="text-gray-400 text-sm mb-6">
              Um gerenciador de tarefas simples e direto para você e sua equipe.
            </p>

            <Link to="/dashboard">
              <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features simples */}
        <section className="py-16 bg-gray-800 border-t border-gray-700">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-center mb-10">
              Por que usar o WorkSync?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.titulo}
                  className="p-5 bg-gray-850 border border-gray-700 rounded"
                >
                  <feature.icon className="h-6 w-6 mb-3 text-gray-300" />

                  <h3 className="font-semibold mb-1 text-gray-200">
                    {feature.titulo}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {feature.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
