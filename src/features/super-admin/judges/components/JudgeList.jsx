import { Link } from "react-router-dom";
import { Mail, Gavel, FolderKanban, Calendar, Pencil, Trash2 } from "lucide-react";

export default function JudgeList({ judges, onDelete }) {
  if (judges.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Belum ada judge
        </h3>

        <p className="mt-2 text-slate-500">
          Tambahkan judge untuk mulai melakukan penilaian event
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {judges.map((judge) => {
        const totalEvents = Number(judge.judged_events_count) || 0;

        return (
          <div
            key={judge.id}
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
              
              {/* LEFT */}
              <div className="space-y-3">
                
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {judge.nama}
                  </h3>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-200">
                    Juri
                  </span>
                </div>

                <div className="flex flex-wrap gap-5 text-sm text-slate-500">
                  
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {judge.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <FolderKanban size={16} />
                    {totalEvents} Event
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(judge.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>

              {/* RIGHT ACTION */}
              <div className="flex items-center gap-2">
                
                <Link
                  to={`/super-admin/judges/${judge.id}/assign`}
                  className="
                    inline-flex items-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-emerald-500 to-emerald-600
                    px-4 py-2.5
                    text-sm font-semibold text-white
                    hover:from-emerald-600 hover:to-emerald-700
                  "
                >
                  <Gavel size={16} />
                  Assign
                </Link>

                <Link
                  to={`/super-admin/judges/${judge.id}/edit`}
                  className="
                    p-2.5
                    rounded-xl
                    border border-slate-200
                    text-slate-600
                    hover:bg-slate-50
                    hover:text-emerald-600
                  "
                >
                  <Pencil size={18} />
                </Link>

                <button
                  onClick={() => onDelete(judge.id)}
                  className="
                    p-2.5
                    rounded-xl
                    border border-red-100
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}