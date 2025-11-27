import { useState } from "react";
import { Header } from "@/components/Header";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { Plus, ListTodo } from "lucide-react";

const Tarefas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Header />

      <main className="flex-1 py-6">
        <div className="mx-auto px-4 w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <ListTodo className="h-6 w-6 text-gray-300" />
                Tarefas
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Visualize e gerencie suas tarefas
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </div>

          <KanbanBoard />
        </div>
      </main>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Tarefas;
