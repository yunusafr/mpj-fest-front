import { useQuery } from "@tanstack/react-query";

import { getPaymentHistory }
from "../api/getPaymentHistory";

export function usePaymentHistory(
  festivalId
) {

  return useQuery({

    queryKey: [
      "payments",
      festivalId,
    ],

    queryFn: () =>
      getPaymentHistory(
        festivalId
      ),

    enabled:
      festivalId !== null,

  });

}