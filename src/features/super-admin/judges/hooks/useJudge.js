import { useQuery } from "@tanstack/react-query";
import { getJudge } from "../api/judgeApi";

export function useJudge(id) {
  return useQuery({
    queryKey: ["judge", id],

    queryFn: async () => {
      const { data } =
        await getJudge(id);

      return data;
    },

    enabled: !!id,
  });
}