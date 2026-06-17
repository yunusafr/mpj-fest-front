import {
  FolderKanban,
  FileCheck,
  Clock,
  Trophy,
} from "lucide-react";
import { Sparkles } from "lucide-react";


import { useJudgeDashboard } from "../hooks/useJudgeDashboard";
import { useActiveFestival } from "@/features/festival/hooks/useActiveFestival";

export default function JudgeDashboard() {
const { data, isLoading } = useJudgeDashboard();
const { data: activeFestival } = useActiveFestival();
  

  if (isLoading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  const stats = data?.data;
  const festival = activeFestival?.data;

  const total =
    Number(stats?.total_karya ?? 0);

  const dinilai =
    Number(stats?.sudah_dinilai ?? 0);

  const progress =
    total > 0
      ? Math.round((dinilai / total) * 100)
      : 0;

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
          background:
            "linear-gradient(135deg,#ffffff,#f0fdf4)",
          borderColor:
            "rgba(6,70,34,.08)",
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
            background:
              "rgba(34,197,94,.15)",
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
            background:
              "rgba(234,179,8,.10)",
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
            Pantau progres penilaian,
            karya yang sudah diperiksa,
            dan tugas yang masih perlu
            diselesaikan.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <PremiumStatCard
          label="Total Event"
          value={stats?.total_event}
          icon={<FolderKanban size={24} />}
          color="rgba(59,130,246,.12)"
          text="#2563EB"
        />

        <PremiumStatCard
          label="Total Karya"
          value={stats?.total_karya}
          icon={<Trophy size={24} />}
          color="rgba(168,85,247,.12)"
          text="#9333EA"
        />

        <PremiumStatCard
          label="Sudah Dinilai"
          value={stats?.sudah_dinilai}
          icon={<FileCheck size={24} />}
          color="rgba(34,197,94,.15)"
          text="#16A34A"
        />

        <PremiumStatCard
          label="Belum Dinilai"
          value={stats?.belum_dinilai}
          icon={<Clock size={24} />}
          color="rgba(249,115,22,.12)"
          text="#EA580C"
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
          borderColor:
            "rgba(6,70,34,.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Progress Penilaian
            </h2>

            <p className="mt-1 text-slate-500">
              Persentase karya yang
              telah dinilai
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

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg,#43A047,#22C55E)",
            }}
          />
        </div>
      </div>

    </div>
  );
}

function PremiumStatCard({
  label,
  value,
  icon,
  color,
  text,
}) {
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
        borderColor:
          "rgba(6,70,34,.08)",
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
        <p className="text-sm text-slate-500">
          {label}
        </p>

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