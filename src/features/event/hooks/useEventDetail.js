import { useQuery } from "@tanstack/react-query";
import { eventApi } from "../api/eventApi";

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

export const useEventDetail = (
  id
) =>
  useQuery({
    queryKey: [
      "event-detail",
      id,
    ],
    queryFn: () =>
      eventApi.getDetail(id),
    enabled: !!id,
  });