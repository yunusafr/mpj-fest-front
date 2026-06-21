import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { setupVoting } from "../api/votingService";

export function useSetupVoting() {
  return useMutation({
    mutationFn: ({ eventId, payload }) => setupVoting(eventId, payload),

    onSuccess: () => {
      toast.success("Pengaturan voting berhasil disimpan");
    },

    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Gagal menyimpan pengaturan voting",
      );
    },
  });
}
