import axiosClient from "@/lib/axios";

export const getPublicVoting = async (slug) => {
  const res = await axiosClient.get(`/voting/${slug}`);
  return res.data;
};

export const submitVote = async (slug, payload) => {
  const res = await axiosClient.post(`/public/voting/${slug}/vote`, payload);

  return res.data;
};

export const getGoogleLoginUrl = async () => {
  const res = await axiosClient.get("/auth/google");

  return res.data;
};
