import { Task, TaskStatus } from "@/types/Task";
import { TaskCard } from "./TaskCard";
import { Circle } from "lucide-react";

interface KanbanColumnProps {
  titulo: string;
  status: TaskStatus;
  tasks: Task[];
  color: "todo" | "doing" | "done";
}

const colorClasses = {
  todo: "border-todo/30 bg-todo/5",
  doing: "border-doing/30 bg-doing/5",
  done: "border-done/30 bg-done/5",
};

const dotColors = {
  todo: "text-todo",
  doing: "text-doing",
  done: "text-done",
};

export function KanbanColumn({ titulo, tasks, color }: KanbanColumnProps) {
  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-4 min-h-[400px] animate-slide-up`}>
      <div className="flex items-center gap-2 mb-4">
        <Circle className={`h-3 w-3 fill-current ${dotColors[color]}`} />
        <h3 className="font-semibold text-sm">{titulo}</h3>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Nenhuma tarefa
          </div>
        )}
      </div>
    </div>
  );
}
