import api from "@/lib/axios";

export const setupVoting = async (eventId, payload) => {
  const { data } = await api.post(`/events/${eventId}/voting`, payload);

  return data;
};

export const getVoting = async (eventId) => {
  const { data } = await api.get(`/events/${eventId}/voting`);

  return data;
};

export const getLeaderboard = async (eventId, sort = "votes") => {
  const { data } = await api.get(`/admin-event/events/${eventId}/leaderboard`, {
    params: {
      sort,
    },
  });

  return data;
};
