import {
  FileText,
  User,
  ExternalLink,
  FolderOpen,
  CheckCircle2,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function SubmissionCard({
  submission,
}) {
  const navigate =
    useNavigate();

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileText size={15} />
            {submission.event}
          </div>

          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {submission.judul_karya}
          </h3>
        </div>

        {submission.sudah_dinilai ? (
          <span
            className="
              rounded-full
              bg-emerald-50
              px-3 py-1
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            Dinilai
          </span>
        ) : (
          <span
            className="
              rounded-full
              bg-amber-50
              px-3 py-1
              text-xs
              font-semibold
              text-amber-700
            "
          >
            Pending
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-500 line-clamp-2">
        {submission.deskripsi_karya}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <User size={15} />
        {submission.participant}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {submission.file_url && (
          <a
            href={submission.file_url}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-3 py-2
              text-sm
              hover:bg-slate-50
            "
          >
            <ExternalLink size={14} />
            File
          </a>
        )}

        {submission.link_drive && (
          <a
            href={submission.link_drive}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-3 py-2
              text-sm
              hover:bg-slate-50
            "
          >
            <FolderOpen size={14} />
            Drive
          </a>
        )}
      </div>

      <button
        onClick={() =>
          navigate(
            `/judge/submission/${submission.id}`
          )
        }
        className="
          mt-5
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-emerald-600
          px-4
          py-3
          font-semibold
          text-white
          hover:from-emerald-600
          hover:to-emerald-700
        "
      >
        {submission.sudah_dinilai ? (
          <>
            <CheckCircle2 size={16} />
            Edit Penilaian
          </>
        ) : (
          <>
            <Clock3 size={16} />
            Nilai Karya
          </>
        )}

        <ArrowRight size={16} />
      </button>
    </div>
  );
}