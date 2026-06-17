import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";

import { useJudgeSubmissions } from "../hooks/useJudgeSubmissions";
import SubmissionCard from "../components/SubmissionCard";
import api from "@/lib/axios";

export default function JudgeSubmissionsPage() {
  const { data, isLoading, refetch } =
    useJudgeSubmissions();

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("all");

  const submissions =
    data?.data || [];

  const filteredSubmissions =
    useMemo(() => {
      return submissions.filter((item) => {
        const matchSearch =
          item.judul_karya
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.participant
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.event
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchStatus =
          filterStatus === "all"
            ? true
            : filterStatus === "done"
            ? item.sudah_dinilai
            : !item.sudah_dinilai;

        return (
          matchSearch &&
          matchStatus
        );
      });
    }, [
      submissions,
      search,
      filterStatus,
    ]);

  const submitAssessment =
    async (payload) => {
      await api.post(
        "/judge/assessment",
        payload
      );

      refetch();
    };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />

          <p className="text-sm text-slate-500">
            Loading submissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}

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
            Judge Dashboard
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Penilaian Karya
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola dan nilai seluruh
            karya peserta yang masuk
          </p>
        </div>
      </div>

      {/* FILTER */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Cari karya, peserta, atau event..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                py-3
                pl-10
                pr-4
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-100
              "
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              outline-none
              focus:border-emerald-500
            "
          >
            <option value="all">
              Semua
            </option>

            <option value="pending">
              Belum Dinilai
            </option>

            <option value="done">
              Sudah Dinilai
            </option>
          </select>
        </div>
      </div>

      {/* EMPTY */}

      {filteredSubmissions.length === 0 ? (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
    <Sparkles
      size={40}
      className="mx-auto text-slate-400"
    />

    <h3 className="mt-4 text-lg font-semibold text-slate-900">
      Tidak ada data
    </h3>

    <p className="mt-1 text-slate-500">
      Belum ada submission yang sesuai filter
    </p>
  </div>
) : (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredSubmissions.map(
            (item) => (
              <SubmissionCard
                key={item.id}
                submission={item}
                onSubmit={
                  submitAssessment
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}