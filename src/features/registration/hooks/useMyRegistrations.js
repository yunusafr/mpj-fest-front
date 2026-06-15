import { useQuery }
from "@tanstack/react-query";

import { registrationApi }
from "../api/registrationApi";

export const useMyRegistrations =

  (festivalId) =>

    useQuery({

      queryKey: [

        "my-registrations",

        festivalId

      ],

      queryFn: () =>

        registrationApi
        .myRegistrations(
          festivalId
        ),

    });