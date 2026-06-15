import {
  useMutation,
} from "@tanstack/react-query";

import {
  submissionApi,
}
from "../api/submissionApi";

export const useUploadSubmission =
  () =>
    useMutation({
      mutationFn:
        submissionApi.upload,
    });