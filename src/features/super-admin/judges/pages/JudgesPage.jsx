import { Link } from "react-router-dom";
import { Plus, Users, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { useJudges } from "../hooks/useJudges";
import { useDeleteJudge } from "../hooks/useDeleteJudge";
import { useFestivals } from "../../festivals/hooks/useFestivals";

import JudgeCard from "../components/JudgeCard";

export default function JudgesPage() {
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

  const { data, isLoading } = useJudges(selectedFestival);

  const deleteMutation = useDeleteJudge();

  const judges = data?.data || [];

  const handleDelete = (id) => {
    const confirmed = window.confirm("Hapus juri ini?");

    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  if (isLoading || selectedFestival === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-200">
              <Sparkles size={12} />
              Management
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Judge Event
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola judge dan event yang mereka nilai
            </p>
          </div>

          <Link
            to="create"
            className="
              flex items-center gap-2
              rounded-2xl
              bg-purple-50
              px-5 py-3
              font-semibold text-purple-700
              ring-1 ring-purple-200
              transition-all
              hover:bg-purple-100
            "
          >
            <Plus size={18} />
            Tambah Judge
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
              focus:border-purple-500
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
      {judges.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Users
            size={40}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Belum ada judge
          </h3>

          <p className="mt-1 text-slate-500">
            Tambahkan judge untuk mulai melakukan penilaian event
          </p>

          <Link
            to="create"
            className="
              mt-6 inline-flex
              items-center gap-2
              rounded-2xl
              bg-purple-50
              px-5 py-3
              font-semibold
              text-purple-700
              ring-1 ring-purple-200
              hover:bg-purple-100
            "
          >
            <Plus size={18} />
            Tambah Judge
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {judges.map((judge) => (
            <JudgeCard
              key={judge.id}
              judge={judge}
              onDelete={() => handleDelete(judge.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}