import { useState, useRef, useEffect } from "react";
import { useTasks } from "@/contexts/TaskContext";
import { TaskStatus } from "@/types/Task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const { addTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [prioridade, setPrioridade] = useState<"baixa" | "media" | "alta">("media");
  const [responsavel, setResponsavel] = useState("");

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    addTask({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      status,
      prioridade,
      responsavel: responsavel.trim() || undefined,
    });

    setTitulo("");
    setDescricao("");
    setStatus("todo");
    setPrioridade("media");
    setResponsavel("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glass rounded-xl p-6 w-full max-w-md relative animate-slide-up z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Nova Tarefa</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Título *</label>
            <Input
              ref={inputRef}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nome da tarefa"
              className="bg-secondary/50 border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Descrição</label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Detalhes da tarefa"
              rows={3}
              className="bg-secondary/50 border-border resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">A Fazer</SelectItem>
                  <SelectItem value="doing">Em Progresso</SelectItem>
                  <SelectItem value="done">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Prioridade</label>
              <Select
                value={prioridade}
                onValueChange={(v) => setPrioridade(v as "baixa" | "media" | "alta")}
              >
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Responsável</label>
            <Input
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Nome do responsável"
              className="bg-secondary/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Criar Tarefa
          </Button>
        </form>
      </div>
    </div>
  );
}
