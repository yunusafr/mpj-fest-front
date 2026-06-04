import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";

import { getDashboardRoute } from "@/utils/getDashboardRoute";

export default function GuestRoute({
  children,
}) {
  const user =
    useAuthStore(
      (state) => state.user
    );

  if (user) {
    return (
      <Navigate
        to={getDashboardRoute(
          user.role
        )}
        replace
      />
    );
  }

  return children;
}