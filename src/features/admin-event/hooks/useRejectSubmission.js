import { useMutation }
from "@tanstack/react-query";

import {
  rejectSubmission,
} from "../api/submissionsApi";

export function useRejectSubmission() {
  return useMutation({
    mutationFn:
      rejectSubmission,
  });
}