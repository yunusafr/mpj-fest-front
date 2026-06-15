import { useQuery }
from "@tanstack/react-query";

import {
  fetchSubmissions,
} from "../api/judgeApi";


export const useJudgeSubmissions = () => {
  return useQuery({
    queryKey: ["judge-submissions"],
    queryFn: fetchSubmissions,
  });
};