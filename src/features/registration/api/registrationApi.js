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

myRegistrations: async (
  festivalId
) => {

  const params = {};

  if (

    festivalId &&

    festivalId !== "all"

  ) {

    params.festival_id =
      festivalId;

  }

  const response =

    await axiosClient.get(

      "/my-registrations",

      {

        params

      }

    );

  return response.data;

},
  
registrationDetail: async (id) => {
  const response = await axiosClient.get(
    `/registrations/${id}`
  );

  return response.data;
}

};