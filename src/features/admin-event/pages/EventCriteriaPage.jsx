import {
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";

import {
  Plus,
  Trash2,
  Save,
  Percent,
  Sparkles,
  ClipboardList,
} from "lucide-react";

import { toast } from "sonner";

import { useEventCriteria } from "../hooks/useEventCriteria";
import { saveEventCriteria } from "../api/eventCriteriaApi";

export default function EventCriteriaPage() {
  const { eventId } = useParams();

  const {
    data,
    isLoading,
    refetch,
  } = useEventCriteria(eventId);

  const [criteria, setCriteria] =
    useState([]);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (data?.data) {
      setCriteria(data.data);
    }
  }, [data]);

  const addRow = () => {
    setCriteria([
      ...criteria,
      {
        nama: "",
        bobot: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    setCriteria(
      criteria.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateField = (
    index,
    field,
    value
  ) => {
    setCriteria(
      criteria.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "bobot"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  };

  const totalBobot =
    criteria.reduce(
      (sum, item) =>
        sum +
        Number(
          item.bobot || 0
        ),
      0
    );

  const handleSave =
    async () => {
      if (
        criteria.some(
          (item) => !item.nama
        )
      ) {
        toast.error(
          "Nama kriteria wajib diisi"
        );
        return;
      }

      if (
        totalBobot !== 100
      ) {
        toast.error(
          "Total bobot harus 100%"
        );
        return;
      }

      try {
        setSaving(true);

        await saveEventCriteria(
          eventId,
          {
            criteria,
          }
        );

        toast.success(
          "Kriteria berhasil disimpan"
        );

        refetch();
      } catch (err) {
        toast.error(
          err.response?.data
            ?.message ??
            "Gagal menyimpan"
        );
      } finally {
        setSaving(false);
      }
    };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-500" />

          <p className="text-sm text-slate-500">
            Loading criteria...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <Sparkles size={12} />
            Event Assessment
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Kriteria Penilaian
          </h1>

          <p className="mt-2 text-slate-500">
            Atur komponen penilaian dan
            bobot setiap kriteria
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6">

        {criteria.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <ClipboardList
              size={40}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Belum ada kriteria
            </h3>

            <p className="mt-1 text-slate-500">
              Tambahkan kriteria untuk
              mulai melakukan penilaian
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {criteria.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    transition-all
                    hover:shadow-sm
                  "
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_200px_60px]">
                    <input
                      type="text"
                      value={
                        item.nama
                      }
                      onChange={(e) =>
                        updateField(
                          index,
                          "nama",
                          e.target
                            .value
                        )
                      }
                      placeholder="Nama Kriteria"
                      className="
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                      "
                    />

                    <div className="relative">
                      <input
                        type="number"
                        value={
                          item.bobot
                        }
                        onChange={(e) =>
                          updateField(
                            index,
                            "bobot",
                            e.target
                              .value
                          )
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          px-4
                          py-3
                          pr-10
                          outline-none
                          focus:border-emerald-500
                        "
                      />

                      <Percent
                        size={16}
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />
                    </div>

                    <button
                      onClick={() =>
                        removeRow(
                          index
                        )
                      }
                      className="
                        rounded-xl
                        border
                        border-red-100
                        text-red-500
                        transition
                        hover:bg-red-50
                      "
                    >
                      <Trash2
                        size={18}
                        className="mx-auto"
                      />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={addRow}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            transition
            hover:bg-slate-50
          "
        >
          <Plus size={18} />
          Tambah Kriteria
        </button>

        {/* Summary */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-600">
              Total Bobot
            </span>

            <span
              className={
                totalBobot === 100
                  ? "font-bold text-emerald-600"
                  : "font-bold text-red-500"
              }
            >
              {totalBobot}%
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={
              handleSave
            }
            disabled={
              saving
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

            {saving
              ? "Menyimpan..."
              : "Simpan Kriteria"}
          </button>
        </div>
      </div>
    </div>
  );
}