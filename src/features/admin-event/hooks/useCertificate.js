import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getCertificateSetting,
  saveCertificateSetting,
} from "../api/certificateService";

export const useCertificate = (eventId, jenis) => {
  return useQuery({
    queryKey: ["certificate", eventId, jenis],

    queryFn: async () => {
      const data = await getCertificateSetting(eventId, jenis);

      return data ?? null;
    },

    enabled: !!eventId && !!jenis,
  });
};

export const useSaveCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, payload }) =>
      saveCertificateSetting(eventId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["certificate", variables.eventId, variables.payload.jenis],
      });
    },
  });
};
