import {
Pencil,
Trash2,
Trophy,
Users,
Landmark,
Ticket,
} from "lucide-react";

import { Link } from "react-router-dom";

import EventTypeBadge from "./EventTypeBadge";
import EventPermissionBadge from "./EventPermissionBadge";

export default function EventTable({
events,
onDelete,
}) {
if (events.length === 0) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
      <Ticket
        size={40}
        className="mx-auto text-slate-400"
      />

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        Belum ada event
      </h3>

      <p className="mt-1 text-slate-500">
        Event yang dibuat akan muncul di sini
      </p>
    </div>
  );
}

return ( <div className="space-y-4">


  {events.map((event) => (
    <div
      key={event.id}
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="space-y-4">

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">
              {event.nama}
            </h3>

            <EventTypeBadge
              type={event.jenis}
            />

            <EventPermissionBadge
              permission={
                event.permission_peserta
              }
            />
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <Landmark size={16} />
              {event?.festival?.nama}
            </div>

            <div className="flex items-center gap-2">
              <Trophy size={16} />
              {event.kategori}
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />
              Kuota {event.kuota}
            </div>

            <div className="flex items-center gap-2">
              <Ticket size={16} />
              Rp
              {Number(
                event.htm
              ).toLocaleString(
                "id-ID"
              )}
            </div>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <Link
            to={`/super-admin/events/${event.id}/edit`}
            className="
              rounded-xl
              border
              border-slate-200
              p-2.5
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-emerald-600
            "
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={() =>
              onDelete(event.id)
            }
            className="
              rounded-xl
              border
              border-red-100
              p-2.5
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  ))}
</div>


);
}
