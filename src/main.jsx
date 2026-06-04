import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";

import "./index.css";

import { router } from "./app/router";
import SplashScreen from "./components/shared/SplashScreen";

const queryClient = new QueryClient();

function AppLoader() {
  const [loading, setLoading] =
    React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppLoader />

      <Toaster
        position="top-right"
        richColors
      />
    </QueryClientProvider>
  </React.StrictMode>
);