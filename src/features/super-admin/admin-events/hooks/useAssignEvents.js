import { useMutation } from "@tanstack/react-query";
import { assignEvents } from "../api/adminEventsApi";

export function useAssignEvents() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }) =>
      assignEvents(
        id,
        payload
      ),
  });
}