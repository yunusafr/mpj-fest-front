import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

import EventCard from "../components/EventCard";
import EventFilter from "../components/EventFilter";

import { useEvents } from "../hooks/useEvents";
import { usePublicFestivals } from "../../payments/hooks/usePublicFestivals";

export default function EventsPage() {
  const { data: festivalsData, isLoading: isLoadingFestivals } =
    usePublicFestivals();

  const [search, setSearch] = useState("");
const [selectedFestival, setSelectedFestival] = useState(null);

const festivals = festivalsData?.data ?? [];

// ambil festival published pertama
useEffect(() => {
  if (festivals.length && selectedFestival === null) {
    const publishedFestival = festivals.find(
      (f) => f.status === "published"
    );

    if (publishedFestival) {
      setSelectedFestival(String(publishedFestival.id));
    }
  }
}, [festivals]);

  const { data: eventsData, isLoading: isLoadingEvents } =
    useEvents(selectedFestival);

  if (isLoadingFestivals || isLoadingEvents) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-sm text-slate-500">Loading events...</p>
        </div>
      </div>
    );
  }

  const events = eventsData?.data ?? [];

  const filteredEvents = events.filter((event) =>
    event.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Events Page
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Daftar Event
          </h1>

          <p className="mt-2 text-slate-500">
            Pilih event yang ingin kamu ikuti
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex justify-end">
          <select
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
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
            <option value="all">Semua Festival</option>

            {festivals.map((festival) => (
              <option key={festival.id} value={String(festival.id)}>
                {festival.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredEvents.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-12 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
            <Sparkles className="text-emerald-600" size={20} />
          </div>

          <p className="text-slate-500">Event tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}