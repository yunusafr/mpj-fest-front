import { useParams } from "react-router-dom";
import { QRCode } from "react-qr-code";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF";

import {
Receipt,
CalendarDays,
MapPin,
Ticket,
Sparkles,
} from "lucide-react";

import { useInvoice } from "../hooks/useInvoice";
import StatusBadge from "../components/StatusBadge";
export default function InvoicePage() {
  const { orderId } = useParams();
  const { data, isLoading } = useInvoice(orderId);

  if (isLoading) {
    return <div className="flex justify-center py-20 text-slate-500">Loading...</div>;
  }

  const invoice = data?.data;

const handleDownload = async () => {
  if (!invoice) return;

  const blob = await pdf(
    <InvoicePDF invoice={invoice} orderId={orderId} />
  ).toBlob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${invoice.invoice_number}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-10 px-4">
      <div className="mx-auto max-w-4xl space-y-10">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl border-slate-200 bg-white/70 backdrop-blur-xl p-8 border">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full  blur-3xl opacity-30" />

          <div className="flex items-start justify-between relative">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <Sparkles size={12} />
                Invoice Page
              </span>

              <h1 className="text-lg font-semibold tracking-widest">
                Invoice Pembayaran
              </h1>

              <p className="mt-2 text-slate-500">
                {invoice.invoice_number}
              </p>
              <button
  onClick={handleDownload}
  className="rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-700"
>
  Download Invoice
</button>
            </div>
          </div>
        </div>

        {/* INVOICE CARD */}
        <div className="overflow-hidden rounded-3xl border bg-white border-slate-200 print:w-[210mm] print:h-[297mm]"
>

          {/* TOP BAR */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-widest">INVOICE</h2>
                <p className="text-white !text-white">{invoice.invoice_number}</p>
              </div>

              <div className="scale-95">
                <StatusBadge status={invoice.status_pembayaran} />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">

            {/* EVENT INFO */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Informasi Event
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                {[
                  {
                    icon: Ticket,
                    label: "Nama Event",
                    value: invoice.item.event_name,
                  },
                  {
                    icon: MapPin,
                    label: "Lokasi",
                    value: invoice.item.location,
                  },
                  {
                    icon: CalendarDays,
                    label: "Order ID",
                    value: orderId,
                  },
                  {
                    icon: Receipt,
                    label: "Invoice",
                    value: invoice.invoice_number,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5"
                  >
                    <div className="flex gap-3">
                      <item.icon className="text-emerald-600" size={20} />

                      <div>
                        <p className="text-xs text-slate-400">{item.label}</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Detail Pembayaran
              </h3>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <div className="flex justify-between p-5 text-slate-600">
                  <span>Tiket Event</span>
                  <span>
                    Rp {Number(invoice.item.price).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-white p-6 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-emerald-700">
                    Rp {Number(invoice.item.price).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* QR */}
            <div className="border-t border-dashed border-slate-200 pt-10 text-center">
              <h3 className="font-semibold text-slate-900">
                QR Ticket Access
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Tunjukkan QR ini saat check-in
              </p>

              <div className="mt-6 inline-flex rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <QRCode
                  size={220}
                  value={invoice.ticket.qr_code_raw}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}