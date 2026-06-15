import api from "@/lib/axios";

export async function getInvoice(
  orderId
) {
  const { data } = await api.get(
    `/payments/invoice/${orderId}`
  );

  return data;
}