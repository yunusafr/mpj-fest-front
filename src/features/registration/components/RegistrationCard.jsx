import {
  Calendar,
  Receipt,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RegistrationCard({
  registration,
}) {
  const status =
    registration?.status_pembayaran;

  const statusColor = {
    pending:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    settlement:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    expire:
      "bg-red-50 text-red-700 ring-1 ring-red-200",
    cancel:
      "bg-red-50 text-red-700 ring-1 ring-red-200",
  };

  const capitalizeWords = (text) =>
    text
      ?.split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join(" ");

  return (
    <div
      className="
        group
        rounded-3xl
        border border-slate-200/70
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                statusColor[status] ||
                "bg-slate-100 text-slate-700"
              }
            `}
          >
            {capitalizeWords(status)}
          </span>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                registration.event.jenis ===
                "lomba"
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                  : "bg-green-50 text-green-700 ring-1 ring-green-200"
              }
            `}
          >
            {capitalizeWords(
              registration.event.jenis
            )}
          </span>
        </div>

        <span
          className="
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          Registrasi
        </span>
      </div>

      {/* Title */}
      <h3
        className="
          mt-5
          text-xl
          font-bold
          text-slate-900
          leading-snug
        "
      >
        {registration.event.nama}
      </h3>

      {/* Info */}
      <div
        className="
          mt-6
          space-y-4
          text-sm
          text-slate-600
        "
      >
        <div className="flex items-center gap-3">
          <Receipt
            size={16}
            className="text-slate-400"
          />
          <span>{registration.order_id}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={16}
            className="text-slate-400"
          />
          <span>
            {registration.event.lokasi}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar
            size={16}
            className="text-slate-400"
          />
          <span>
            {new Date(
              registration.event.waktu_mulai
            ).toLocaleString("id-ID", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

      

      {/* Footer */}
      <div
        className="
          mt-6
          border-t
          border-slate-100
          pt-4
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-xs
            tracking-wider
            text-slate-400
          "
        >
          ID Registrasi : #{registration.id}
        </span>

        <Link
to={`/participant/registrations/${registration.id}`}
          className="
            flex
            items-center
            gap-1
            text-sm
            font-semibold
            text-slate-700
            hover:text-slate-900
          "
        >
          Detail
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}