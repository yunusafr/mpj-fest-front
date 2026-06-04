import axiosClient from "@/lib/axios";

export const registrationApi = {

  registerEvent: async (eventId) => {

    const response =
      await axiosClient.post(
        "/registrations",
        {
          event_id: eventId,
        }
      );

    return response.data;
  },

  myRegistrations: async () => {

    const response =
      await axiosClient.get(
        "/my-registrations"
      );

    return response.data;
  },
  
  registrationDetail: async (id) => {
  const response =
    await axiosClient.get(
      `/registrations/${id}`
    );

  return response.data;
},

};