import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/adminEventsApi";

export function useEvents() {
  return useQuery({
    queryKey: ["events-all"],
    queryFn: getAllEvents,
  });
}