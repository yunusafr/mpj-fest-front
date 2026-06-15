import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../api/eventApi";

export const useEvent = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });
};