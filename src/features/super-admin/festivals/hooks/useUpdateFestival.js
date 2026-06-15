import { useMutation, useQueryClient }
from "@tanstack/react-query";

import { updateFestival }
from "../api/festivalApi";

export const useUpdateFestival = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: updateFestival,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["festivals"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "festival",
          variables.id,
        ],
      });
    },
  });
};