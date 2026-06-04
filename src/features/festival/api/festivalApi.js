import axiosClient from "@/lib/axios";

export const festivalApi = {
  getActive: async () => {
    const response =
      await axiosClient.get(
        "/festival-active"
      );

    return response.data;
  },
};