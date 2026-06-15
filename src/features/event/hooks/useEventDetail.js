import { useQuery } from "@tanstack/react-query";
import { eventApi } from "../api/eventApi";

export const useEvents = (festivalId = "all") =>
  useQuery({
    queryKey: ["events", festivalId],
    queryFn: () => eventApi.getAll(festivalId),
  });

export const useEventDetail = (id, festivalId = "all") =>
  useQuery({
    queryKey: ["event-detail", id, festivalId],
    queryFn: () => eventApi.getDetail(id, festivalId),
    enabled: !!id,
  });