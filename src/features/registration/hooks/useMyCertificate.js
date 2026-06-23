import { useQuery } from "@tanstack/react-query";

import { getMyCertificates, getMyCertificate } from "../api/certificateService";

export const useMyCertificates = () => {
  return useQuery({
    queryKey: ["my-certificates"],

    queryFn: getMyCertificates,
  });
};

export const useMyCertificate = (registrationId) => {
  return useQuery({
    queryKey: ["my-certificate", registrationId],

    queryFn: () => getMyCertificate(registrationId),

    enabled: !!registrationId,

    retry: false,
  });
};
