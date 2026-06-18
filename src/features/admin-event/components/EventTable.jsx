import {
  ClipboardList,
  Users,
  ArrowRight,
  Ticket,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function EventTable({
  events,
}) {
  const navigate = useNavigate();

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
          Event yang Anda miliki akan
          muncul di sini
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
            transition-all
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {event.nama}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {event.kategori}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  Peserta
                  <b>
                    {
                      event.jumlah_peserta
                    }
                  </b>
                </div>

                <div className="flex items-center gap-2">
                  <ClipboardList
                    size={16}
                  />
                  Kriteria
                  <b>
                    {
                      event.jumlah_kriteria
                    }
                  </b>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/admin-event/events/${event.id}/criteria`
                )
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
              Kelola Kriteria
              <ArrowRight
                size={16}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}