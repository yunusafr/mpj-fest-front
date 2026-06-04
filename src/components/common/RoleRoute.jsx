import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";

export default function RoleRoute({
  allowedRoles,
  children,
}) {
  const user =
    useAuthStore(
      (state) => state.user
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/404"
        replace
      />
    );
  }

  return children;
}