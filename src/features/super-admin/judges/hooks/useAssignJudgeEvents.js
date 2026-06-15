import { useMutation } from "@tanstack/react-query";
import { assignJudgeEvents } from "../api/judgeApi";

export function useAssignJudgeEvents() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }) =>
      assignJudgeEvents(
        id,
        payload
      ),
  });
}