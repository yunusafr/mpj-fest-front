import { Link } from "react-router-dom";
import {
  Mail,
  FolderKanban,
  Calendar,
  Pencil,
  ChevronRight,
} from "lucide-react";

export default function AdminEventList({ admins }) {
  if (admins.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Belum ada admin event
        </h3>

        <p className="mt-2 text-slate-500">
          Tambahkan admin untuk mulai mengelola event
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {admins.map((admin) => {
        const totalEvents =
          Number(admin.managed_events_count) || 0;

        return (
          <div
            key={admin.id}
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
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {admin.nama}
                  </h3>

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

                <div className="flex flex-wrap gap-5 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {admin.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <FolderKanban size={16} />
                    {totalEvents} Event
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(
                      admin.created_at
                    ).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`${admin.id}/edit`}
                  className="
                    p-2.5
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-600
                    transition
                    hover:bg-slate-50
                    hover:text-emerald-600
                  "
                >
                  <Pencil size={18} />
                </Link>

                <Link
                  to={`${admin.id}/assign`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:from-emerald-600
                    hover:to-emerald-700
                  "
                >
                  Assign Event
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}