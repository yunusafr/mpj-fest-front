import { useQuery } from "@tanstack/react-query";
import { ticketApi } from "../api/ticketApi";

export function useTicket(registrationId) {
  return useQuery({
    queryKey: ["ticket", registrationId],

    queryFn: () => ticketApi.getTicket(registrationId),

    enabled: !!registrationId,

    // 🔥 AUTO REFRESH TIAP 3 DETIK
    refetchInterval: 3000,

    // 🧠 OPTIONAL: stop kalau sudah scanned
    refetchInterval: (data) => {
      const isScanned = data?.data?.is_scanned === "1";
      return isScanned ? false : 3000;
    },

    // optional biar gak spam refetch saat tab tidak aktif
    refetchIntervalInBackground: false,
  });
}