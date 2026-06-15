import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateJudge } from "../api/judgeApi";

export const useUpdateJudge =
  () => {
    return useMutation({
      mutationFn: ({
        id,
        payload,
      }) =>
        updateJudge(
          id,
          payload
        ),

      onSuccess: () => {
        toast.success(
          "Juri berhasil diperbarui"
        );
      },

      onError: () => {
        toast.error(
          "Gagal memperbarui juri"
        );
      },
    });
  };