import { useParams } from "react-router-dom";
import { QRCode } from "react-qr-code";
import { Sparkles, Ticket, Check } from "lucide-react";

import { useTicket } from "../hooks/useTicket";

export default function TicketPage() {
  const { registrationId } = useParams();
  const { data, isLoading } = useTicket(registrationId);

  const ticket = data?.data;

const isUsed = ticket?.is_scanned === "1";

const isSettled =
  ticket?.status_pembayaran === "settlement";

  const status = getStatusStyle(ticket?.status_pembayaran);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-sm text-slate-500">
            Memuat tiket...
          </p>
        </div>
      </div>
    );
  }

  if (!isSettled) {
    return (
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-200">
            <Ticket className="text-red-500" />
          </div>

          <p className="font-medium text-slate-700">
            Tiket belum tersedia
          </p>

          <p className="text-sm text-slate-500">
            Pembayaran harus sudah settlement terlebih dahulu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Event Ticket
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Tiket Anda
            </h1>

            <p className="mt-2 text-slate-500">
              Tunjukkan QR Code saat check-in
            </p>
          </div>
        </div>
      </div>

      {/* TICKET LANDSCAPE */}
{/* PREMIUM TICKET */}
<div
  className={`relative overflow-hidden rounded-[32px] border shadow-[0_10x_30px_rgba(0,0,0,0.08)] ${
    isUsed
      ? "border-slate-200 shadow-sm bg-white"
      : "border-slate-200 shadow-sm bg-white"
  }`}
>
  {/* Background Decoration */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-60" />

    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-70" />

    <div className="absolute right-10 bottom-0 text-[140px] font-black text-slate-50 select-none pointer-events-none">
      PASS
    </div>
  </div>

  {/* Ticket Cutouts */}
  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-slate-100" />

  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-slate-100" />

  <div className="relative flex flex-col md:flex-row">

    {/* LEFT */}
    <div className="flex flex-col items-center justify-center p-10 md:w-[340px]">

      <div
        className="
          relative
          rounded-[28px]
          bg-white
          p-6
          shadow-[0_5px_5px_rgba(0,0,0,0.08)]
          ring-1
          ring-slate-200
        "
      >
        <QRCode
          value={ticket?.qr_code_content || ""}
          size={220}
          className={isUsed ? "opacity-25" : ""}
        />

        {isUsed && (
  <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-white/75 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
        <Check size={28} />
      </div>

      <div className="text-center">
        <p className="font-semibold text-slate-900">
          Check-in Complete
        </p>

        <p className="text-xs text-slate-500">
          Ticket has been redeemed
        </p>
      </div>
    </div>
  </div>
)}
      </div>
    </div>

    {/* Divider */}
    <div className="hidden md:flex items-stretch py-8">
      <div
        className="
          w-px
          bg-[repeating-linear-gradient(
          to_bottom,
          #CBD5E1,
          #CBD5E1_8px,
          transparent_8px,
          transparent_16px
          )]
        "
      />
    </div>

    {/* RIGHT */}
    <div className="flex-1 p-8 md:p-10">

      {/* Top */}
      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 backdrop-blur-xl">
            <Sparkles size={12} />
            Verified Ticket
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            {ticket?.nama_acara}
          </h2>

          <p className="mt-2 text-slate-500">
            Tunjukkan QR Code saat check-in event
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Ticket ID #{ticket?.ticket_id}
          </p>

        </div>
      </div>

      {/* Status */}
      <div className="mt-6 flex flex-wrap gap-2">

        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ring-1 ${status.style}`}
        >
          {status.label}
        </span>

        {isUsed && (
          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 ring-1 ring-red-200">
            Sudah Check-in
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 grid gap-3">

        <Info
          label="Peserta"
          value={ticket?.nama_peserta}
        />

        <Info
          label="Order ID"
          value={ticket?.order_id}
        />

        {isUsed && (
          <Info
            label="Check-in"
            value={ticket?.scanned_at}
          />
        )}
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50/80 px-5 py-4 ring-1 ring-slate-100">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="max-w-[60%] break-all text-right text-sm font-semibold text-slate-900">
        {value || "-"}
      </span>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "settlement":
      return {
        label: "Settlement",
        style: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      };

    case "pending":
      return {
        label: "Pending",
        style: "bg-amber-50 text-amber-700 ring-amber-200",
      };

    case "expired":
    case "failed":
    case "cancelled":
      return {
        label: "Failed",
        style: "bg-red-50 text-red-700 ring-red-200",
      };

    default:
      return {
        label: "Unknown",
        style: "bg-slate-50 text-slate-700 ring-slate-200",
      };
  }
}