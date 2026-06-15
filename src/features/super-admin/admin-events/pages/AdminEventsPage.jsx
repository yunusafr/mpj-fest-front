import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Sparkles } from "lucide-react";

import { useFestivals } from "../../festivals/hooks/useFestivals";
import { useAdminEvents } from "../hooks/useAdminEvents";

import AdminEventCard from "../components/AdminEventCard";

export default function AdminEventsPage() {
  const [selectedFestival, setSelectedFestival] = useState(null);

  const { data: festivalData } = useFestivals();

  const festivals = festivalData?.data || [];

  const publishedFestival = festivals.find(
    (festival) => festival.status === "published"
  );

  useEffect(() => {
    if (selectedFestival === null && festivals.length > 0) {
      setSelectedFestival(
        publishedFestival ? String(publishedFestival.id) : "all"
      );
    }
  }, [selectedFestival, festivals, publishedFestival]);

  const { data, isLoading } = useAdminEvents(selectedFestival);

  const admins = data?.data || [];

  if (selectedFestival === null || isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          <p className="text-slate-500">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
              <Sparkles size={12} />
              Management
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Admin Event
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola admin dan event yang mereka tangani
            </p>
          </div>

          <Link
            to="create"
            className="
              flex items-center gap-2
              rounded-2xl
              bg-emerald-50
              px-5 py-3
              font-semibold text-emerald-700
              ring-1 ring-emerald-200
              transition-all
              hover:bg-emerald-100
            "
          >
            <Plus size={18} />
            Tambah Admin
          </Link>
        </div>
      </div>

      {/* FILTER FESTIVAL */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex justify-end">
          <select
            value={selectedFestival}
            onChange={(e) => setSelectedFestival(e.target.value)}
            className="
              rounded-xl
              border border-slate-200
              px-4 py-3
              outline-none
              focus:border-emerald-500
            "
          >
            <option value="all">Semua Festival</option>

            {festivals.map((festival) => (
              <option
                key={festival.id}
                value={String(festival.id)}
              >
                {festival.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* EMPTY STATE */}
      {admins.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Users
            size={40}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Belum ada admin event
          </h3>

          <p className="mt-1 text-slate-500">
            Tambahkan admin untuk mulai mengelola event
          </p>

          <Link
            to="create"
            className="
              mt-6 inline-flex
              items-center gap-2
              rounded-2xl
              bg-emerald-50
              px-5 py-3
              font-semibold text-emerald-700
              ring-1 ring-emerald-200
              transition-all
              hover:bg-emerald-100
            "
          >
            <Plus size={18} />
            Tambah Admin
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {admins.map((admin) => (
            <AdminEventCard
              key={admin.id}
              admin={admin}
            />
          ))}
        </div>
      )}
    </div>
  );
}