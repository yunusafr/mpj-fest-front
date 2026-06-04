import { useAuthStore } from "@/app/store/authStore";

import ParticipantStats from "../components/ParticipantStats";
import QuickAction from "../components/QuickAction";
import {
  useActiveFestival,
} from "@/features/festival/hooks/useActiveFestival";


export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
const { data } =
  useActiveFestival();

const festival =
  data?.data;
  return (
    <div className="space-y-8">

      {/* HEADER (SAMAKAN STYLE SUPER ADMIN) */}
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
        {/* glow */}
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
            background: "rgba(234,179,8,.12)",
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
              text-4xl
              md:text-5xl
              font-black
            "
            style={{
              color: "#43A047",
            }}
          >
            Dashboard Peserta
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
  Selamat datang, {user?.nama}.
  Festival aktif saat ini adalah{" "}
  <strong>{festival?.nama}</strong>.
  Pilih event yang ingin Anda ikuti dan
  pantau seluruh aktivitas pendaftaran
  melalui dashboard ini.
</p>
        </div>
      </div>

      {/* STATS */}
      <ParticipantStats />

      {/* QUICK ACTION */}
      <QuickAction />
    </div>
  );
}