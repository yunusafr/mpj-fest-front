import axios from "@/lib/axios";

export const getAdminCertificates = async () => {
  const res = await axios.get("/admin-event/certificates");
  return res.data.data;
};

export const getAdminCertificateDetail = async (eventId) => {
  const res = await axios.get(`/admin-event/certificates/${eventId}`);
  return res.data.data;
};
