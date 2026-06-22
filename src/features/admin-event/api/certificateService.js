import api from "@/lib/axios";

export const getCertificateSetting = async (eventId, jenis) => {
  try {
    const response = await api.get(`/events/${eventId}/certificates/${jenis}`);

    return response.data?.data ?? null;
  } catch (error) {
    // Jika data belum ada (404)
    if (error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

export const saveCertificateSetting = async (eventId, payload) => {
  const response = await api.post(`/events/${eventId}/certificates`, payload);

  return response.data;
};
