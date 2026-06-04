import { useQuery }
from "@tanstack/react-query";

import { registrationApi }
from "../api/registrationApi";

export const useMyRegistrations =
  () =>
    useQuery({
      queryKey: [
        "my-registrations"
      ],
      queryFn:
        registrationApi.myRegistrations,
    });