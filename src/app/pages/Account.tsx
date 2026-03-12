import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { User, MapPin, Phone, Mail, Building } from "lucide-react";
import { toast } from "sonner";

export function Account() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();

  const [phone, setPhone] = useState(user?.phone || "");
  const [farmName, setFarmName] = useState(user?.farmName || "");
  const [address, setAddress] = useState(user?.address || "");
  const [totalArea, setTotalArea] = useState(user?.totalArea || "");

  useEffect(() => {
    if (user) {
      setPhone(user.phone || "");
      setFarmName(user.farmName || "");
      setAddress(user.address || "");
      setTotalArea(user.totalArea || "");
    }
  }, [user]);

  const handlePersonalUpdate = () => {
    updateUser({ phone });
    toast.success(t("personalDetailsUpdated") || "Personal details updated successfully");
  };

  const handleFarmUpdate = () => {
    updateUser({ farmName, address, totalArea });
    toast.success(t("farmDetailsUpdated") || "Farm details updated successfully");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">{t("farmerInformation") || "Farmer Information"}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("manageAccountDetails") || "Manage your account settings and farm profile"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              {t("personalDetails") || "Personal Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>{t("fullName") || "Full Name"}</Label>
              <Input value={user?.name || ""} readOnly className="bg-gray-50 dark:bg-gray-800" />
            </div>
            <div className="space-y-1">
              <Label>{t("email") || "Email"}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input value={user?.email || ""} readOnly className="pl-9 bg-gray-50 dark:bg-gray-800" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("phone") || "Phone Number"}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+91 98765 43210" 
                  className="pl-9"
                />
              </div>
            </div>
            <Button onClick={handlePersonalUpdate} className="w-full bg-green-600 hover:bg-green-700">
              {t("update") || "Update"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              {t("farmDetails") || "Farm Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>{t("farmName") || "Farm Name"}</Label>
              <Input 
                value={farmName} 
                onChange={(e) => setFarmName(e.target.value)} 
              />
            </div>
            <div className="space-y-1">
              <Label>{t("address") || "Farm Address"}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder={t("enterFarmAddress") || "Enter farm address"} 
                  className="pl-9" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("farmTotalArea") || "Total Area (Acres)"}</Label>
              <Input 
                type="number" 
                value={totalArea} 
                onChange={(e) => setTotalArea(e.target.value)} 
                placeholder="e.g. 5.5" 
              />
            </div>
            <Button onClick={handleFarmUpdate} className="w-full bg-green-600 hover:bg-green-700">
              {t("update") || "Update"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
