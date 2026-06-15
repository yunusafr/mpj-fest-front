import { useMutation, useQueryClient }
from "@tanstack/react-query";

import { deleteFestival }
from "../api/festivalApi";

export const useDeleteFestival = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteFestival,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["festivals"],
      });
    },
  });
};