import { useMutation }
from "@tanstack/react-query";

import { niamApi }
from "../api/niamApi";

export const useCheckNiam =
  () => {
    return useMutation({
      mutationFn:
        niamApi.check,
    });
  };