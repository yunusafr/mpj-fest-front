import axiosClient from "@/lib/axios";

// ambil data voting publik
export const getPublicVoting = async (slug) => {
  const res = await axiosClient.get(`/voting/${slug}`);
  return res.data;
};

// login khusus voting (email only)
export const loginVoting = async (email) => {
  const res = await axiosClient.post(`/public/voting/login`, {
    email,
  });

  return res.data;
};

// submit vote
export const submitVote = async (slug, payload) => {
  const res = await axiosClient.post(`/public/voting/${slug}/vote`, payload);

  return res.data;
};
