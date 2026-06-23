import { Link } from "react-router-dom";
import {
  Sparkles,
  Medal,
  Ticket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useAdminCertificates } from "../hooks/useAdminCertificates";

export default function CertificatesPage() {
  const { data, loading } = useAdminCertificates();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500" />
          <p className="text-sm text-slate-500">Loading certificates...</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Certificate Management
            </span>

            <h1 className="mt-4 text-3xl font-bold">Sertifikat Event</h1>

            <p className="mt-2 text-slate-500">
              Kelola sertifikat untuk seluruh event Anda.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Ticket size={40} className="mx-auto text-slate-400" />

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Belum ada sertifikat
          </h3>

          <p className="mt-1 text-slate-500">
            Data sertifikat akan muncul di sini
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Certificate Management
          </span>

          <h1 className="mt-4 text-3xl font-bold">Sertifikat Event</h1>

          <p className="mt-2 text-slate-500">
            Kelola sertifikat untuk seluruh event Anda.
          </p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.event_id}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
            "
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Left */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-50
                    "
                  >
                    <Medal size={22} className="text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.event_name}
                    </h3>

                    <p className="text-sm text-slate-500">Event Certificate</p>
                  </div>
                </div>

                {item.nomor_sertifikat && (
                  <div className="text-sm text-slate-500">
                    Nomor Sertifikat:
                    <span className="ml-2 font-medium text-slate-700">
                      {item.nomor_sertifikat}
                    </span>
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Link
                  to={`/admin-event/certificates/${item.event_id}`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:shadow-md
                    hover:from-emerald-600
                    hover:to-emerald-700
                  "
                >
                  Lihat Sertifikat
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
