import { useNavigate } from "react-router-dom";

import JudgeForm from "../components/JudgeForm";

import { useCreateJudge } from "../hooks/useCreateJudge";

import { toast } from "sonner";

import {
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CreateJudgePage() {

  const navigate =
    useNavigate();

  const mutation =
    useCreateJudge();

  const handleSubmit =
    (form) => {

      mutation.mutate(
        form,
        {
          onSuccess: () => {

            toast.success(
              "Juri berhasil dibuat"
            );

            navigate(
              "/super-admin/judges"
            );
          },

          onError: (
            error
          ) => {

            toast.error(
              error.response?.data
                ?.message ||
              "Gagal membuat juri"
            );
          },
        }
      );
    };

return (
  <div className="mx-auto max-w-3xl space-y-8">
    {/* HEADER */}
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-200">
            <Sparkles size={12} />
            Judge
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Tambah Juri
          </h1>

          <p className="mt-2 text-slate-500">
            Buat akun juri baru untuk penilaian festival
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-50">
          <ShieldCheck
            size={24}
            className="text-purple-600"
          />
        </div>
      </div>
    </div>

    <JudgeForm
      onSubmit={handleSubmit}
      loading={mutation.isPending}
      submitLabel="Simpan"
      onCancel={() =>
        navigate("/super-admin/judges")
      }
    />
  </div>
);
}