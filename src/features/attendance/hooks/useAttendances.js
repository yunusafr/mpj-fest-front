import { useQuery }
from "@tanstack/react-query";

import {
  getAttendances,
} from "../api/attendanceApi";

export const useAttendances =
  (
    festivalId
  ) => {

    return useQuery({

      queryKey: [
        "attendances",
        festivalId,
      ],

      queryFn: () =>
        getAttendances(
          festivalId
        ),

    });

  };