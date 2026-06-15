import { useQuery }
from "@tanstack/react-query";

import {
  getSubmission,
}
from "../api/submissionsApi";

export function useSubmission(
  id,
  festivalId
) {
  return useQuery({
    queryKey: [
      "submission",
      id,
      festivalId,
    ],

    queryFn: () =>
      getSubmission(
        id,
        festivalId
      ),

    enabled: !!id,
  });
}