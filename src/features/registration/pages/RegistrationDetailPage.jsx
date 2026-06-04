import { useParams }
from "react-router-dom";

import {
  useRegistrationDetail,
}
from "../hooks/useRegistrationDetail";

export default function RegistrationDetailPage() {

  const { id } =
    useParams();

  const {
    data,
    isLoading,
  } =
    useRegistrationDetail(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const registration =
    data?.data;

  return (
    <div className="space-y-6">

      <div
        className="
        rounded-3xl
        bg-white
        p-6
        border
        "
      >
        <h1
          className="
          text-3xl
          font-black
          "
        >
          {
            registration.event.nama
          }
        </h1>

        <p className="mt-2 text-slate-500">
          {
            registration.order_id
          }
        </p>
      </div>

      <div
        className="
        rounded-3xl
        bg-white
        p-6
        border
        "
      >
        <h2
          className="
          text-lg
          font-bold
          "
        >
          Status Pembayaran
        </h2>

        <p className="mt-2">
          {
            registration.status_pembayaran
          }
        </p>
      </div>

    </div>
  );
}