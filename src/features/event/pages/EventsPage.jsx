import { useState } from "react";

import EventCard
from "../components/EventCard";

import EventFilter
from "../components/EventFilter";

import { useEvents }
from "../hooks/useEvents";

export default function EventsPage() {

  const [search, setSearch] =
    useState("");

  const {
    data,
    isLoading,
  } = useEvents();

  if (isLoading) {
    return (
      <div>
        Loading event...
      </div>
    );
  }

  const events =
    data?.data ?? [];

  const filteredEvents =
    events.filter((event) =>
      event.nama
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
  <div className="space-y-8">
    {/* Header */}
    <div
      className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-4
    "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
        >
          Event MPJ Fest
        </h1>

        <p className="mt-2 text-slate-500">
          Pilih event yang ingin Anda ikuti.
        </p>
      </div>

    </div>

    {/* Search */}
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-4
      shadow-sm
    "
    >
      <EventFilter
        search={search}
        setSearch={setSearch}
      />
    </div>

    {/* Event Grid */}
    <div
      className="
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-3
    "
    >
      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>

    {filteredEvents.length === 0 && (
      <div
        className="
        bg-white
        border
        border-dashed
        border-slate-300
        rounded-2xl
        py-12
        text-center
      "
      >
        <p className="text-slate-500">
          Event tidak ditemukan
        </p>
      </div>
    )}
  </div>
);
}