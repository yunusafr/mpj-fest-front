import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authApi.me,
    retry: false,
    enabled: !!localStorage.getItem("token"),
  });
};