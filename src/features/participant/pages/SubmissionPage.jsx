import { useParams } from "react-router-dom";
import { useSubmission } from "../hooks/useSubmission";
import { useUploadSubmission } from "../hooks/useUploadSubmission";

import InfoCard from "../components/submission/InfoCard";
import StatusBadge from "../components/submission/StatusBadge";
import SubmissionForm from "../components/submission/SubmissionForm";

export default function SubmissionPage() {
  const { registrationId } = useParams();

  const { data, isLoading, isError, refetch } =
    useSubmission(registrationId);

  const uploadMutation = useUploadSubmission();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-slate-500">
        Loading submission...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-red-500">
        Gagal memuat data
      </div>
    );
  }

  const registration = data?.data?.registration;
  const submission = data?.data?.submission;

  const festivalStatus = registration?.event?.festival?.status;
  const isFestivalActive = festivalStatus === "published";

  const status = submission?.status;
  const isPending = status === "pending";
  const isRejected = status === "rejected";
  const isVerified = status === "verified";

  const statusConfig = {
    pending: {
      text: "Menunggu Verifikasi",
      className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    },
    verified: {
      text: "Terverifikasi",
      className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    },
    rejected: {
      text: "Ditolak",
      className: "bg-red-50 text-red-700 ring-1 ring-red-200",
    },
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Detail Karya
          </h1>

          <h2 className="mt-4 text-lg font-semibold">
            {submission?.judul_karya || "Belum ada karya"}
          </h2>

          <p className="text-slate-600">
            {submission?.deskripsi_karya || "Belum ada deskripsi"}
          </p>
        </div>

        <div className="p-6 md:p-8">

          {/* INFO EVENT */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <InfoCard
              label="Event"
              value={registration?.event?.nama}
            />
            <InfoCard
              label="Kategori"
              value={registration?.event?.kategori}
            />
          </div>

          {/* SUBMISSION EXIST */}
          {submission && (
            <>
              <StatusBadge
                statusConfig={statusConfig}
                status={status}
              />

              {(isPending || isRejected) && isFestivalActive && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <SubmissionForm
                    registrationId={registrationId}
                    uploadMutation={uploadMutation}
                    refetch={refetch}
                    initialData={submission}
                    isRevisi={true}
                  />
                </div>
              )}

              {isVerified && (
                <div className="mt-6 text-emerald-600 text-sm">
                  Karya sudah terverifikasi dan terkunci.
                </div>
              )}
            </>
          )}

          {/* NO SUBMISSION */}
          {!submission && isFestivalActive && (
            <SubmissionForm
              registrationId={registrationId}
              uploadMutation={uploadMutation}
              refetch={refetch}
              isRevisi={false}
            />
          )}

          {/* FESTIVAL CLOSED */}
          {!isFestivalActive && (
            <div className="text-center text-sm text-slate-500 mt-6">
              Pengumpulan karya sudah ditutup.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}