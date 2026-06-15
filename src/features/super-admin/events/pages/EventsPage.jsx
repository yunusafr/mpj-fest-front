import { Link } from "react-router-dom";
import {
  Sparkles,
  CalendarDays,
} from "lucide-react";
import {
  useMemo,
  useState,
  useEffect,
} from "react";

import EventTable from "../components/EventTable";

import { useEvents } from "../hooks/useEvents";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useFestivals } from "../../festivals/hooks/useFestivals";

export default function EventsPage() {
  const { data, isLoading } =
    useEvents();

  const {
    data: festivalData,
  } = useFestivals();

  const deleteMutation =
    useDeleteEvent();

  const events =
    data?.data || [];

  const festivals =
    festivalData?.data || [];

  const [
    selectedFestival,
    setSelectedFestival,
  ] = useState("");

  useEffect(() => {
    if (
      festivals.length > 0 &&
      !selectedFestival
    ) {
      const publishedFestival =
        festivals.find(
          (festival) =>
            festival.status ===
            "published"
        );

      if (publishedFestival) {
        setSelectedFestival(
          String(
            publishedFestival.id
          )
        );
      } else {
        setSelectedFestival(
          "all"
        );
      }
    }
  }, [
    festivals,
    selectedFestival,
  ]);

  const filteredEvents =
    useMemo(() => {
      if (
        selectedFestival ===
          "all" ||
        !selectedFestival
      ) {
        return events;
      }

      return events.filter(
        (event) =>
          String(
            event.festival_id
          ) ===
          String(
            selectedFestival
          )
      );
    }, [
      events,
      selectedFestival,
    ]);

  const handleDelete = (
    id
  ) => {
    if (
      window.confirm(
        "Hapus event?"
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500" />

          <p className="text-sm text-slate-500">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Event Management
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Event
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola seluruh event
              festival
            </p>
          </div>

          <Link
            to="/super-admin/events/create"
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-emerald-600
              px-5 py-3
              text-sm font-semibold
              text-white
              transition-all
              hover:shadow-md
              hover:from-emerald-600
              hover:to-emerald-700
            "
          >
            <CalendarDays size={18} />
            Tambah Event
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex justify-end">
          <select
            value={
              selectedFestival
            }
            onChange={(e) =>
              setSelectedFestival(
                e.target.value
              )
            }
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              focus:border-emerald-500
            "
          >
            <option value="all">
              Semua Festival
            </option>

            {festivals.map(
              (festival) => (
                <option
                  key={
                    festival.id
                  }
                  value={
                    festival.id
                  }
                >
                  {
                    festival.nama
                  }
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <EventTable
        events={
          filteredEvents
        }
        onDelete={
          handleDelete
        }
      />
    </div>
  );
}