import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Sparkles, Save, Link, Calendar, Vote } from "lucide-react";

import { useVoting } from "../hooks/useVoting";
import { useSetupVoting } from "../hooks/useSetupVoting";

export default function VotingSetupPage() {
  const { eventId } = useParams();

  const { data } = useVoting(eventId);

  const mutation = useSetupVoting();

  const [form, setForm] = useState({
    waktu_buka: "",
    waktu_tutup: "",
    batas_voting: 1,
  });

  useEffect(() => {
    if (data?.data) {
      setForm({
        waktu_buka: data.data.waktu_buka?.slice(0, 16) || "",

        waktu_tutup: data.data.waktu_tutup?.slice(0, 16) || "",

        batas_voting: data.data.batas_voting || 1,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      eventId,
      payload: form,
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Voting Configuration
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Pengaturan Voting
          </h1>

          <p className="mt-2 text-slate-500">
            Atur periode voting dan jumlah suara yang dapat diberikan peserta.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6"
      >
        <div className="space-y-5">
          {/* Waktu Buka */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar size={16} />
              Waktu Buka
            </label>

            <input
              type="datetime-local"
              value={form.waktu_buka}
              onChange={(e) =>
                setForm({
                  ...form,
                  waktu_buka: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          {/* Waktu Tutup */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar size={16} />
              Waktu Tutup
            </label>

            <input
              type="datetime-local"
              value={form.waktu_tutup}
              onChange={(e) =>
                setForm({
                  ...form,
                  waktu_tutup: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          {/* Batas Voting */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Vote size={16} />
              Batas Voting
            </label>

            <input
              type="number"
              min="1"
              value={form.batas_voting}
              onChange={(e) =>
                setForm({
                  ...form,
                  batas_voting: Number(e.target.value),
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-600">
                Maksimal suara per peserta
              </span>

              <span className="font-bold text-emerald-600">
                {form.batas_voting}
              </span>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
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
              <Save size={18} />

              {mutation.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </div>
        </div>
      </form>

      {/* Public Link */}
      {mutation.data?.data?.public_link && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2 text-emerald-600 font-semibold">
            <Link size={18} />
            Public Voting Link
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <a
              href={mutation.data.data.public_link}
              target="_blank"
              rel="noreferrer"
              className="break-all text-blue-600 hover:underline"
            >
              {mutation.data.data.public_link}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
