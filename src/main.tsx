import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// The private portal is its own chunk: the public site never downloads it (or supabase-js)
const Portal = lazy(() => import("./portal/Portal.tsx"));
const isPortal = /^\/portal(\/|$)/.test(window.location.pathname);

createRoot(document.getElementById("root")!).render(
  isPortal ? <Suspense fallback={null}><Portal /></Suspense> : <App />
);
