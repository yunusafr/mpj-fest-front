import { useParams, useNavigate } from "react-router-dom";

import FestivalForm from "../components/FestivalForm";

import { useFestival } from "../hooks/useFestival";
import { useUpdateFestival } from "../hooks/useUpdateFestival";

export default function EditFestivalPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFestival(id);

  const mutation = useUpdateFestival();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 animate-pulse">
          <div className="h-8 w-52 bg-slate-200 rounded-lg mb-4" />
          <div className="h-4 w-80 bg-slate-100 rounded mb-8" />

          <div className="space-y-4">
            <div className="h-12 bg-slate-100 rounded-xl" />
            <div className="h-12 bg-slate-100 rounded-xl" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-slate-100 rounded-xl" />
              <div className="h-12 bg-slate-100 rounded-xl" />
            </div>

            <div className="h-40 bg-slate-100 rounded-xl" />

            <div className="h-12 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const festival = data?.data;

  const handleSubmit = (values) => {
    mutation.mutate(
      {
        id,
        payload: values,
      },
      {
        onSuccess: () => {
          navigate("/super-admin/festivals");
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

        {/* HEADER */}
        <div className="p-8 border-b border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Festival
          </h1>

          <p className="mt-2 text-slate-500 leading-relaxed">
            Perbarui informasi festival dan pastikan seluruh data tetap
            akurat sebelum dipublikasikan kepada peserta.
          </p>
        </div>

        {/* FORM */}
        <div className="p-8">
          <FestivalForm
  mode="edit"
  defaultValues={festival}
  onSubmit={handleSubmit}
  loading={mutation.isPending}
/>
        </div>
      </div>
    </div>
  );
}