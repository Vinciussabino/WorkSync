import { useState } from "react";
import { Header } from "@/components/Header";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskModal } from "@/components/TaskModal";
import { StatsCard } from "@/components/StatsCard";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, ListTodo, Clock, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stats } = useTasks();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Header />

      <main className="flex-1 py-6">
        <div className="mx-auto px-4 max-w-5xl">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-gray-300" />
                Dashboard
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                Gerencie suas tarefas e acompanhe seu progresso
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-700 text-white text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nova Tarefa
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatsCard
              titulo="Total"
              valor={stats.total}
              icon={LayoutDashboard}
              className="bg-gray-800 border border-gray-700 text-gray-200"
            />
            <StatsCard
              titulo="A Fazer"
              valor={stats.todo}
              icon={ListTodo}
              className="bg-gray-800 border border-gray-700 text-gray-200"
            />
            <StatsCard
              titulo="Em Progresso"
              valor={stats.doing}
              icon={Clock}
              className="bg-gray-800 border border-gray-700 text-gray-200"
            />
            <StatsCard
              titulo="Concluídas"
              valor={stats.done}
              icon={CheckCircle2}
              className="bg-gray-800 border border-gray-700 text-gray-200"
            />
          </div>

          <div className="border border-gray-700 bg-gray-800 p-3 rounded">
            <KanbanBoard />
          </div>
        </div>
      </main>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
