import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Worker {
  id: string;
  name: string;
  role: string;
  contact: string;
  status: "active" | "inactive" | "on-leave";
  hoursWorked: number;
  wage: number;
}

interface WorkerTableProps {
  workers: Worker[];
  onEdit?: (worker: Worker) => void;
  onDelete?: (workerId: string) => void;
}

export function WorkerTable({ workers, onEdit, onDelete }: WorkerTableProps) {
  const getStatusColor = (status: Worker["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hours Worked</TableHead>
            <TableHead>Wage/Hour</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No workers found
              </TableCell>
            </TableRow>
          ) : (
            workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>{worker.role}</TableCell>
                <TableCell>{worker.contact}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(worker.status)} variant="secondary">
                    {worker.status}
                  </Badge>
                </TableCell>
                <TableCell>{worker.hoursWorked}h</TableCell>
                <TableCell>${worker.wage}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(worker)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(worker.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
