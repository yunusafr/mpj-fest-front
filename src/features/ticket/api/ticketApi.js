import axiosClient from "@/lib/axios";

export const ticketApi = {
  getTicket: async (
    registrationId
  ) => {
    const response =
      await axiosClient.get(
        `/tickets/${registrationId}`
      );

    return response.data;
  },
};