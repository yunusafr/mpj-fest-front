import { useNavigate } from "react-router-dom";
import FestivalForm from "../components/FestivalForm";
import { useCreateFestival } from "../hooks/useCreateFestival";

export default function CreateFestivalPage() {
  const navigate = useNavigate();
  const mutation = useCreateFestival();

  const handleSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        navigate("/super-admin/festivals");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden">
        
        {/* HEADER */}
        <div className="p-8 border-b border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900">
            Tambah Festival
          </h1>

          <p className="mt-2 text-slate-500 leading-relaxed">
            Buat festival baru dan atur informasi dasar sebelum dipublikasikan
            kepada peserta.
          </p>
        </div>

        {/* FORM */}
        <div className="p-8">
          <FestivalForm
  mode="create"
  onSubmit={handleSubmit}
  loading={mutation.isPending}
/>
        </div>
      </div>
    </div>
  );
}