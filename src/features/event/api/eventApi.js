import axiosClient
from "@/lib/axios";

export const eventApi = {

getAll: async (festivalId = "all") => {
  const response = await axiosClient.get("/events/public", {
    params: {
      festival_id: festivalId,
    },
  });

  return response.data;
},

getDetail: async (id, festivalId = "all") => {
  const response = await axiosClient.get(
    `/events/public/${id}`,
    {
      params: { festival_id: festivalId },
    }
  );

  return response.data;
}

};