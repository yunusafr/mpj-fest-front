import { useQuery } from "@tanstack/react-query";

import { getJudges } from "../api/judgeApi";

export function useJudges(festivalId) {
  return useQuery({
    queryKey: ["judges", festivalId],

    queryFn: async () => {
      const { data } = await getJudges(festivalId);
      return data;
    },

    enabled: festivalId !== null,
  });
}