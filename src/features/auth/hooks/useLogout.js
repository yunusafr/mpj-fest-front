import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/authApi";

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};