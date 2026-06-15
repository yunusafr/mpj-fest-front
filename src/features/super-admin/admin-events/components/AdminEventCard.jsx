import { Link } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  ChevronRight,
  Calendar,
  BadgeCheck,
  FolderKanban,
} from "lucide-react";

export default function AdminEventCard({
  admin,
}) {
const totalEvents =
  Number(admin.managed_events_count) || 0;

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span
            className="
              rounded-full
              bg-blue-50
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-700
              ring-1
              ring-blue-200
            "
          >
            Admin Event
          </span>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-blue-50
          "
        >
          <ShieldCheck
            size={20}
            className="text-blue-600"
          />
        </div>
      </div>

      {/* Nama */}
      <h3
        className="
          mt-5
          text-xl
          font-bold
          text-slate-900
        "
      >
        {admin.nama}
      </h3>

      {/* Email */}
      <div
        className="
          mt-4
          flex
          items-center
          gap-3
          text-sm
          text-slate-600
        "
      >
        <Mail
          size={16}
          className="text-slate-400"
        />

        <span>{admin.email}</span>
      </div>

      {/* Info Grid */}
      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-3
        "
      >

      </div>

      {/* Stats */}
      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          rounded-2xl
          bg-emerald-50
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <FolderKanban
            size={18}
            className="text-emerald-600"
          />

          <span
            className="
              text-sm
              text-slate-600
            "
          >
            Managed Events
          </span>
        </div>

        <span
          className="
            text-lg
            font-bold
            text-emerald-700
          "
        >
          {totalEvents}
        </span>
      </div>

      {/* Footer */}
      <div
        className="
          mt-6
          border-t
          border-slate-100
          pt-4
        "
      >
        <div
          className="
            mb-4
            flex
            items-center
            gap-2
            text-xs
            text-slate-500
          "
        >
          <Calendar size={14} />

          Dibuat{" "}
          {new Date(
            admin.created_at
          ).toLocaleDateString("id-ID")}
        </div>

        <Link
          to={`${admin.id}/assign`}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            px-4
            py-3
            font-semibold
            text-white
            shadow-md
            transition-all
            hover:shadow-lg
          "
        >
          <span>
            Assign Event
          </span>

          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}