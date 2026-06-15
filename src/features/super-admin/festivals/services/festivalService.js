// services/festivalService.js
import api from "@/lib/axios";

export const updateFestival = async (id, payload) => {
  const res = await api.put(`/festivals/${id}`, payload);
  return res.data;
};

export const deleteFestival = async (id) => {
  const res = await api.delete(`/festivals/${id}`);
  return res.data;
};