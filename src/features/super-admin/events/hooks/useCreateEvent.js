import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../api/eventApi";
import { useNavigate } from "react-router-dom";

export const useCreateEvent = () => {
  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createEvent,

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