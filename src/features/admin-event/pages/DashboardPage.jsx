import { Helmet } from "react-helmet-async";

import {
  useActiveFestival,
} from "@/features/festival/hooks/useActiveFestival";
import { Sparkles } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Award,
  ChevronRight,
} from "lucide-react";

export default function AdminEventDashboardPage() {

const { data } =
  useActiveFestival();

const festival =
  data?.data;

  return (
    <>
      <Helmet>
        <title>
          Dashboard Admin Event |
          MPJ Fest
        </title>
      </Helmet>

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
    borderColor: "rgba(6,70,34,.08)",
          }}
        >
          <div
            className="
              absolute
              right-0
              top-0
              h-56
              w-56
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "rgba(59,130,246,.12)",
            }}
          />

          <div
            className="
              absolute
              left-0
              bottom-0
              h-40
              w-40
              rounded-full
              blur-3xl
            "
            style={{
              background:
                "rgba(34,197,94,.10)",
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
                text-slate-900
              "
              style={{
        color: "#43A047",
      }}
            >
              Dashboard Admin
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-slate-600
              "
            >
              Kelola peserta,
              presensi, pembayaran,
              dan sertifikat event
              dalam satu tempat.
            </p>
          </div>
        </div>


        {/* QUICK ACTION */}
        <div
          className="
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <ActionCard
            title="Kelola Peserta"
            description="Lihat dan kelola data peserta"
            icon={Users}
          />

          <ActionCard
            title="Presensi"
            description="Validasi kehadiran peserta"
            icon={UserCheck}
          />

          <ActionCard
            title="Pembayaran"
            description="Verifikasi pembayaran"
            icon={CreditCard}
          />

          <ActionCard
            title="Sertifikat"
            description="Generate sertifikat peserta"
            icon={Award}
          />
        </div>

        {/* BOTTOM SECTION */}
        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >
       
        </div>
      </div>
    </>
  );
}

function ActionCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <button
      className="
        group
        rounded-3xl
        border
        border-slate-200/70
        bg-white
        p-5
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
          "
        >
          <Icon
            size={20}
            className="text-slate-700"
          />
        </div>

        <ChevronRight
          size={18}
          className="
            text-slate-400
            transition-transform
            group-hover:translate-x-1
          "
        />
      </div>

      <h3
        className="
          mt-5
          font-bold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        {description}
      </p>
    </button>
  );
}

function ActivityItem({
  title,
  time,
}) {
  return (
    <div className="flex gap-4">
      <div
        className="
          mt-2
          h-2.5
          w-2.5
          rounded-full
        "
        style={{
          backgroundColor:
            "#2563eb",
        }}
      />

      <div>
        <p
          className="
            font-medium
            text-slate-800
          "
        >
          {title}
        </p>

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          {time}
        </p>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}) {
  return (
    <div>
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-3xl
          font-black
          text-slate-900
        "
      >
        {value}
      </p>
    </div>
  );
}