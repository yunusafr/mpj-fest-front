import { Helmet } from "react-helmet-async";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Award,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useActiveFestival } from "@/features/festival/hooks/useActiveFestival";
import { useSubmissions } from "../hooks/useSubmissions";
import { useEvents } from "../hooks/useEvents";
import { usePaymentHistory } from "@/features/payments/hooks/usePaymentHistory";

import StatCard from "@/components/dashboard/StatCard";

export default function AdminEventDashboardPage() {
  const { data } = useActiveFestival();
  const festival = data?.data;

  const { data: eventData } = useEvents();
  const { data: submissionData } = useSubmissions();
  const { data: paymentData } = usePaymentHistory("all");

  const events = eventData?.data || [];
  const submissions = submissionData?.data || [];
  const payments = paymentData?.data || [];

  // KPI
  const totalEvents = events.length;

  const verifiedSubmissions = submissions.filter(
    (s) => s.status === "verified" || s.status === "accepted",
  ).length;

  const paidPayments = payments.filter(
    (p) => p.status_pembayaran === "settlement",
  ).length;

  const pendingPayments = payments.filter(
    (p) => p.status_pembayaran !== "settlement",
  ).length;

  const totalRevenue = payments.reduce((acc, p) => {
    return acc + Number(p.event?.htm || 0);
  }, 0);

  return (
    <>
      <Helmet>
        <title>Dashboard Admin Event | MPJ Fest</title>
      </Helmet>

      <div className="space-y-8">
        {/* HERO */}
        <div
          className="relative overflow-hidden rounded-[32px] border p-8 md:p-10"
          style={{
            background: "linear-gradient(135deg,#ffffff,#f0fdf4)",
            borderColor: "rgba(6,70,34,.08)",
          }}
        >
          <div
            className="absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(59,130,246,.12)" }}
          />

          <div
            className="absolute left-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "rgba(34,197,94,.10)" }}
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={15} />
              {festival?.nama}
            </span>

            <h1
              className="mt-4 text-5xl font-black"
              style={{ color: "#43A047" }}
            >
              Dashboard Admin
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Kelola peserta, presensi, pembayaran, dan sertifikat event dalam
              satu tempat.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Event Dikelola"
            value={totalEvents}
            icon={LayoutDashboard}
            iconColor="rgba(59,130,246,.12)"
            description={
              <span className="text-sm text-slate-500">
                Total event yang Anda kelola
              </span>
            }
          />

          <StatCard
            title="Submission Diverifikasi"
            value={verifiedSubmissions}
            icon={UserCheck}
            iconColor="rgba(34,197,94,.15)"
            description={
              <span className="text-sm text-slate-500">
                Karya yang sudah divalidasi
              </span>
            }
          />

          <StatCard
            title="Pembayaran Berhasil"
            value={paidPayments}
            icon={CreditCard}
            iconColor="rgba(34,197,94,.15)"
            description={
              <span className="text-sm text-slate-500">
                Sudah lunas (settlement)
              </span>
            }
          />
        </div>

        {/* QUICK ACTION */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ActionCard
            title="Kelola Submission"
            description="Lihat dan kelola karya peserta"
            icon={Users}
            to="/admin-event/submissions"
          />

          <ActionCard
            title="Presensi"
            description="Validasi kehadiran peserta"
            icon={UserCheck}
            to="/admin-event/attendance"
          />

          <ActionCard
            title="Pembayaran"
            description="Verifikasi pembayaran peserta"
            icon={CreditCard}
            to="/admin-event/payments"
          />

          <ActionCard
            title="Sertifikat"
            description="Generate & kelola sertifikat"
            icon={Award}
            to="/admin-event/certificates"
          />
        </div>
      </div>
    </>
  );
}

// FIXED ActionCard
function ActionCard({ title, description, icon: Icon, to }) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-slate-200/70 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Icon size={20} className="text-slate-700" />
        </div>

        <ChevronRight
          size={18}
          className="text-slate-400 transition-transform group-hover:translate-x-1"
        />
      </div>

      <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </Link>
  );
}
