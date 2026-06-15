import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../api/eventApi";

export const useDeleteEvent = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};