import { useQuery } from "@tanstack/react-query";

import { getAdminEvents } from "../api/adminEventsApi";

export function useAdminEvents(festivalId) {
  return useQuery({
    queryKey: ["admin-events", festivalId],
    queryFn: () => getAdminEvents(festivalId),
    enabled: festivalId !== null,
  });
} 