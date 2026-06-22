import {
  MoreVertical,
  ClipboardList,
  Vote,
  ChevronRight,
  Users,
  Ticket,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EventTable({ events }) {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);

  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        {" "}
        <Ticket size={40} className="mx-auto text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          Belum ada event
        </h3>
        <p className="mt-1 text-slate-500">
          Event yang Anda miliki akan muncul di sini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
       "
        >
          {" "}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {" "}
            <div className="space-y-4">
              {" "}
              <div>
                {" "}
                <h3 className="text-lg font-semibold text-slate-900">
                  {event.nama}{" "}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{event.kategori}</p>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  Peserta
                  <b>{event.jumlah_peserta}</b>
                </div>

                <div className="flex items-center gap-2">
                  <ClipboardList size={16} />
                  Kriteria
                  <b>{event.jumlah_kriteria}</b>
                </div>
              </div>
            </div>
            {/* Action */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === event.id ? null : event.id)
                }
                className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-emerald-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              hover:shadow-md
              hover:from-emerald-600
              hover:to-emerald-700
            "
              >
                Manage
                <MoreVertical size={16} />
              </button>

              {openMenu === event.id && (
                <div
                  className="
                absolute
                right-0
                top-full
                z-20
                mt-3
                w-56
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-xl
              "
                >
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Manage Event
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/admin-event/events/${event.id}/criteria`)
                    }
                    className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
                  >
                    <div className="flex items-center gap-3">
                      <ClipboardList size={16} />
                      <span>Kriteria</span>
                    </div>

                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin-event/events/${event.id}/voting`)
                    }
                    className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
                  >
                    <div className="flex items-center gap-3">
                      <Vote size={16} />
                      <span>Voting</span>
                    </div>

                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin-event/events/${event.id}/leaderboard`)
                    }
                    className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
                  >
                    <div className="flex items-center gap-3">
                      <Vote size={16} />
                      <span>Leaderboard</span>
                    </div>

                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin-event/events/${event.id}/certificates`)
                    }
                    className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
                  >
                    <div className="flex items-center gap-3">
                      <Vote size={16} />
                      <span>Certificates</span>
                    </div>

                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
