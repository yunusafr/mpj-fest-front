import { useMutation, useQueryClient }
from "@tanstack/react-query";

import { createFestival }
from "../api/festivalApi";

export const useCreateFestival = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createFestival,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["festivals"],
      });
    },
  });
};