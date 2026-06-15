import { useQuery }
from "@tanstack/react-query";

import { getInvoice }
from "../api/getInvoice";

export function useInvoice(
  orderId
) {
  return useQuery({
    queryKey: [
      "invoice",
      orderId,
    ],
    queryFn: () =>
      getInvoice(orderId),
    enabled: !!orderId,
  });
}