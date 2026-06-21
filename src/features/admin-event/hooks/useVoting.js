import { useQuery } from "@tanstack/react-query";
import { getVoting } from "../api/votingService";

export function useVoting(eventId) {
  return useQuery({
    queryKey: ["voting", eventId],
    queryFn: () => getVoting(eventId),
    enabled: !!eventId,
  });
}
