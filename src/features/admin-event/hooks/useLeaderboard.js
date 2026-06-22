import { useQuery } from "@tanstack/react-query";

import { getLeaderboard } from "../api/votingService";

export function useLeaderboard(eventId, sort) {
  return useQuery({
    queryKey: ["leaderboard", eventId, sort],
    queryFn: () => getLeaderboard(eventId, sort),
    enabled: !!eventId,
  });
}
