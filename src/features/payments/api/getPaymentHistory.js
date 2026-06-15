import api from "@/lib/axios";

export const getPaymentHistory = async (festivalId) => {

  const params = {};

  if (
    festivalId &&
    festivalId !== "all"
  ) {

    params.festival_id = festivalId;

  }

  const res = await api.get(
    "/payments/history",
    {
      params,
    }
  );

  return res.data;

};