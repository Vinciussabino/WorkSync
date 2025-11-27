import { useTasks } from "@/contexts/TaskContext";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  const { tasksByStatus } = useTasks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn
        titulo="A Fazer"
        status="todo"
        tasks={tasksByStatus.todo}
        color="todo"
      />
      <KanbanColumn
        titulo="Em Progresso"
        status="doing"
        tasks={tasksByStatus.doing}
        color="doing"
      />
      <KanbanColumn
        titulo="Concluído"
        status="done"
        tasks={tasksByStatus.done}
        color="done"
      />
    </div>
  );
}
