import api from "@/lib/axios";

export const getMyCertificates = async () => {
  const response = await api.get("/certificates");

  return response.data.data;
};

export const getMyCertificate = async (registrationId) => {
  const response = await api.get(`/certificates/${registrationId}`);

  return response.data.data;
};
