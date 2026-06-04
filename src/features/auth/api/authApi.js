import axiosClient from "@/lib/axios";

export const authApi = {
  login: async (payload) => {
    const { data } =
      await axiosClient.post(
        "/auth/login",
        payload
      );

    return data;
  },

register: async (
  payload
) => {

  const { data } =
    await axiosClient.post(
      "/auth/register",
      payload
    );

  return data;
},

  me: async () => {
    const { data } =
      await axiosClient.get(
        "/auth/me"
      );

    return data;
  },
  
  logout: async () => {
  const { data } =
    await axiosClient.post(
      "/auth/logout"
    );

  return data;
},
};