import { Link } from "react-router-dom";

import {
  Users,
  CheckCircle,
  Sparkles,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

import { useAttendances } from "../hooks/useAttendances";

import { useState, useEffect } from "react";

import { usePublicFestivals }
from "../../payments/hooks/usePublicFestivals";

export default function AttendancesPage() {
const {
  data: festivalData,
} = usePublicFestivals();

const festivals =
  festivalData?.data || [];

const publishedFestival =
  festivals.find(
    (festival) =>
      festival.status ===
      "published"
  );

const [
  selectedFestival,
  setSelectedFestival,
] = useState(null);

useEffect(() => {

  if (
    selectedFestival === null &&
    festivals.length > 0
  ) {

    setSelectedFestival(

      publishedFestival

        ? String(
            publishedFestival.id
          )

        : "all"

    );

  }

}, [

  selectedFestival,

  festivals,

  publishedFestival,

]);

const {
  data,
  isLoading,
} = useAttendances(
  selectedFestival
);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">
            Loading attendance events...
          </p>
        </div>
      </div>
    );
  }

  const events = data?.data || [];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-xs
              font-semibold
              text-emerald-700
              ring-1
              ring-emerald-200
            "
          >
            <Sparkles size={12} />
            Attendance Management
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Absensi Event
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola dan monitor kehadiran peserta pada setiap event festival
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">

  <div className="flex justify-end">

    <select

      value={selectedFestival ?? ""}

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

            value={String(
              festival.id
            )}

          >

            {festival.nama}

          </option>

        )
      )}

    </select>

  </div>

</div>

      {/* Empty State */}

      {events.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Belum ada event
          </h3>

          <p className="mt-2 text-slate-500">
            Event yang memiliki absensi akan muncul di sini
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const hadir = Number(event.total_hadir);
            const pendaftar = Number(event.total_pendaftar);

            const progress =
              pendaftar > 0
                ? Math.round((hadir / pendaftar) * 100)
                : 0;

            return (
             <Link
  key={event.id}
  to={`${event.id}?festival_id=${selectedFestival}`}
  className="
    group
    block
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
                  {/* Left */}

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {event.nama}
                      </h3>

                      <span
                        className="
                          rounded-full
                          bg-emerald-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-emerald-700
                        "
                      >
                        {event.kategori}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-5 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {event.lokasi}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {event.waktu_mulai}
                      </div>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="w-full lg:w-72">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users size={16} />
                        <span>{pendaftar} Pendaftar</span>
                      </div>

                      <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <CheckCircle size={16} />
                        <span>{hadir} Hadir</span>
                      </div>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-emerald-500
                          to-emerald-600
                          transition-all
                        "
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2 text-right text-xs text-slate-500">
                      Tingkat Kehadiran {progress}%
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}