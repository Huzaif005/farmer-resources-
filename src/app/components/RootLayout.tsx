import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function RootLayout() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/"].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}