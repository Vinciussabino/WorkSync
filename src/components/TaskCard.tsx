import { Task } from "@/types/Task";
import { useTasks } from "@/contexts/TaskContext";
import { Trash2, User, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
}

const prioridadeColors = {
  baixa: "text-green-400",
  media: "text-yellow-400",
  alta: "text-red-400",
};

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, moveTask } = useTasks();

  const nextStatus = () => {
    if (task.status === "todo") return "doing";
    if (task.status === "doing") return "done";
    return null;
  };

  const handleMove = () => {
    const next = nextStatus();
    if (next) moveTask(task.id, next);
  };

  return (
    <div className="p-3 bg-gray-800 border border-gray-700 rounded">
      {/* Título e prioridade */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-200">{task.titulo}</h4>

        <span className={`text-xs ${prioridadeColors[task.prioridade]}`}>
          {task.prioridade.toUpperCase()}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-xs text-gray-400 mb-3">
        {task.descricao}
      </p>

      {/* Responsável e data */}
      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        {task.responsavel && (
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{task.responsavel}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{new Date(task.dataCriacao).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>

      {/* Botões */}
      <div className="flex items-center gap-2">
        {nextStatus() && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMove}
            className="flex-1 text-xs h-8 bg-gray-700 hover:bg-gray-600"
          >
            <ArrowRight className="h-3 w-3 mr-1" />
            Mover
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 p-0 bg-gray-700 hover:bg-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
