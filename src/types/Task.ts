export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: TaskStatus;
  prioridade: "baixa" | "media" | "alta";
  dataCriacao: string;
  responsavel?: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
}
