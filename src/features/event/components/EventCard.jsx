import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight, Users } from "lucide-react";

export default function EventCard({ event }) {

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
    <Link
      to={`/participant/events/${event.id}`}
      className="
        group
        block
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
        <span
          className="
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-700
            ring-1 ring-emerald-200
          "
        >
          {event.kategori}
        </span>

        <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                event.jenis ===
                "lomba"
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                  : "bg-green-50 text-green-700 ring-1 ring-green-200"
              }
            `}
          >
            {capitalizeWords(
              event.jenis
            )}
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
        {event.nama}
      </h3>

      {/* Info */}
      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-slate-400" />
          <span>{event.lokasi}</span>
        </div>

        <div className="flex items-center gap-3">
          <Users size={16} className="text-slate-400" />
          <span>Kuota {event.kuota}</span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-slate-400" />
          <span>
            {new Date(event.waktu_mulai).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          mt-6
          border-t border-slate-100
          pt-4
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-lg
            font-bold
            text-slate-900
          "
        >
          Rp {Number(event.htm).toLocaleString("id-ID")}
        </span>

        <span
          className="
            text-sm
            font-semibold
            flex
            items-center
            text-slate-700
            group-hover:translate-x-1
            transition-transform
          "
        >
          Detail
          <ChevronRight size={16} />
        </span>
      </div>
    </Link>
  );
}