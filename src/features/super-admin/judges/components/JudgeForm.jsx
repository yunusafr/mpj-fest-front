import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

import { useFestivals } from "../../festivals/hooks/useFestivals";

export default function JudgeForm({
  defaultValues = {},
  onSubmit,
  loading,
}) {
  const { data: festivalData } = useFestivals();

  const festivals = festivalData?.data || [];

  const [form, setForm] = useState({
    nama: defaultValues.nama || "",
    email: defaultValues.email || "",
    password: "",
    festival_id: defaultValues.festival_id
      ? String(defaultValues.festival_id)
      : "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="
    rounded-3xl
    border border-slate-200
    bg-white
    p-8
    shadow-sm
  "
>
  <div className="grid gap-6 md:grid-cols-2">
    {/* NAMA */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Nama Juri
      </label>

      <div className="relative">
        <User
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama juri"
          required
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

    {/* EMAIL */}
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Email
      </label>

      <div className="relative">
        <Mail
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="juri@email.com"
          required
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
        name="festival_id"
        value={form.festival_id}
        onChange={handleChange}
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
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Password
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
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

  <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
    <button
      type="submit"
      disabled={loading}
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
      {loading ? "Menyimpan..." : "Simpan"}
    </button>
  </div>
</form>
  );
}