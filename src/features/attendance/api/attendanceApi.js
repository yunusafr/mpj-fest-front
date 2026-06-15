import api from "@/lib/axios";

export const getAttendances = async (
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

  const { data } =
    await api.get(
      "/attendances",
      {
        params,
      }
    );

  return data;
};

export const getAttendance =
  async (
    eventId,
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

    const { data } =
      await api.get(
        `/attendances/${eventId}`,
        {
          params,
        }
      );

    return data;
  };