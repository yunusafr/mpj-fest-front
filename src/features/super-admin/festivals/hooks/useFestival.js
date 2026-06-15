import { useQuery } from "@tanstack/react-query";
import { getFestival } from "../api/festivalApi";

export const useFestival = (id) => {
  return useQuery({
    queryKey: ["festival", id],
    queryFn: () => getFestival(id),
    enabled: !!id,
  });
};