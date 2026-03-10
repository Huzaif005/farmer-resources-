
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Handle GitHub Pages SPA routing
  if (window.location.search.startsWith('?/')) {
    const path = '/farmer-resources-' + window.location.search.slice(1);
    window.history.replaceState(null, '', path);
  }

  createRoot(document.getElementById("root")!).render(<App />);
  