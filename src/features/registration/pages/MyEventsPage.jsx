import { useMyRegistrations } from "../hooks/useMyRegistrations";
import RegistrationCard from "../components/RegistrationCard";
import { Sparkles } from "lucide-react";

import { useState, useEffect } from "react";

import { usePublicFestivals } from "@/features/payments/hooks/usePublicFestivals";

export default function MyEventsPage() {
  const { data: festivalData } = usePublicFestivals();

  const festivals = festivalData?.data || [];

  const publishedFestival = festivals.find(
    (festival) => festival.status === "published",
  );

  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    if (selectedFestival === null && festivals.length > 0) {
      setSelectedFestival(
        publishedFestival ? String(publishedFestival.id) : "all",
      );
    }
  }, [selectedFestival, festivals, publishedFestival]);

  const {
    data,

    isLoading,
  } = useMyRegistrations(selectedFestival);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-sm text-slate-500">Loading events...</p>
        </div>
      </div>
    );
  }

  const registrations = data?.data ?? [];
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 ">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            My Events
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Event Saya
          </h1>

          <p className="mt-2 text-slate-500">
            Daftar event yang sudah kamu ikuti
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

      {/* CONTENT */}

      {!registrations.length ? (
        <div className="space-y-8">
          {/* EMPTY */}
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <Sparkles size={40} className="mx-auto text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Belum ada event
            </h3>

            <p className="mt-1 text-slate-500">
              Kamu belum mendaftar ke event apa pun
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {registrations.map((registration) => (
            <RegistrationCard
              key={registration.id}
              registration={registration}
              festivalId={selectedFestival}
            />
          ))}
        </div>
      )}
    </div>
  );
}
