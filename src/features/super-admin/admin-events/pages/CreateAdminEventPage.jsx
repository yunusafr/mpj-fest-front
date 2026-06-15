import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { useCreateAdminEvent } from "../hooks/useCreateAdminEvent";
import { useFestivals } from "../../festivals/hooks/useFestivals";


export default function CreateAdminEventPage() {
  const navigate = useNavigate();
  const mutation = useCreateAdminEvent();

  const { data: festivalData } = useFestivals();
  
    const festivals = festivalData?.data || [];

const [form, setForm] = useState({
  nama: "",
  email: "",
  password: "",
  password_confirmation: "",
  festival_id: "",
});

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

const submit = async (e) => {
  e.preventDefault();

  try {
    await mutation.mutateAsync(form);
    navigate("/super-admin/admin-events");
  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* HEADER */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
              <Sparkles size={12} />
              Admin Event
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Tambah Admin Event
            </h1>

            <p className="mt-2 text-slate-500">
              Buat akun admin untuk mengelola event festival
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50">
            <ShieldCheck size={24} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
  onSubmit={submit}
  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
>
  <div className="grid gap-6 md:grid-cols-2">
    {/* NAME */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Nama Lengkap
      </label>

      <div className="relative">
        <User
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={form.nama}
          onChange={(e) =>
            handleChange("nama", e.target.value)
          }
          placeholder="Masukkan nama admin"
          className="
            w-full
            rounded-2xl
            border border-slate-200
            bg-white
            py-3 pl-12 pr-4
            text-slate-900
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>

    {/* EMAIL */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Email
      </label>

      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          placeholder="admin@email.com"
          className="
            w-full
            rounded-2xl
            border border-slate-200
            bg-white
            py-3 pl-12 pr-4
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>

    {/* FESTIVAL */}
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Festival
      </label>

      <select
        value={form.festival_id}
        onChange={(e) =>
          handleChange("festival_id", e.target.value)
        }
        required
        className="
          w-full
          rounded-2xl
          border border-slate-200
          bg-white
          px-4 py-3
          outline-none
          transition-all
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <option value="">Pilih Festival</option>

        {festivals.map((festival) => (
          <option
            key={festival.id}
            value={String(festival.id)}
          >
            {festival.nama}
          </option>
        ))}
      </select>
    </div>

    {/* PASSWORD */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Password
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            handleChange("password", e.target.value)
          }
          placeholder="••••••••"
          className="
            w-full
            rounded-2xl
            border border-slate-200
            bg-white
            py-3 pl-12 pr-4
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>

    {/* CONFIRM PASSWORD */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Konfirmasi Password
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="password"
          value={form.password_confirmation}
          onChange={(e) =>
            handleChange(
              "password_confirmation",
              e.target.value
            )
          }
          placeholder="••••••••"
          className="
            w-full
            rounded-2xl
            border border-slate-200
            bg-white
            py-3 pl-12 pr-4
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>
    </div>
  </div>

  {/* FOOTER */}
  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
    <button
      type="button"
      onClick={() =>
        navigate("/super-admin/admin-events")
      }
      className="
        flex items-center gap-2
        rounded-2xl border border-slate-200
        px-5 py-3
        text-slate-700
        transition
        hover:bg-slate-50
      "
    >
      <ArrowLeft size={16} />
      Kembali
    </button>

    <button
      type="submit"
      disabled={mutation.isPending}
      className="
        rounded-2xl
        bg-gradient-to-r
        from-emerald-500
        to-green-600
        px-8 py-3
        font-semibold
        text-white
        shadow-lg
        transition-all
        hover:shadow-xl
        disabled:opacity-60
      "
    >
      {mutation.isPending
        ? "Menyimpan..."
        : "Simpan"}
    </button>
  </div>
</form>
    </div>
  );
}