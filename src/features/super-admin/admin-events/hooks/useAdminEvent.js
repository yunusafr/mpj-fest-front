import { useQuery } from "@tanstack/react-query";
import { getAdminEvent } from "../api/adminEventsApi";

export function useAdminEvent(id) {
  return useQuery({
    queryKey: [
      "admin-event",
      id,
    ],
    queryFn: () =>
      getAdminEvent(id),
    enabled: !!id,
  });
}