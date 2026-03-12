import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { WorkerTable, Worker } from "../components/WorkerTable";
import { Plus, Users, Clock, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const initialWorkers: Worker[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Farm Manager",
    contact: "+1 234-567-8901",
    status: "active",
    hoursWorked: 160,
    wage: 25,
  },
  {
    id: "2",
    name: "Maria Garcia",
    role: "Field Worker",
    contact: "+1 234-567-8902",
    status: "active",
    hoursWorked: 140,
    wage: 18,
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "Equipment Operator",
    contact: "+1 234-567-8903",
    status: "active",
    hoursWorked: 155,
    wage: 22,
  },
  {
    id: "4",
    name: "Lisa Chen",
    role: "Field Worker",
    contact: "+1 234-567-8904",
    status: "on-leave",
    hoursWorked: 80,
    wage: 18,
  },
  {
    id: "5",
    name: "Michael Brown",
    role: "Supervisor",
    contact: "+1 234-567-8905",
    status: "active",
    hoursWorked: 165,
    wage: 23,
  },
];

export function Labor() {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  const totalWorkers = workers.length;
  const activeWorkers = workers.filter((w) => w.status === "active").length;
  const totalHours = workers.reduce((sum, w) => sum + w.hoursWorked, 0);
  const totalPayroll = workers.reduce((sum, w) => sum + w.hoursWorked * w.wage, 0);

  const handleEdit = (worker: Worker) => {
    setEditingWorker(worker);
    setIsDialogOpen(true);
  };

  const handleDelete = (workerId: string) => {
    setWorkers(workers.filter((w) => w.id !== workerId));
  };

  const handleAdd = () => {
    setEditingWorker(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Labor Management</h1>
          <p className="text-gray-600">Manage your workforce and track labor costs</p>
        </div>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Add Worker
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkers}</div>
            <p className="text-xs text-gray-500">{activeWorkers} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPayroll.toLocaleString("en-IN")}</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wage/Hour</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(totalPayroll / totalHours).toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Workers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workers</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkerTable workers={workers} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {/* Add/Edit Worker Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingWorker ? "Edit Worker" : "Add New Worker"}</DialogTitle>
            <DialogDescription>
              {editingWorker ? "Update worker information" : "Enter the details for the new worker"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" defaultValue={editingWorker?.name} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue={editingWorker?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Farm Manager">Farm Manager</SelectItem>
                  <SelectItem value="Field Worker">Field Worker</SelectItem>
                  <SelectItem value="Equipment Operator">Equipment Operator</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="General Labor">General Labor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input placeholder="+1 234-567-8900" defaultValue={editingWorker?.contact} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={editingWorker?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hours Worked</Label>
                <Input type="number" placeholder="160" defaultValue={editingWorker?.hoursWorked} />
              </div>
              <div className="space-y-2">
                <Label>Wage per Hour (₹)</Label>
                <Input type="number" placeholder="18" defaultValue={editingWorker?.wage} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsDialogOpen(false)}>
              {editingWorker ? "Update" : "Add"} Worker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
