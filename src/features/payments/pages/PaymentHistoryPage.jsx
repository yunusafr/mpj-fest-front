import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Receipt,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { usePaymentHistory } from "../hooks/usePaymentHistory";
import { usePublicFestivals } from "../hooks/usePublicFestivals";
import StatusBadge from "../components/StatusBadge";

import { useAuthStore } from "@/app/store/authStore";
import { getRoleBasePath } from "@/utils/rolePath";

export default function PaymentHistoryPage() {
  const user = useAuthStore((state) => state.user);
  const basePath = getRoleBasePath(user?.role);

  const { data: festivalData } = usePublicFestivals();

  const [selectedFestival, setSelectedFestival] = useState(null);
  const [page, setPage] = useState(1);

  const festivals = festivalData?.data || [];

  const publishedFestival = festivals.find(
    (festival) => festival.status === "published"
  );

  useEffect(() => {
    if (selectedFestival !== null || festivals.length === 0) return;

    setSelectedFestival(
      publishedFestival
        ? String(publishedFestival.id)
        : "all"
    );
  }, [
    selectedFestival,
    festivals,
    publishedFestival,
  ]);

  const { data, isLoading } =
    usePaymentHistory(selectedFestival);

  const payments = data?.data || [];

  if (selectedFestival === null || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  const perPage = 10;

  const totalPages =
    Math.ceil(payments.length / perPage) || 1;

  const paginatedPayments = payments.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"> 

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Pembayaran
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Riwayat Pembayaran
            </h1>

            <p className="mt-2 text-slate-500">
              Daftar seluruh transaksi pembayaran event Anda
            </p>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex justify-end">
          <select
            value={selectedFestival}
            onChange={(e) => {
              setSelectedFestival(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="all">
              Semua Festival
            </option>

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

      {/* EMPTY */}
      {payments.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <Receipt
            size={48}
            className="mx-auto mb-4 text-slate-300"
          />

          <h3 className="font-semibold text-slate-800">
            Belum Ada Transaksi
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Riwayat pembayaran akan muncul di sini.
          </p>
        </div>
      )}

      {/* LIST */}
      {paginatedPayments.map((payment) => (
        <div
          key={payment.id}
          className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {payment.event?.nama}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {payment.order_id}
              </p>
            </div>

            <StatusBadge
              status={payment.status_pembayaran}
            />
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <Link
              to={`${basePath}/payments/${payment.order_id}?festival=${selectedFestival}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 font-medium text-emerald-700 transition hover:bg-emerald-100"
            >
              <Receipt size={16} />
              Lihat Invoice
            </Link>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      {payments.length > 0 &&
        totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`h-10 w-10 rounded-2xl text-sm font-medium ${
                  page === num
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
    </div>
  );
}