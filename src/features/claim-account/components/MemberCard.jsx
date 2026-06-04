import { BadgeCheck, Building2, User, MapPin } from "lucide-react";

export default function MemberCard({ data }) {
return (
<div
className="
relative
mt-6


    overflow-hidden

    rounded-[32px]

    border
    border-white/70

    bg-white/75

    p-8

    shadow-[0_30px_80px_rgba(15,23,42,.08)]

    backdrop-blur-3xl
  "
>
  <div
    className="
      absolute
      -right-20
      -top-20

      h-40
      w-40

      rounded-full

      bg-green-400/10

      blur-3xl
    "
  />

  <div className="relative z-10">
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-2xl

          bg-green-100
          text-green-600
        "
      >
        <BadgeCheck size={24} />
      </div>

      <div>
        <h3
          className="
            text-xl
            font-bold
          "
        >
          Data Anggota Ditemukan
        </h3>

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          Data berhasil diverifikasi
        </p>
      </div>
    </div>

    <div
      className="
        mt-8
        space-y-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-slate-50

          p-4
        "
      >
        <span className="text-slate-500">
          NIAM
        </span>

        <span className="font-semibold">
          {data.niam}
        </span>
      </div>

      <div
        className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-slate-50

          p-4
        "
      >
        <div className="flex items-center gap-2">
          <User size={16} />
          <span className="text-slate-500">
            Nama
          </span>
        </div>

        <span className="font-semibold">
          {data.nama}
        </span>
      </div>

      <div
        className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-slate-50

          p-4
        "
      >
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span className="text-slate-500">
            Pesantren
          </span>
        </div>

        <span className="font-semibold text-right">
          {data.pesantren}
        </span>
      </div>

      <div
        className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-slate-50

          p-4
        "
      >
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span className="text-slate-500">
            Regional
          </span>
        </div>

        <span className="font-semibold">
          {data.regional}
        </span>
      </div>

      <div
        className="
          flex
          items-center
          justify-between

          rounded-2xl

          bg-slate-50

          p-4
        "
      >
        <span className="text-slate-500">
          Jabatan
        </span>

        <span className="font-semibold">
          {data.jabatan_media}
        </span>
      </div>
    </div>

  </div>
</div>


);
}
