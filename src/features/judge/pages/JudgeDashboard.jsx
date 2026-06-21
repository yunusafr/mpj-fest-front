import StatCard from "@/components/dashboard/StatCard";
import { FolderKanban, FileCheck, Clock, Trophy } from "lucide-react";
import { Sparkles } from "lucide-react";

import { useJudgeDashboard } from "../hooks/useJudgeDashboard";
import { useActiveFestival } from "@/features/festival/hooks/useActiveFestival";

export default function JudgeDashboard() {
  const { data, isLoading } = useJudgeDashboard();
  const { data: activeFestival } = useActiveFestival();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const stats = data?.data;
  const festival = activeFestival?.data;

  const total = Number(stats?.total_karya ?? 0);

  const dinilai = Number(stats?.sudah_dinilai ?? 0);

  const progress = total > 0 ? Math.round((dinilai / total) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          p-8
          md:p-10
        "
        style={{
          background: "linear-gradient(135deg,#ffffff,#f0fdf4)",
          borderColor: "rgba(6,70,34,.08)",
        }}
      >
        <div
          className="
            absolute
            top-0
            right-0
            h-56
            w-56
            rounded-full
            blur-3xl
          "
          style={{
            background: "rgba(34,197,94,.15)",
          }}
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-40
            w-40
            rounded-full
            blur-3xl
          "
          style={{
            background: "rgba(234,179,8,.10)",
          }}
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={15} />
            {festival?.nama}
          </span>

          <h1
            className="
              mt-4
              text-5xl
              font-black
            "
            style={{
              color: "#43A047",
            }}
          >
            Dashboard Juri
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Pantau progres penilaian, karya yang sudah diperiksa, dan tugas yang
            masih perlu diselesaikan.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Event"
          value={stats?.total_event ?? 0}
          icon={FolderKanban}
          iconColor="rgba(59,130,246,.12)"
          description={
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(59,130,246,.12)",
                  color: "#2563EB",
                }}
              >
                <FolderKanban size={18} />
              </div>

              <span className="text-sm text-slate-500">
                Total event yang dinilai
              </span>
            </div>
          }
        />

        <StatCard
          title="Total Karya"
          value={stats?.total_karya ?? 0}
          icon={Trophy}
          iconColor="rgba(168,85,247,.12)"
          description={
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(168,85,247,.12)",
                  color: "#9333EA",
                }}
              >
                <Trophy size={18} />
              </div>

              <span className="text-sm text-slate-500">Total karya masuk</span>
            </div>
          }
        />

        <StatCard
          title="Sudah Dinilai"
          value={stats?.sudah_dinilai ?? 0}
          icon={FileCheck}
          iconColor="rgba(34,197,94,.15)"
          description={
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(34,197,94,.15)",
                  color: "#16A34A",
                }}
              >
                <FileCheck size={18} />
              </div>

              <span className="text-sm text-slate-500">
                Karya sudah diberi nilai
              </span>
            </div>
          }
        />

        <StatCard
          title="Belum Dinilai"
          value={stats?.belum_dinilai ?? 0}
          icon={Clock}
          iconColor="rgba(249,115,22,.12)"
          description={
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(249,115,22,.12)",
                  color: "#EA580C",
                }}
              >
                <Clock size={18} />
              </div>

              <span className="text-sm text-slate-500">
                Karya menunggu penilaian
              </span>
            </div>
          }
        />
      </div>

      {/* PROGRESS CARD */}
      <div
        className="
          rounded-[32px]
          border
          bg-white
          p-8
          shadow-sm
        "
        style={{
          borderColor: "rgba(6,70,34,.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Persentase Penilaian</h2>

            <p className="mt-1 text-slate-500">
              Persentase karya yang telah dinilai
            </p>
          </div>

          <div
            className="
              text-4xl
              font-black
            "
            style={{
              color: "#43A047",
            }}
          >
            {progress}%
          </div>
        </div>

        <div
          className="
    mt-6
    rounded-[24px]
    border
    bg-white
    p-6
    shadow-sm
  "
          style={{
            borderColor: "rgba(6,70,34,.08)",
          }}
        >
          {/* HEADER */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Progress Penilaian
              </h2>
              <p className="text-sm text-slate-500">
                Karya yang sudah dan belum dinilai
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black text-[#43A047]">
                {progress}%
              </div>
              <p className="text-xs text-slate-500">
                {dinilai} / {total} karya
              </p>
            </div>
          </div>

          {/* TRACK */}
          <div className="mt-6 relative h-5 rounded-full bg-slate-100 overflow-hidden">
            {/* background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#43A047_1px,_transparent_1px)] [background-size:10px_10px]" />

            {/* progress fill */}
            <div
              className="relative h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#064622,#22C55E,#86EFAC)",
                boxShadow: "0 0 18px rgba(34,197,94,.35)",
              }}
            />
          </div>

          {/* LABELS */}
          <div className="mt-4 flex justify-between text-xs text-slate-500">
            <span>Belum dinilai</span>
            <span className="font-medium text-slate-700">Target selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PremiumStatCard({ label, value, icon, color, text }) {
  return (
    <div
      className="
        group
        rounded-[28px]
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
      style={{
        borderColor: "rgba(6,70,34,.08)",
      }}
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
        "
        style={{
          background: color,
          color: text,
        }}
      >
        {icon}
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">{label}</p>

        <h2
          className="
            mt-2
            text-4xl
            font-black
          "
        >
          {value ?? 0}
        </h2>
      </div>
    </div>
  );
}
