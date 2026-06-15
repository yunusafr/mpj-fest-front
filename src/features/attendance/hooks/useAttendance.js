import { useQuery }
from "@tanstack/react-query";

import {
  getAttendance,
} from "../api/attendanceApi";

export const useAttendance = (

  eventId,

  festivalId

) => {

  return useQuery({

    queryKey: [

      "attendance",

      eventId,

      festivalId,

    ],

    queryFn: () =>

      getAttendance(

        eventId,

        festivalId

      ),

    enabled:

      !!eventId,

  });

};