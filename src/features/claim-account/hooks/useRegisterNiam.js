import { useMutation }
from "@tanstack/react-query";

import { claimApi }
from "../api/claimApi";

export const useRegisterNiam =
  () =>
    useMutation({
      mutationFn:
        claimApi.register,
    });