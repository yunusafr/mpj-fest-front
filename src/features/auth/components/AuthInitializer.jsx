import { useEffect } from "react";

import Loader from "@/components/shared/Loader";

import { useCurrentUser } from "../hooks/useCurrentUser";

import { useAuthStore } from "@/app/store/authStore";

export default function AuthInitializer({
  children,
}) {
  const token =
    useAuthStore(
      (state) => state.token
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useCurrentUser();

  useEffect(() => {
    if (
      isSuccess &&
      data?.data
    ) {
      setUser(data.data);
    }

    if (isError) {
      logout();
    }
  }, [
    data,
    isSuccess,
    isError,
    setUser,
    logout,
  ]);

  if (token && isLoading) {
    return <Loader />;
  }

  return children;
}