import axiosClient from "@/lib/axios";

export const getSubmissions = async (
  festivalId
) => {
  const response =
    await axiosClient.get(
      "/admin/submissions",
      {
        params: festivalId
          ? {
              festival_id:
                festivalId,
            }
          : {},
      }
    );

  return response.data;
};

export const getSubmission =
  async (
    id,
    festivalId
  ) => {
    const response =
      await axiosClient.get(
        `/admin/submissions/${id}`,
        {
          params: festivalId
            ? {
                festival_id:
                  festivalId,
              }
            : {},
        }
      );

    return response.data;
  };

export const verifySubmission =
  async (id) => {
    const response =
      await axiosClient.put(
        `/admin/submissions/${id}/verify`
      );

    return response.data;
  };

export const rejectSubmission =
  async (id) => {
    const response =
      await axiosClient.put(
        `/admin/submissions/${id}/reject`
      );

    return response.data;
  };