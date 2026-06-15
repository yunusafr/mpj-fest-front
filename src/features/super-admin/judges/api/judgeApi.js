import api from "@/lib/axios";

export const getJudges = (festivalId) =>
  api.get("/judges", {
    params: {
      festival_id: festivalId === "all" ? undefined : festivalId,
    },
  });

export const getJudge = (id) =>
  api.get(`/judges/${id}`);

export const createJudge = (payload) =>
  api.post("/judges", payload);

export const updateJudge = (id, payload) =>
  api.put(`/judges/${id}`, payload);

export const deleteJudge = (id) =>
  api.delete(`/judges/${id}`);

export const assignJudgeEvents = (id, payload) =>
  api.post(`/judges/${id}/assign-events`, payload);

export const getJudgeEvents = async () => {
  const response = await api.get("/judge-events");
  return response.data;
};