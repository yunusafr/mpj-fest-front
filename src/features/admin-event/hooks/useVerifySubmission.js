import { useMutation }
from "@tanstack/react-query";

import {
  verifySubmission,
} from "../api/submissionsApi";

export function useVerifySubmission() {
  return useMutation({
    mutationFn:
      verifySubmission,
  });
}