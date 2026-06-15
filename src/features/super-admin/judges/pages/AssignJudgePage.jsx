import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  CalendarDays,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { useJudge } from "../hooks/useJudge";
import { useEvents } from "../hooks/useEvents";
import { useAssignJudgeEvents } from "../hooks/useAssignJudgeEvents";

export default function AssignJudgePage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const { data: judgeData } =
    useJudge(id);

  const { data: eventData } =
    useEvents();

  const assignMutation =
    useAssignJudgeEvents();

  const [selectedEvents, setSelectedEvents] =
    useState([]);

  const judge =
    judgeData?.data;

  const events =
    eventData?.data || [];

  useEffect(() => {
    if (
      judge?.judged_events
    ) {
      setSelectedEvents(
        judge.judged_events.map(
          (event) => event.id
        )
      );
    }
  }, [judge]);

  const toggleEvent = (
    eventId
  ) => {
    setSelectedEvents(
      (prev) =>
        prev.includes(
          eventId
        )
          ? prev.filter(
              (id) =>
                id !==
                eventId
            )
          : [
              ...prev,
              eventId,
            ]
    );
  };

  const save =
    async () => {
      try {
        await assignMutation.mutateAsync(
          {
            id,

            payload: {
              event_ids:
                selectedEvents,
            },
          }
        );

        navigate(
          "/super-admin/judges"
        );
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  if (!judge) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-200">
              <Sparkles size={12} />
              Assign Event
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {judge.nama}
            </h1>

            <p className="mt-2 text-slate-500">
              Pilih event yang dapat dinilai oleh juri ini
            </p>
          </div>
        </div>
      </div>

      {/* EVENTS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map(
          (event) => {
            const selected =
              selectedEvents.includes(
                event.id
              );

            return (
              <button
                key={
                  event.id
                }
                type="button"
                onClick={() =>
                  toggleEvent(
                    event.id
                  )
                }
                className={`
                  group relative rounded-3xl border p-5 text-left
                  transition-all duration-300
                  ${
                    selected
                      ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 hover:-translate-y-1"
                      : "border-slate-200 bg-white hover:-translate-y-1"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 group-hover:bg-slate-200 transition">
                    <CalendarDays size={20} />
                  </div>

                  {selected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 size={14} />
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {event.nama}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {
                    event.kategori
                  }{" "}
                  •{" "}
                  {
                    event.lokasi
                  }
                </p>

                {selected && (
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-200 pointer-events-none" />
                )}
              </button>
            );
          }
        )}
      </div>

      {/* ACTION */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() =>
            navigate(
              "/super-admin/judges"
            )
          }
          className="flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>

        <button
          onClick={save}
          disabled={
            assignMutation.isPending
          }
          className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
        >
          {assignMutation.isPending
            ? "Menyimpan..."
            : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}