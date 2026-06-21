import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useRecentActivities() {
  return useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const { data } = await api.get("/registrations/activities");

      return data;
    },
  });
}
