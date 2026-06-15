import {
  useSearchParams,
  useParams
}
 from "react-router-dom";
import { useSubmission } from "../hooks/useSubmission";
import { useVerifySubmission } from "../hooks/useVerifySubmission";
import { useRejectSubmission } from "../hooks/useRejectSubmission";
import {
  FileText,
  User,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Link,
  ImageOff,
} from "lucide-react";

export default function SubmissionDetailPage() {
const { id } = useParams();

const [searchParams] =
useSearchParams();

const festivalId =
searchParams.get(
  "festival_id"
);

const {
  data,
  isLoading,
} = useSubmission(
  id,
  festivalId
);

  const verifyMutation = useVerifySubmission();
  const rejectMutation = useRejectSubmission();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-10 w-10 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">Loading submission...</p>
        </div>
      </div>
    );
  }

  const submission = data?.data;

  const isImage = submission?.file_url
    ?.toLowerCase()
    ?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  const baseFileUrl = submission?.file_url
    ? `https://api-mpj-fest.ingintau.my.id/${submission.file_url}`
    : null;

  const statusConfig = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-red-50 text-red-700 ring-red-200",
  };

  const statusLabel = submission?.status || "pending";

  const verify = async () => {
    await verifyMutation.mutateAsync(id);
    await refetch();
  };

  const reject = async () => {
    await rejectMutation.mutateAsync(id);
    await refetch();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 ">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex items-start justify-between gap-6">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Submission Review
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Detail Karya Peserta
            </h1>

            <p className="mt-2 text-slate-500 text-sm">
              Review, validasi, dan keputusan final submission
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-4 py-1 rounded-full text-xs font-semibold ring-1 ${statusConfig[statusLabel]}`}
            >
              {statusLabel}
            </span>

            <p className="text-xs text-slate-400">
              Submission ID: {id}
            </p>
          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* USER INFO */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 ">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <User size={16} />
              Informasi Peserta
            </h2>

            <div className="mt-5 grid sm:grid-cols-2 gap-6 text-sm">

              <div>
                <p className="text-slate-400 text-xs">Nama</p>
                <p className="font-semibold text-slate-900">
                  {submission?.registration?.user?.nama}
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-xs">Email</p>
                <p className="font-semibold text-slate-900">
                  {submission?.registration?.user?.email}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-slate-400 text-xs">Event</p>
                <p className="font-semibold text-slate-900">
                  {submission?.registration?.event?.nama}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-slate-400 text-xs">Link Drive</p>

                {submission?.link_drive ? (
                  <a
                    href={submission.link_drive}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline"
                  >
                    <Link size={14} />
                    Buka Google Drive
                  </a>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Tidak tersedia
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* WORK */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6  space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileText size={16} />
              Detail Karya
            </h2>

            <div>
              <p className="text-slate-400 text-xs">Judul</p>
              <p className="font-semibold text-slate-900 text-lg">
                {submission?.judul_karya}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Deskripsi</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                {submission?.deskripsi_karya}
              </p>
            </div>
          </div>

          {/* FILE VIEWER (UPGRADED FEEL) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6  space-y-5">

            <h2 className="text-sm font-semibold text-slate-900">
              Preview Sampul
            </h2>

            {baseFileUrl ? (
              isImage ? (
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    src={baseFileUrl}
                    alt={submission?.judul_karya}
                    className="w-full max-h-[420px] object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <ImageOff size={16} />
                  Preview tidak tersedia untuk file ini
                </div>
              )
            ) : (
              <div className="text-sm text-slate-500">
                Tidak ada file yang diunggah
              </div>
            )}

            {baseFileUrl && (
              <a
                href={baseFileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
              >
                <ExternalLink size={16} />
                Open Full Asset
              </a>
            )}

          </div>

        </div>

        {/* RIGHT ACTION PANEL */}
        <div className="space-y-6">

          <div className="rounded-3xl border border-slate-200 bg-white p-6  space-y-4 sticky top-6">

            <h3 className="font-semibold text-slate-900">
              Decision Panel
            </h3>

            <p className="text-sm text-slate-500">
              Finalisasi status submission
            </p>

            {submission?.status === "pending" ? (
              <div className="space-y-3 pt-2">

                <button
                  onClick={verify}
                  disabled={verifyMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50 transition"
                >
                  <CheckCircle2 size={16} />
                  Approve
                </button>

                <button
                  onClick={reject}
                  disabled={rejectMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 transition"
                >
                  <XCircle size={16} />
                  Reject
                </button>

              </div>
            ) : (
              <div className="text-sm text-slate-500 pt-2">
                Submission sudah diproses dan tidak dapat diubah
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}