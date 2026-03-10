import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { cropsApi } from "../services/api";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

interface Crop {
  id: string;
  name: string;
  variety: string;
  field: string;
  area: number;
  plantingDate: string;
  expectedHarvest: string;
  status: "planted" | "growing" | "ready" | "harvested";
  yield?: number;
}

export function Crops() {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    variety: "",
    field: "",
    area: 0,
    plantingDate: "",
    expectedHarvest: "",
    status: "planted" as Crop["status"],
  });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const response = await cropsApi.getAll();
      if (response.success) {
        setCrops(response.data);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast.error("Failed to load crops");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Crop["status"]) => {
    switch (status) {
      case "planted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "growing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "ready":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "harvested":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this crop?")) return;
    
    try {
      const response = await cropsApi.delete(id);
      if (response.success) {
        setCrops(crops.filter((crop) => crop.id !== id));
        toast.success("Crop deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
      toast.error("Failed to delete crop");
    }
  };

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name,
      variety: crop.variety,
      field: crop.field,
      area: crop.area,
      plantingDate: crop.plantingDate,
      expectedHarvest: crop.expectedHarvest,
      status: crop.status,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCrop(null);
    setFormData({
      name: "",
      variety: "",
      field: "",
      area: 0,
      plantingDate: "",
      expectedHarvest: "",
      status: "planted",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editingCrop) {
        const response = await cropsApi.update(editingCrop.id, formData);
        if (response.success) {
          setCrops(crops.map((c) => (c.id === editingCrop.id ? response.data : c)));
          toast.success("Crop updated successfully");
        }
      } else {
        const response = await cropsApi.create(formData);
        if (response.success) {
          setCrops([...crops, response.data]);
          toast.success("Crop added successfully");
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving crop:", error);
      toast.error("Failed to save crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{t("cropManagement")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("trackManageCrops")}</p>
        </div>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> {t("addCrop")}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dark:bg-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("totalCrops")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{crops.length}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("totalArea")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{crops.reduce((sum, c) => sum + c.area, 0)} acres</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("activeCrops")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {crops.filter((c) => c.status === "planted" || c.status === "growing").length}
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("readyToHarvest")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{crops.filter((c) => c.status === "ready").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {loading && crops.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}

      {/* Crops Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop) => (
          <Card key={crop.id} className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="dark:text-white">{crop.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{crop.variety}</p>
                </div>
                <Badge className={getStatusColor(crop.status)} variant="secondary">
                  {crop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t("field")}:</span>
                  <span className="font-medium dark:text-white">{crop.field}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t("area")}:</span>
                  <span className="font-medium dark:text-white">{crop.area} acres</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Planted:</span>
                  <span className="font-medium dark:text-white">{new Date(crop.plantingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expected Harvest:</span>
                  <span className="font-medium dark:text-white">{new Date(crop.expectedHarvest).toLocaleDateString()}</span>
                </div>
                {crop.yield && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Yield:</span>
                    <span className="font-medium dark:text-white">{crop.yield} kg</span>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(crop)} className="flex-1">
                    <Edit className="mr-1 h-3 w-3" /> {t("edit")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(crop.id)}
                    className="flex-1 text-red-600"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> {t("delete")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              {editingCrop ? `${t("edit")} ${t("crops")}` : t("addCrop")}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {editingCrop ? "Update crop information" : "Enter the details for your new crop"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="dark:text-gray-200">{t("cropName")}</Label>
              <Input
                placeholder="e.g., Wheat"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">{t("variety")}</Label>
              <Input
                placeholder="e.g., Spring Wheat"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">{t("field")}</Label>
              <Select value={formData.field} onValueChange={(value) => setFormData({ ...formData, field: value })}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Field A">Field A</SelectItem>
                  <SelectItem value="Field B">Field B</SelectItem>
                  <SelectItem value="Field C">Field C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">{t("area")} (acres)</Label>
              <Input
                type="number"
                placeholder="25"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })}
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="dark:text-gray-200">{t("plantingDate")}</Label>
                <Input
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-gray-200">{t("expectedHarvest")}</Label>
                <Input
                  type="date"
                  value={formData.expectedHarvest}
                  onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">{t("status")}</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planted">Planted</SelectItem>
                  <SelectItem value="growing">Growing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="harvested">Harvested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCrop ? t("update") : t("add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
