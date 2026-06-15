import { useMutation } from "@tanstack/react-query";
import { createJudge } from "../api/judgeApi";

export function useCreateJudge() {
  return useMutation({
    mutationFn: createJudge,
  });
}