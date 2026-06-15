import { useMutation } from "@tanstack/react-query";
import { createAdminEvent } from "../api/adminEventsApi";

export function useCreateAdminEvent() {
  return useMutation({
    mutationFn:
      createAdminEvent,
  });
}