import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const getEvent = async (id) => {
  const { data } = await api.get(`/admin-event/events/${id}`);

  return data;
};

export function useEventDetail(id) {
  return useQuery({
    queryKey: ["event-detail", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });
}
