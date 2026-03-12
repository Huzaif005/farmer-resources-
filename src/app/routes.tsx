import { createHashRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Crops } from "./pages/Crops";
import { Resources } from "./pages/Resources";
import { Labor } from "./pages/Labor";
import { Expenses } from "./pages/Expenses";

export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "crops", Component: Crops },
      { path: "resources", Component: Resources },
      { path: "labor", Component: Labor },
      { path: "expenses", Component: Expenses },
    ],
  },
]);
