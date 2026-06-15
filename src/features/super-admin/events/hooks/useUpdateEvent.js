import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../api/eventApi";
import { useNavigate } from "react-router-dom";

export const useUpdateEvent = () => {
  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: updateEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      navigate(
        "/super-admin/events"
      );
    },
  });
};