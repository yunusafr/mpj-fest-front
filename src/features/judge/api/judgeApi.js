import api from "@/lib/axios";

export const fetchDashboard = async () => {
  const res = await api.get("/judge/dashboard");
  return res.data;
};

export const fetchSubmissions = async () => {
  const res = await api.get("/judge/submissions");
  return res.data;
};