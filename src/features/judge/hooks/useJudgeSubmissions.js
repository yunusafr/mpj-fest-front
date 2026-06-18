import { useQuery } from "@tanstack/react-query";

import {
  fetchSubmissions,
  fetchSubmissionDetail,
} from "../api/judgeApi";

export const useJudgeSubmissions = () => {
  return useQuery({
    queryKey: ["judge-submissions"],
    queryFn: fetchSubmissions,
  });
};

export const useJudgeSubmissionDetail = (
  submissionId
) => {
  return useQuery({
    queryKey: [
      "judge-submission",
      submissionId,
    ],
    queryFn: () =>
      fetchSubmissionDetail(
        submissionId
      ),
    enabled: !!submissionId,
  });
};