import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";

import "./index.css";

import { router } from "./app/router";
import SplashScreen from "./components/shared/SplashScreen";
import AuthInitializer from "@/features/auth/components/AuthInitializer";

const queryClient = new QueryClient();

function MidtransLoader() {
  React.useEffect(() => {
    const scriptId = "midtrans-snap-script";

    // Cegah script dimuat berkali-kali
    if (document.getElementById(scriptId)) {
      return;
    }

    const script =
      document.createElement("script");

    script.id = scriptId;

    const isProduction =
  import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true";

script.src = isProduction
  ? "https://app.midtrans.com/snap/snap.js"
  : "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute(
      "data-client-key",
      import.meta.env
        .VITE_MIDTRANS_CLIENT_KEY
    );

    script.async = true;

    document.body.appendChild(
      script
    );

    script.onload = () => {
      console.log(
        "Midtrans Snap loaded successfully"
      );
    };

    script.onerror = () => {
      console.error(
        "Failed to load Midtrans Snap"
      );
    };

    return () => {
      const existingScript =
        document.getElementById(
          scriptId
        );

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}

function AppLoader() {
  const [loading, setLoading] =
    React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // dari 1500 -> 400

    return () =>
      clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <RouterProvider router={router} />
  );
}
window.onerror = function (
  message,
  source,
  lineno,
  colno,
  error
) {
  console.error(
    "GLOBAL ERROR:",
    error
  );
};

window.onunhandledrejection =
  function (event) {
    console.error(
      "PROMISE ERROR:",
      event.reason
    );
  };

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <MidtransLoader />
        <AppLoader />
      </AuthInitializer>

      <Toaster
        position="top-right"
        richColors
      />
    </QueryClientProvider>
  </React.StrictMode>
);