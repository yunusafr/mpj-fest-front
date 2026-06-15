import { useQuery }
from "@tanstack/react-query";

import {
  fetchDashboard,
} from "../api/judgeApi";

export const useJudgeDashboard = () => {
  return useQuery({
    queryKey: ["judge-dashboard"],
    queryFn: fetchDashboard,
  });
};