import { useQuery }
from "@tanstack/react-query";

import { registrationApi }
from "../api/registrationApi";

export const useRegistrationDetail = (id) =>
  useQuery({
    queryKey: ["registration", id],
    queryFn: () => registrationApi.registrationDetail(id),
    enabled: !!id,
  });