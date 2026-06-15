import {
useEffect,
useState,
} from "react";

import {
Sparkles,
Trophy,
CalendarDays,
MapPin,
FileText,
Users,
Ticket,
Landmark,
} from "lucide-react";

import { useFestivals }
from "../../festivals/hooks/useFestivals";

export default function EventForm({
mode = "create",
defaultValues = {},
onSubmit,
loading,
}) {
const {
data: festivalsData,
} = useFestivals();

const festivals =
festivalsData?.data || [];

const [form, setForm] =
useState({
festival_id: "",
nama: "",
kategori: "",
jenis: "lomba",
kuota: "",
htm: 0,
waktu_mulai: "",
waktu_selesai: "",
lokasi: "",
deskripsi: "",
permission_peserta:
"aktif",
});

useEffect(() => {
if (
Object.keys(
defaultValues
).length
) {
setForm({
festival_id:
defaultValues.festival_id ||
"",
nama:
defaultValues.nama ||
"",
kategori:
defaultValues.kategori ||
"",
jenis:
defaultValues.jenis ||
"lomba",
kuota:
defaultValues.kuota ||
"",
htm:
defaultValues.htm ||
0,
waktu_mulai:
defaultValues.waktu_mulai ||
"",
waktu_selesai:
defaultValues.waktu_selesai ||
"",
lokasi:
defaultValues.lokasi ||
"",
deskripsi:
defaultValues.deskripsi ||
"",
permission_peserta:
defaultValues.permission_peserta ||
"aktif",
});
}
}, [defaultValues]);

const handleChange = (
e
) => {
setForm((prev) => ({
...prev,
[e.target.name]:
e.target.value,
}));
};

const handleSubmit = (
e
) => {
e.preventDefault();
onSubmit(form);
};

const isEdit =
mode === "edit";

return ( <form
   onSubmit={handleSubmit}
   className="space-y-8"
 > <div> <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"> <Sparkles size={16} />


      {isEdit
        ? "Edit Event"
        : "Event Baru"}
    </div>

    <h2 className="mt-4 text-2xl font-bold text-slate-900">
      Informasi Event
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      Lengkapi seluruh informasi event sebelum dipublikasikan.
    </p>
  </div>

  <div className="grid gap-5 md:grid-cols-2">

    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Landmark size={16} />
        Festival
      </label>

      <select
        name="festival_id"
        value={
          form.festival_id
        }
        onChange={
          handleChange
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="">
          Pilih Festival
        </option>

        {festivals.map(
          (festival) => (
            <option
              key={
                festival.id
              }
              value={
                festival.id
              }
            >
              {festival.nama}
            </option>
          )
        )}
      </select>
    </div>

    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Trophy size={16} />
        Nama Event
      </label>

      <input
        name="nama"
        value={form.nama}
        onChange={
          handleChange
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </div>

  </div>

  <div className="grid gap-5 md:grid-cols-2">

    <input
      name="kategori"
      value={
        form.kategori
      }
      onChange={
        handleChange
      }
      placeholder="Contoh : Fotografi, Sinematografi, Jurnal"
      className="h-12 rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

    <select
      name="jenis"
      value={form.jenis}
      onChange={
        handleChange
      }
      className="h-12 rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    >
      <option value="lomba">
        Lomba
      </option>

      <option value="non_lomba">
        Non Lomba
      </option>
    </select>

  </div>

  <div className="grid gap-5 md:grid-cols-2">

    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Users size={16} />
        Kuota
      </label>

      <input
        type="number"
        name="kuota"
        value={form.kuota}
        onChange={
          handleChange
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </div>

    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Ticket size={16} />
        HTM
      </label>

      <input
        type="number"
        name="htm"
        value={form.htm}
        onChange={
          handleChange
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      />
    </div>

  </div>

  <div className="grid gap-5 md:grid-cols-2">

    <input
      type="datetime-local"
      name="waktu_mulai"
      value={
        form.waktu_mulai
      }
      onChange={
        handleChange
      }
      className="h-12 rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

    <input
      type="datetime-local"
      name="waktu_selesai"
      value={
        form.waktu_selesai
      }
      onChange={
        handleChange
      }
      className="h-12 rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

  </div>

  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <MapPin size={16} />
      Lokasi
    </label>

    <input
      name="lokasi"
      value={form.lokasi}
      onChange={
        handleChange
      }
      className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />
  </div>

  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <FileText size={16} />
      Deskripsi
    </label>

    <textarea
      rows={6}
      name="deskripsi"
      value={
        form.deskripsi
      }
      onChange={
        handleChange
      }
      className="mt-2 w-full rounded-xl border border-slate-200 p-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />
  </div>

  <div>
    <label className="text-sm font-semibold text-slate-700">
      Permission Peserta
    </label>

    <select
      name="permission_peserta"
      value={
        form.permission_peserta
      }
      onChange={
        handleChange
      }
      className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    >
      <option value="aktif">
        Anggota Aktif
      </option>

      <option value="umum">
        Peserta Umum
      </option>
      <option value="semua">
        Semua
      </option>
    </select>
  </div>

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
        hover:shadow-lg
        hover:scale-[1.01]
        disabled:opacity-60
      "
    >
      {loading
        ? "Menyimpan..."
        : isEdit
        ? "Simpan Perubahan"
        : "Simpan Event"}
    </button>
  </div>

</form>


);
}
