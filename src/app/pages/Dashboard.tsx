import { ResourceCard } from "../components/ResourceCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Sprout, Package, Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useLanguage } from "../context/LanguageContext";

const monthlyExpenses = [
  { month: "Jan", amount: 4500 },
  { month: "Feb", amount: 5200 },
  { month: "Mar", amount: 4800 },
  { month: "Apr", amount: 6100 },
  { month: "May", amount: 5500 },
  { month: "Jun", amount: 6800 },
];

const cropYields = [
  { crop: "Wheat", yield: 85 },
  { crop: "Corn", yield: 92 },
  { crop: "Soybeans", yield: 78 },
  { crop: "Rice", yield: 88 },
];

const recentActivities = [
  { id: 1, action: "Harvested 500kg of wheat", time: "2 hours ago" },
  { id: 2, action: "Added 10 bags of fertilizer", time: "5 hours ago" },
  { id: 3, action: "Assigned worker to Field A", time: "1 day ago" },
  { id: 4, action: "Recorded equipment maintenance", time: "2 days ago" },
];

const alerts = [
  { id: 1, message: "Low fertilizer stock - reorder needed", severity: "warning" },
  { id: 2, message: "Irrigation scheduled for Field B tomorrow", severity: "info" },
];

export function Dashboard() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
        <p className="text-gray-600">{t("welcomeMessage")}</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-3 p-4 rounded-lg ${
                alert.severity === "warning"
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <AlertCircle
                className={`h-5 w-5 ${
                  alert.severity === "warning" ? "text-yellow-600" : "text-blue-600"
                }`}
              />
              <p
                className={`text-sm ${
                  alert.severity === "warning" ? "text-yellow-800" : "text-blue-800"
                }`}
              >
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ResourceCard
          title={t("activeCrops")}
          value="12"
          icon={Sprout}
          trend={{ value: 8, isPositive: true }}
        />
        <ResourceCard
          title={t("resourcesInStock")}
          value="248"
          icon={Package}
          trend={{ value: 5, isPositive: true }}
        />
        <ResourceCard
          title={t("activeWorkers")}
          value="24"
          icon={Users}
          trend={{ value: -2, isPositive: false }}
        />
        <ResourceCard
          title={t("monthlyExpenses")}
          value="₹6,800"
          icon={DollarSign}
          trend={{ value: 12, isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crop Yield Performance (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cropYields}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yield" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
