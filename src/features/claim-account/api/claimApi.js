import axiosClient from "@/lib/axios";

export const claimApi = {
  register: async (payload) => {
    const { data } =
      await axiosClient.post(
        "/auth/register/niam",
        payload
      );

    return data;
  },
};