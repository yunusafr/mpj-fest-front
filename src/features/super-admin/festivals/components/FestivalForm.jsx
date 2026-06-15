import { useState } from "react";
import {
CalendarDays,
MapPin,
FileText,
Sparkles,
} from "lucide-react";

export default function FestivalForm({
mode = "create",
defaultValues = {},
onSubmit,
loading,
}) {
const [form, setForm] = useState({
nama: defaultValues.nama || "",
lokasi: defaultValues.lokasi || "",
tanggal_mulai: defaultValues.tanggal_mulai || "",
tanggal_selesai: defaultValues.tanggal_selesai || "",
deskripsi: defaultValues.deskripsi || "",
status: defaultValues.status || "draft",
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

const isEdit = mode === "edit";

const statusConfig = {
draft: {
text: "Draft",
className:
"bg-slate-50 text-slate-700 border-slate-200",
},
published: {
text: "Published",
className:
"bg-emerald-50 text-emerald-700 border-emerald-200",
},
completed: {
text: "Completed",
className:
"bg-blue-50 text-blue-700 border-blue-200",
},
};

return ( <form
   onSubmit={handleSubmit}
   className="space-y-8"
 >
{/* HEADER */} <div className="space-y-3"> <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"> <Sparkles size={16} />


      {isEdit
        ? "Edit Festival"
        : "Festival Baru"}
    </div>

    <h2 className="text-2xl font-bold text-slate-900">
      {isEdit
        ? "Perbarui Informasi Festival"
        : "Informasi Festival"}
    </h2>

    <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
      {isEdit
        ? "Perubahan yang disimpan akan langsung memperbarui data festival yang sudah ada."
        : "Lengkapi seluruh informasi festival dengan jelas agar mudah dipahami peserta dan panitia."}
    </p>
  </div>

  {/* NAMA */}
  <div>
    <label className="text-sm font-semibold text-slate-700">
      Nama Festival
    </label>

    <input
      type="text"
      name="nama"
      value={form.nama}
      onChange={handleChange}
      placeholder="Contoh: MPJ Fest 2027"
      className="
        mt-2
        h-12
        w-full
        rounded-xl
        border
        border-slate-200
        px-4
        transition
        focus:border-emerald-500
        focus:ring-4
        focus:ring-emerald-100
      "
    />
  </div>

  {/* LOKASI */}
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <MapPin size={16} />
      Lokasi Festival
    </label>

    <input
      type="text"
      name="lokasi"
      value={form.lokasi}
      onChange={handleChange}
      placeholder="PP Bustanul Muta'alimin Kota Blitar"
      className="
        mt-2
        h-12
        w-full
        rounded-xl
        border
        border-slate-200
        px-4
        transition
        focus:border-emerald-500
        focus:ring-4
        focus:ring-emerald-100
      "
    />
  </div>

  {/* TANGGAL */}
  <div className="grid gap-5 md:grid-cols-2">
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <CalendarDays size={16} />
        Tanggal Mulai
      </label>

      <input
        type="date"
        name="tanggal_mulai"
        value={form.tanggal_mulai}
        onChange={handleChange}
        className="
          mt-2
          h-12
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          transition
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>

    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <CalendarDays size={16} />
        Tanggal Selesai
      </label>

      <input
        type="date"
        name="tanggal_selesai"
        value={form.tanggal_selesai}
        onChange={handleChange}
        className="
          mt-2
          h-12
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          transition
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>
  </div>

  {/* DESKRIPSI */}
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <FileText size={16} />
      Deskripsi Festival
    </label>

    <textarea
      rows={6}
      name="deskripsi"
      value={form.deskripsi}
      onChange={handleChange}
      placeholder="Jelaskan konsep, tujuan, tema, dan gambaran festival..."
      className="
        mt-2
        w-full
        resize-none
        rounded-xl
        border
        border-slate-200
        p-4
        transition
        focus:border-emerald-500
        focus:ring-4
        focus:ring-emerald-100
      "
    />
  </div>


  {/* FOOTER */}
  <div className="border-t border-slate-100 pt-6">
    <button
      type="submit"
      disabled={loading}
      className="
        h-12
        w-full
        rounded-xl
        bg-gradient-to-r
        from-emerald-600
        to-green-600
        font-semibold
        text-white
        shadow-md
        transition
        hover:scale-[1.01]
        hover:shadow-lg
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading
        ? "Menyimpan..."
        : isEdit
        ? "Simpan Perubahan"
        : "Simpan Festival"}
    </button>

    <p className="mt-3 text-center text-xs text-slate-400">
      {isEdit
        ? "Pastikan seluruh perubahan sudah sesuai sebelum disimpan."
        : "Festival yang dibuat masih dapat diperbarui sebelum dipublikasikan."}
    </p>
  </div>
</form>


);
}
