import api from "@/lib/axios";

export const getFestivals = async () => {
  const { data } = await api.get("/festivals");
  return data;
};

export const getFestival = async (id) => {
  const { data } = await api.get(`/festivals/${id}`);
  return data;
};

export const createFestival = async (payload) => {
  const { data } = await api.post("/festivals", payload);
  return data;
};

export const updateFestival = async ({
  id,
  payload,
}) => {
  const { data } = await api.put(
    `/festivals/${id}`,
    payload
  );

  return data;
};

export const deleteFestival = async (
  id
) => {
  const { data } = await api.delete(
    `/festivals/${id}`
  );

  return data;
};