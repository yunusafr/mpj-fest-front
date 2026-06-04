import axiosClient from "@/lib/axios";

export const niamApi = {
  check: async (niam) => {
    const { data } =
      await axiosClient.get(
        `/check-niam/${niam}`
      );

    return data;
  },
};