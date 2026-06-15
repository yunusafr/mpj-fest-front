import axiosClient
from "@/lib/axios";

export const submissionApi = {

  getByRegistration:
    async (
      registrationId
    ) => {

      const response =
        await axiosClient.get(
          `/submissions/${registrationId}`
        );

      return response.data;
    },

  upload:
    async (
      formData
    ) => {

      const response =
        await axiosClient.post(
          "/submissions",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;
    },
};