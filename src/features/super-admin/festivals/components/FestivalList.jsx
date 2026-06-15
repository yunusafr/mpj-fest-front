import {
  Pencil,
  Trash2,
  MapPin,
  Calendar,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useFestivalMutations } from "../hooks/useFestivalMutations";



export default function FestivalList({
  festivals,
  onDelete,
}) {
  if (festivals.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Belum ada festival
        </h3>

        <p className="mt-2 text-slate-500">
          Festival yang dibuat akan muncul di sini
        </p>
      </div>
    );
  }

  const { updateMutation, deleteMutation } = useFestivalMutations();
  const handleStatusChange = (festival, status) => {
  updateMutation.mutate({
    id: festival.id,
    payload: { status },
  });
};

  return (
    <div className="space-y-4">

      {festivals.map((festival) => (
        <div
          key={festival.id}
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

            <div className="space-y-3">

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-semibold text-lg text-slate-900">
                  {festival.nama}
                </h3>

                <div className="flex items-center rounded-2xl bg-slate-100 p-1 shadow-inner">
  {["draft", "published", "completed"].map((s) => {
    const isActive = festival.status === s;

    const styles = {
      draft: isActive
        ? "bg-amber-500 text-white shadow-md"
        : "text-slate-500 hover:text-amber-600",
      published: isActive
        ? "bg-emerald-500 text-white shadow-md"
        : "text-slate-500 hover:text-emerald-600",
      completed: isActive
        ? "bg-blue-500 text-white shadow-md"
        : "text-slate-500 hover:text-blue-600",
    };

    return (
      <button
        key={s}
        onClick={() => handleStatusChange(festival, s)}
        className={`
          px-4 py-2
          rounded-xl
          text-xs
          font-semibold
          capitalize
          transition-all
          duration-200
          ${styles[s]}
          ${!isActive && "hover:bg-white"}
        `}
      >
        {s}
      </button>
    );
  })}
</div>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {festival.lokasi}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {festival.tanggal_mulai}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {festival.tanggal_selesai}
                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <Link
                to={`/super-admin/festivals/${festival.id}/edit`}
                className="
                  p-2.5
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  hover:text-emerald-600
                "
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={() => onDelete(festival.id)}
                className="
                  p-2.5
                  rounded-xl
                  border
                  border-red-100
                  text-red-500
                  transition
                  hover:bg-red-50
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}