import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock3,
  MapPin,
  Trophy,
  Tag,
  CreditCard,
} from "lucide-react";

import { useRegistrationDetail } from "../hooks/useRegistrationDetail";

export default function RegistrationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

const { data, isLoading, isError } =
  useRegistrationDetail(id);

if (isLoading) {
  return (
    <div className="flex justify-center py-20 text-slate-500">
      Loading...
    </div>
  );
}

if (isError || !data) {
  return (
    <div className="text-center py-20 text-slate-500">
      Data registrasi tidak ditemukan
    </div>
  );
}

const registration = data?.data;
const event = registration?.event;

  const handlePay = () => {
    if (!window.snap) {
      toast.error("Midtrans belum dimuat");
      return;
    }

    if (!registration?.snap_token) {
      toast.error("Token pembayaran tidak ditemukan");
      return;
    }

    window.snap.pay(registration.snap_token, {
      onSuccess: () => {
        toast.success("Pembayaran berhasil");
        setTimeout(() => navigate("/participant/my-events"), 1200);
      },
      onPending: () => {
        toast.info("Menunggu pembayaran");
        queryClient.invalidateQueries({
          queryKey: ["registration", id],
        });
      },
      onError: () => toast.error("Pembayaran gagal"),
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
            >
              {event?.kategori}
            </span>

            <StatusBadge status={registration?.status_pembayaran} />
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
            {event?.nama}
          </h1>

          <p className="mt-3 text-slate-600">
            Order ID: {registration?.order_id}
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Info label="Status" value={registration?.status_pembayaran} />
            <Info label="Jenis" value={event?.jenis} />
            <Info label="Kategori" value={event?.kategori} />
            <Info label="Lokasi" value={event?.lokasi} />
          </div>

          {/* ACTION */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            {registration?.status_pembayaran === "pending" && (
              <button
                onClick={handlePay}
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  transition-colors
                "
              >
                Bayar Sekarang
              </button>
            )}

            {registration?.status_pembayaran === "settlement" &&
              event?.jenis === "lomba" && (
                <button
                  onClick={() =>
                    navigate(`/participant/submissions/${registration.id}`)
                  }
                  className="
                    w-full
                    h-12
                    rounded-xl
                    bg-blue-50
                    text-blue-700
                    font-semibold
                    border border-blue-200
                    hover:bg-blue-100
                    transition-colors
                  "
                >
                  Upload Karya
                </button>
              )}

            {registration?.status_pembayaran === "settlement" &&
              event?.jenis === "non_lomba" && (
                <button
                 onClick={() =>
    navigate(
      `/participant/tickets/${registration.id}`
    )
  }
                  className="
                    w-full
                    h-12
                    rounded-xl
                    bg-green-50
                    text-green-700
                    font-semibold
                    border border-green-200
                    hover:bg-green-100
                    transition-colors
                  "
                >
                  Lihat Tiket
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const config = {
    pending: {
      className: "bg-amber-100 text-amber-700",
      icon: <Clock3 size={14} />,
    },
    settlement: {
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle size={14} />,
    },
    expire: {
      className: "bg-red-100 text-red-700",
      icon: <Clock3 size={14} />,
    },
  };

  const current = config[status] || config.pending;

  return (
    <span
      className={`
        inline-flex items-center gap-1
        rounded-full px-3 py-1
        text-xs font-medium
        ${current.className}
      `}
    >
      {current.icon}
      {status}
    </span>
  );
}

/* ================= INFO ================= */

function Info({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          flex
          h-10 w-10
          items-center justify-center
          rounded-xl
          bg-green-50
          text-green-700
        "
      >
        <Tag size={18} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-medium text-slate-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}