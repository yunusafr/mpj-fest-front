import { useMemo, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { useEvents } from "../hooks/useEvents";
import EventTable from "../components/EventTable";
import { usePublicFestivals } from "@/features/payments/hooks/usePublicFestivals";

export default function EventsPage() {
  const { data, isLoading } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const events = data?.data || [];

  const festivalId = searchParams.get("festival_id");

  const { data: festivalData } = usePublicFestivals();
  const festivals = festivalData?.data || [];

  const publishedFestival = festivals.find(
    (festival) => festival.status === "published",
  );

  // Set default festival ke URL jika belum ada
  useEffect(() => {
    if (!festivalId && publishedFestival) {
      setSearchParams({
        festival_id: String(publishedFestival.id),
      });
    }
  }, [festivalId, publishedFestival, setSearchParams]);

  const activeFestivalId =
    festivalId || publishedFestival?.id?.toString() || "";

  const filteredEvents = useMemo(() => {
    if (!activeFestivalId || activeFestivalId === "all") {
      return events;
    }

    return events.filter(
      (event) => String(event.festival_id) === String(activeFestivalId),
    );
  }, [events, activeFestivalId]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500" />
          <p className="text-sm text-slate-500">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Event Management
          </span>

          <h1 className="mt-4 text-3xl font-bold">Event Saya</h1>
          <p className="mt-2 text-slate-500">Kelola event yang Anda miliki</p>
        </div>
      </div>

      {/* Festival Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex justify-end">
          <select
            value={activeFestivalId || "all"}
            onChange={(e) => {
              setSearchParams({
                festival_id: e.target.value,
              });
            }}
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

      <EventTable events={filteredEvents} />
    </div>
  );
}
