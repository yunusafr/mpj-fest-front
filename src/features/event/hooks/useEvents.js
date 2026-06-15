import { useQuery }
from "@tanstack/react-query";

import { eventApi }
from "../api/eventApi";

export const useEvents = (festivalId = "all") =>
  useQuery({
    queryKey: ["events", festivalId],
    queryFn: () => eventApi.getAll(festivalId),
  });