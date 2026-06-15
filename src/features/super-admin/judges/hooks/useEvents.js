import { useQuery } from "@tanstack/react-query";
import { getJudgeEvents } from "../api/judgeApi";

export function useEvents() {
  return useQuery({
    queryKey: ["judge-events"],
    queryFn: getJudgeEvents,
  });
}