// hooks/useFestivalMutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFestival, deleteFestival } from "../services/festivalService";

export function useFestivalMutations() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateFestival(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries(["festivals"]);

      const previous = queryClient.getQueryData(["festivals"]);

      queryClient.setQueryData(["festivals"], (old) => {
        return {
          ...old,
          data: old.data.map((f) =>
            f.id === id ? { ...f, ...payload } : f
          ),
        };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["festivals"], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["festivals"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFestival,
    onSuccess: () => {
      queryClient.invalidateQueries(["festivals"]);
    },
  });

  return {
    updateMutation,
    deleteMutation,
  };
}