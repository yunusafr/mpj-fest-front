import {
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Percent,
  Sparkles
} from "lucide-react";

import api from "@/lib/axios";

import { toast } from "sonner";

import {
  useJudgeSubmissionDetail,
} from "../hooks/useJudgeSubmissions";

export default function JudgeAssessmentPage() {
  const { submissionId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
    refetch,
  } =
    useJudgeSubmissionDetail(
      submissionId
    );

  const submission =
    data?.data;

  const [catatan, setCatatan] =
    useState(
      submission?.catatan || ""
    );

  const [criteria, setCriteria] =
    useState(
      submission?.criteria || []
    );

  const totalNilai =
    useMemo(() => {
      return criteria
        .reduce(
          (sum, item) =>
            sum +
            ((Number(
              item.nilai
            ) || 0) *
              item.bobot) /
              100,
          0
        )
        .toFixed(2);
    }, [criteria]);

  const handleSave =
    async () => {
      try {
        await api.post(
          "/judge/assessment",
          {
            submission_id:
              submission.id,
            catatan,
            criteria:
              criteria.map(
                (
                  item
                ) => ({
                  criterion_id:
                    item.id,
                  nilai:
                    Number(
                      item.nilai
                    ),
                })
              ),
          }
        );

        toast.success(
          "Penilaian berhasil disimpan"
        );

        refetch();
      } catch {
        toast.error(
          "Gagal menyimpan"
        );
      }
    };

  if (
    isLoading ||
    !submission
  ) {
    return null;
  }

  return (
    <div className="space-y-8">

      <button
        onClick={() =>
          navigate(-1)
        }
        className="
          inline-flex
          items-center
          gap-2
          text-slate-600
        "
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3 py-1
              text-xs
              font-semibold
              text-emerald-700
              ring-1
              ring-emerald-200
            "
          >
            <Sparkles size={12} />
           Assessment Form
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            {
            submission.judul_karya
          }
          </h1>

          <p className="mt-2 text-slate-500">
            {
            submission.participant
          }
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="space-y-5">
          {criteria.map(
            (item) => (
              <div
                key={item.id}
              >
                <label className="mb-2 block text-sm font-medium">
                  {item.nama}
                  <span className="ml-2 text-slate-400">
                    (
                    {
                      item.bobot
                    }
                    %)
                  </span>
                </label>

                <input
                  type="number"
                  value={
                    item.nilai ??
                    ""
                  }
                  onChange={(
                    e
                  ) =>
                    setCriteria(
                      (
                        prev
                      ) =>
                        prev.map(
                          (
                            c
                          ) =>
                            c.id ===
                            item.id
                              ? {
                                  ...c,
                                  nilai:
                                    e
                                      .target
                                      .value,
                                }
                              : c
                        )
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                  "
                />
              </div>
            )
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="text-sm text-slate-500">
            Total Nilai
          </div>

          <div className="text-3xl font-bold text-emerald-600">
            {totalNilai}
          </div>
        </div>

        <textarea
          rows={4}
          value={catatan}
          onChange={(e) =>
            setCatatan(
              e.target.value
            )
          }
          placeholder="Catatan"
          className="
            mt-6
            w-full
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={
              handleSave
            }
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
              text-white
              font-semibold
            "
          >
            <Save size={18} />
            Simpan Penilaian
          </button>
        </div>
      </div>
    </div>
  );
}