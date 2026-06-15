import { useState } from "react";

import {
  FileText,
  User,
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  Star,
} from "lucide-react";

export default function SubmissionCard({
  submission,
  onSubmit,
}) {
  const [nilai, setNilai] =
    useState(
      submission.nilai ?? ""
    );

  const [catatan, setCatatan] =
    useState(
      submission.catatan ?? ""
    );

  const isReadOnly =
    submission.sudah_dinilai;

  const handleSubmit = () => {
    if (!nilai) return;

    onSubmit({
      submission_id:
        submission.id,
      nilai: Number(nilai),
      catatan,
    });
  };

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileText size={16} />

            {submission.event}
          </div>

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {submission.judul_karya}
          </h2>
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

      {/* DESCRIPTION */}

      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {submission.deskripsi_karya}
      </p>

      {/* PARTICIPANT */}

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <User size={15} />

        {submission.participant}
      </div>

      {/* FILE */}

      <div className="mt-4 flex flex-wrap gap-2">
        {submission.file_url && (
          <a
            href={
              submission.file_url
            }
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
            <ExternalLink
              size={15}
            />
            File
          </a>
        )}

        {submission.link_drive && (
          <a
            href={
              submission.link_drive
            }
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
            <FolderOpen
              size={15}
            />
            Drive
          </a>
        )}
      </div>

      {/* FORM */}

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nilai
          </label>

          <input
            type="number"
            value={nilai}
            disabled={isReadOnly}
            onChange={(e) =>
              setNilai(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4 py-3
              outline-none
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
              disabled:bg-slate-50
            "
            placeholder="Masukkan nilai"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Catatan
          </label>

          <textarea
            rows={4}
            value={catatan}
            disabled={isReadOnly}
            onChange={(e) =>
              setCatatan(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4 py-3
              outline-none
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
              disabled:bg-slate-50
            "
            placeholder="Berikan catatan untuk peserta"
          />
        </div>
      </div>

      {/* FOOTER */}

      {!isReadOnly ? (
        <button
          onClick={handleSubmit}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-emerald-600
            py-3
            font-semibold
            text-white
            transition
            hover:from-emerald-600
            hover:to-emerald-700
          "
        >
          <Star size={16} />
          Simpan Penilaian
        </button>
      ) : (
        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-50
            py-3
            text-sm
            font-semibold
            text-emerald-700
          "
        >
          <CheckCircle2 size={16} />
          Penilaian Sudah Disimpan
        </div>
      )}
    </div>
  );
}