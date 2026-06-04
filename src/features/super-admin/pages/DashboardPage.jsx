import StatCard from "@/components/dashboard/StatCard";
import { Helmet } from "react-helmet-async";
import { Calendar, Users, Vote, CalendarDays } from "lucide-react";
import {
  useActiveFestival,
} from "@/features/festival/hooks/useActiveFestival";

export default function DashboardPage() {
  const recentActivities = [];
  const summary = [];
  const stats = [
  {
    title: "Festival",
    value: "0",
    icon: CalendarDays,
    color: "rgba(34,197,94,.15)",
    description: "Data belum tersedia",
  },
  {
    title: "Event",
    value: "0",
    icon: Calendar,
    color: "rgba(59,130,246,.12)",
    description: "Data belum tersedia",
  },
  {
    title: "Peserta",
    value: "0",
    icon: Users,
    color: "rgba(234,179,8,.15)",
    description: "Data belum tersedia",
  },
  {
    title: "Voting",
    value: "0",
    icon: Vote,
    color: "rgba(239,68,68,.12)",
    description: "Data belum tersedia",
  },
];
const { data } =
  useActiveFestival();

const festival =
  data?.data;

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | MPJ Fest</title>
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
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
    borderColor: "rgba(6,70,34,.08)",
  }}
>
  <div
    className="
      absolute
      right-0
      top-0
      h-48
      w-48
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
        "rgba(234,179,8,.12)",
    }}
  />

  <div className="relative z-10">
    <span
      className="
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
      "
      style={{
        background: "#dcfce7",
        color: "#064622",
      }}
    >
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
      Dashboard
    </h1>

    <p className="mt-3 max-w-2xl text-slate-600">
      Ringkasan statistik festival,
      peserta, voting, dan aktivitas
      sistem secara real-time.
    </p>
  </div>
</div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {stats.map((item, i) => (
    <StatCard
      key={i}
      title={item.title}
      value={item.value}
      icon={item.icon}
      iconColor={item.color}
      description={item.description}
    />
  ))}
</div>

        {/* Bottom */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Activity */}
          <div className="card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Aktivitas Terbaru
              </h2>

            </div>

            {recentActivities.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[240px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      "rgba(6,70,34,.08)",
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: "#064622",
                    }}
                  />
                </div>

                <p className="font-medium text-slate-700">
                  Belum ada aktivitas
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Aktivitas terbaru akan muncul di sini.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {recentActivities.map(
                  (activity, index) => (
                    <ActivityItem
                      key={index}
                      title={activity.title}
                      time={activity.time}
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold">
              Ringkasan Hari Ini
            </h2>

            {summary.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[240px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
  className="
    mb-4
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
  "
  style={{
    backgroundColor: "rgba(6,70,34,.08)",
  }}
>
  <div
    className="h-3 w-3 rounded-full"
    style={{
      backgroundColor: "#064622",
    }}
  />
</div>

                <p className="font-medium text-slate-700">
                  Belum tersedia
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Ringkasan statistik harian akan
                  ditampilkan di sini.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {summary.map((item, index) => (
                  <SummaryItem
                    key={index}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex gap-4">
      <div
        className="mt-2 h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: "#064622",
        }}
      />

      <div>
        <p className="font-medium text-slate-800">
          {title}
        </p>

        <p className="text-sm text-slate-500">
          {time}
        </p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p
        className="
          mt-1
          text-3xl
          font-black
        "
        style={{
          color: "#064622",
        }}
      >
        {value}
      </p>
    </div>
  );
}