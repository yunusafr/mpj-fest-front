import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useScanTicket() {
  return useMutation({
    mutationFn: async (qrCode) => {
      const { data } = await api.post(
        "/tickets/scan",
        {
          qr_code: qrCode,
        }
      );

      return data;
    },
  });
}