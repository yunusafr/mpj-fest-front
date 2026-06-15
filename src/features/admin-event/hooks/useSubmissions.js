import { useQuery }
from "@tanstack/react-query";

import {
  getSubmissions,
}
from "../api/submissionsApi";

export function useSubmissions(
  festivalId
) {
  return useQuery({
    queryKey: [
      "submissions",
      festivalId,
    ],

    queryFn: () =>
      getSubmissions(
        festivalId
      ),
  });
}