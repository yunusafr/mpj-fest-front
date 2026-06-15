import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";

import SplashScreen from "@/components/shared/SplashScreen";

export default function ProtectedRoute({
  children,
}) {
  const token =
    useAuthStore(
      (state) => state.token
    );

  const user =
    useAuthStore(
      (state) => state.user
    );

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!user) {
    return SplashScreen;
  }

  return children;
}