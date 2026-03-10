import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, Package, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Progress } from "../components/ui/progress";

interface Resource {
  id: string;
  name: string;
  category: "seed" | "fertilizer" | "pesticide" | "equipment" | "fuel";
  quantity: number;
  unit: string;
  minThreshold: number;
  location: string;
  lastUpdated: string;
}

const initialResources: Resource[] = [
  {
    id: "1",
    name: "Wheat Seeds",
    category: "seed",
    quantity: 450,
    unit: "kg",
    minThreshold: 200,
    location: "Storage A",
    lastUpdated: "2026-03-08",
  },
  {
    id: "2",
    name: "NPK Fertilizer",
    category: "fertilizer",
    quantity: 120,
    unit: "bags",
    minThreshold: 150,
    location: "Storage B",
    lastUpdated: "2026-03-07",
  },
  {
    id: "3",
    name: "Pesticide XYZ",
    category: "pesticide",
    quantity: 85,
    unit: "liters",
    minThreshold: 50,
    location: "Chemical Storage",
    lastUpdated: "2026-03-05",
  },
  {
    id: "4",
    name: "Tractor Fuel",
    category: "fuel",
    quantity: 1200,
    unit: "liters",
    minThreshold: 500,
    location: "Fuel Tank",
    lastUpdated: "2026-03-10",
  },
  {
    id: "5",
    name: "Irrigation Pipes",
    category: "equipment",
    quantity: 25,
    unit: "units",
    minThreshold: 10,
    location: "Equipment Shed",
    lastUpdated: "2026-02-28",
  },
];

export function Resources() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockResources = resources.filter((r) => r.quantity < r.minThreshold);

  const getStockStatus = (resource: Resource) => {
    const percentage = (resource.quantity / resource.minThreshold) * 100;
    if (percentage < 100) return { status: "low", color: "text-red-600" };
    if (percentage < 150) return { status: "medium", color: "text-yellow-600" };
    return { status: "good", color: "text-green-600" };
  };

  const getCategoryIcon = (category: Resource["category"]) => {
    return <Package className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resource Management</h1>
          <p className="text-gray-600">Track and manage farm resources and inventory</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockResources.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Well Stocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {resources.length - lowStockResources.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockResources.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockResources.map((resource) => (
                <div key={resource.id} className="flex justify-between items-center text-sm">
                  <span className="text-red-800 font-medium">{resource.name}</span>
                  <span className="text-red-600">
                    {resource.quantity} {resource.unit} (Min: {resource.minThreshold})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="seed">Seeds</SelectItem>
            <SelectItem value="fertilizer">Fertilizers</SelectItem>
            <SelectItem value="pesticide">Pesticides</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="fuel">Fuel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => {
                const stockStatus = getStockStatus(resource);
                const stockPercentage = Math.min(
                  100,
                  (resource.quantity / (resource.minThreshold * 2)) * 100
                );
                return (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">{resource.name}</TableCell>
                    <TableCell>
                      <span className="capitalize">{resource.category}</span>
                    </TableCell>
                    <TableCell>
                      {resource.quantity} {resource.unit}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={stockPercentage} className="h-2" />
                        <p className="text-xs text-gray-500">Min: {resource.minThreshold}</p>
                      </div>
                    </TableCell>
                    <TableCell>{resource.location}</TableCell>
                    <TableCell>{new Date(resource.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {stockStatus.status === "good" ? (
                          <CheckCircle className={`h-4 w-4 ${stockStatus.color}`} />
                        ) : (
                          <AlertTriangle className={`h-4 w-4 ${stockStatus.color}`} />
                        )}
                        <span className={`text-sm capitalize ${stockStatus.color}`}>
                          {stockStatus.status}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Resource Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>Enter the details for the new resource item</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Resource Name</Label>
              <Input placeholder="e.g., Wheat Seeds" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seed">Seeds</SelectItem>
                  <SelectItem value="fertilizer">Fertilizers</SelectItem>
                  <SelectItem value="pesticide">Pesticides</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="fuel">Fuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input placeholder="kg, liters, bags" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Minimum Threshold</Label>
              <Input type="number" placeholder="50" />
            </div>
            <div className="space-y-2">
              <Label>Storage Location</Label>
              <Input placeholder="e.g., Storage A" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsDialogOpen(false)}>
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
