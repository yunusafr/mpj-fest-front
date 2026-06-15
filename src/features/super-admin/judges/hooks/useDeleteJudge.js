import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteJudge } from "../api/judgeApi";

export const useDeleteJudge = () => {
  return useMutation({
    mutationFn: deleteJudge,

    onSuccess: () => {
      toast.success(
        "Juri berhasil dihapus"
      );
    },

    onError: () => {
      toast.error(
        "Gagal menghapus juri"
      );
    },
  });
};