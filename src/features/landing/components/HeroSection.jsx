import { Link } from "react-router-dom";
import {
  useActiveFestival,
} from "@/features/festival/hooks/useActiveFestival";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  const { data } =
  useActiveFestival();

const festival =
  data?.data;
return ( <section
  className="
    relative
    pt-32
    pb-12
    lg:min-h-[calc(100svh-88px)]
    lg:flex
    lg:items-center
    overflow-hidden
  "
> <div className="absolute inset-0"> <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-200/40 blur-3xl" />


    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
  </div>

  <div className="container relative mx-auto px-6">
    <div className="grid items-center gap-16 lg:grid-cols-2">
      <div>
<span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
      <Sparkles size={15} />
      {festival?.nama}
     </span>

        <h1
          className="
          mt-6
          text-6xl
          font-black
          leading-tight
          tracking-tight
          lg:text-7xl
          "
        >
          Festival
          <span className="gradient-text block">
            Media Pondok
          </span>
          Jawa Timur
        </h1>

        <p className="mt-8 max-w-xl text-lg text-slate-600">
          Wadah kreativitas santri dalam bidang
          jurnalistik, fotografi, videografi,
          desain grafis, media digital,
          dan karya kreatif berbasis teknologi.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/klaim-akun"
            className="
            rounded-2xl
            bg-gradient-to-r
            from-green-600
            to-lime-500
            px-7
            py-4
            font-semibold
            text-white
            shadow-lg
            "
          >
            Register
          </Link>

          <Link
            to="/login"
            className="
            rounded-2xl
            bg-white
            px-7
            py-4
            font-semibold
            shadow-me
            "
          >
            Login
          </Link>
        </div>
      </div>

      <div>
        <div
          className="
          rounded-[32px]
          border
          bg-white/80
          p-8
          backdrop-blur-xl
          shadow-xl
          "
        >
          <h3 className="text-xl font-bold">
            {festival?.nama}
          </h3>

          <p className="mt-2 text-slate-500">
            Festival Media Pondok Jawa Timur
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-green-50 p-5">
              <p className="text-3xl font-black">
                100+
              </p>
              <p>Pesantren</p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-5">
              <p className="text-3xl font-black">
                5000+
              </p>
              <p>Peserta</p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-3xl font-black">
                25+
              </p>
              <p>Kategori</p>
            </div>

            <div className="rounded-2xl bg-purple-50 p-5">
              <p className="text-3xl font-black">
                2026
              </p>
              <p>Festival</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


);
}
