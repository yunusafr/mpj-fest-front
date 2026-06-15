import { useQuery }
from "@tanstack/react-query";

import {
  submissionApi,
}
from "../api/submissionApi";

export const useSubmission = (registrationId) =>
  useQuery({
    queryKey: ["submission", registrationId],
    queryFn: () =>
      submissionApi.getByRegistration(registrationId),
    enabled: !!registrationId,
  });