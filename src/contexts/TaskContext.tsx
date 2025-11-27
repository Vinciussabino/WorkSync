import React, { createContext, useContext, useMemo } from "react";
import { Task, TaskStatus } from "@/types/Task";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "dataCriacao">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  tasksByStatus: {
    todo: Task[];
    doing: Task[];
    done: Task[];
  };
  stats: {
    total: number;
    todo: number;
    doing: number;
    done: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: "1",
    titulo: "Configurar ambiente de desenvolvimento",
    descricao: "Instalar Node.js, React e TypeScript",
    status: "done",
    prioridade: "alta",
    dataCriacao: new Date().toISOString(),
    responsavel: "João",
  },
  {
    id: "2",
    titulo: "Criar componentes base",
    descricao: "Desenvolver Header, Footer e Layout principal",
    status: "doing",
    prioridade: "alta",
    dataCriacao: new Date().toISOString(),
    responsavel: "Maria",
  },
  {
    id: "3",
    titulo: "Implementar autenticação",
    descricao: "Sistema de login e registro de usuários",
    status: "todo",
    prioridade: "media",
    dataCriacao: new Date().toISOString(),
    responsavel: "Pedro",
  },
  {
    id: "4",
    titulo: "Testes unitários",
    descricao: "Escrever testes para os componentes principais",
    status: "todo",
    prioridade: "baixa",
    dataCriacao: new Date().toISOString(),
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("worksync-tasks", initialTasks);

  const addTask = (taskData: Omit<Task, "id" | "dataCriacao">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      dataCriacao: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  };

  const tasksByStatus = useMemo(
    () => ({
      todo: tasks.filter((t) => t.status === "todo"),
      doing: tasks.filter((t) => t.status === "doing"),
      done: tasks.filter((t) => t.status === "done"),
    }),
    [tasks]
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasksByStatus.todo.length,
      doing: tasksByStatus.doing.length,
      done: tasksByStatus.done.length,
    }),
    [tasks, tasksByStatus]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask, tasksByStatus, stats }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks deve ser usado dentro de um TaskProvider");
  }
  return context;
}
