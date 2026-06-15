import axiosClient from "@/lib/axios";

export const getAdminEvents =
  async (festivalId) => {

    const response =
      await axiosClient.get(
        "/admin-events",
        {

          params: {

            festival_id:

              festivalId ===
              "all"

                ? undefined

                : festivalId,

          },

        }
      );

    return response.data;

};

export const getAdminEvent =
  async (id) => {
    const response =
      await axiosClient.get(
        `/admin-events/${id}`
      );

    return response.data;
  };

export const createAdminEvent =
  async (payload) => {
    const response =
      await axiosClient.post(
        "/admin-users",
        payload
      );

    return response.data;
  };

export const getAllEvents =
  async () => {
    const response =
      await axiosClient.get(
        "/events-all"
      );

    return response.data;
  };

export const assignEvents =
  async (id, payload) => {
    const response =
      await axiosClient.put(
        `/admin-events/${id}/assign-events`,
        payload
      );

    return response.data;
  };