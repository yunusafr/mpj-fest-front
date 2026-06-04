import { useMutation }
from "@tanstack/react-query";

import { registrationApi }
from "../api/registrationApi";

export const useRegisterEvent =
  () =>
    useMutation({

      mutationFn:
        registrationApi.registerEvent,

    });