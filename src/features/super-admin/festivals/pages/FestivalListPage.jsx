import { Link } from "react-router-dom";
import { Sparkles, CalendarDays } from "lucide-react";

import { useFestivals } from "../hooks/useFestivals";
import { useDeleteFestival } from "../hooks/useDeleteFestival";
import FestivalList from "../components/FestivalList";

export default function FestivalListPage() {
  const { data, isLoading } = useFestivals();
  const deleteMutation = useDeleteFestival();

  const festivals = data?.data || [];

  const handleDelete = (id) => {
    if (window.confirm("Hapus festival?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">
            Loading festivals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 ">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Festival Management
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Festival
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola seluruh festival yang tersedia
            </p>
          </div>

          <Link
            to="/super-admin/festivals/create"
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
            Tambah Festival
          </Link>

        </div>
      </div>

      <FestivalList
        festivals={festivals}
        onDelete={handleDelete}
      />

    </div>
  );
}