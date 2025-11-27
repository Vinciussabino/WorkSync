import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  titulo: string;
  valor: number;
  icon: LucideIcon;
  color: "primary" | "todo" | "doing" | "done";
}

const colorClasses = {
  primary: "text-blue-400",
  todo: "text-gray-300",
  doing: "text-yellow-300",
  done: "text-green-400",
};

export function StatsCard({ titulo, valor, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">{titulo}</p>
          <p className="text-2xl font-semibold text-gray-100">{valor}</p>
        </div>

        <div className={`p-2 rounded-md ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
