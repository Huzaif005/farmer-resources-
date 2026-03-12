import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Sprout, 
  Package, 
  Users, 
  DollarSign,
  UserCircle 
} from "lucide-react";
import { cn } from "./ui/utils";
import { useLanguage } from "../context/LanguageContext";

export function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("crops"), href: "/crops", icon: Sprout },
    { name: t("resources"), href: "/resources", icon: Package },
    { name: t("labor"), href: "/labor", icon: Users },
    { name: t("expenses"), href: "/expenses", icon: DollarSign },
    { name: t("profileManagement") || "Profile Management", href: "/account", icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}