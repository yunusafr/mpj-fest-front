import { authApi } from "../../auth/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 10,
  });
};
