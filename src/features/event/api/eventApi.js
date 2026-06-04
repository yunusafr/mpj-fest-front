import axiosClient
from "@/lib/axios";

export const eventApi = {

  getAll: async () => {

    const response =
      await axiosClient.get(
        "/events/public"
      );

    return response.data;
  },

  getDetail: async (id) => {

    const response =
      await axiosClient.get(
        `/events/public/${id}`
      );

    return response.data;
  },

};