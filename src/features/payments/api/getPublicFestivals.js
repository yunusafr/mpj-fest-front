import api from "@/lib/axios";

export const getPublicFestivals =
  async () => {

    const res =
      await api.get(
        "/festivals/public"
      );

    return res.data;

};