import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { niamSchema } from "../schemas/niamSchema";

export default function NiamSearchForm({ onSearch, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(niamSchema),
  });

  return (
    <div
      className="
relative
w-full
max-w-xl


    overflow-hidden

    rounded-[32px]

    p-8
    md:p-10
  "
    >
      <div
        className="
      absolute
      -right-24
      -top-24

      h-56
      w-56

      rounded-full

      blur-3xl
    "
      />

      <div
        className="
      absolute
      -left-24
      -bottom-24

      h-56
      w-56

      rounded-full

    "
      />

      <div className="relative z-10">
        <h3
          className="
        text-3xl
        font-black
        tracking-tight
      "
        >
          Pencarian NIAM
        </h3>

        <p
          className="
        mt-2
        text-slate-500
      "
        >
          Masukkan Nomor Induk Anggota Madrasah untuk melakukan pencarian data.
        </p>

        <form onSubmit={handleSubmit(onSearch)} className="mt-8 space-y-5">
          <div>
            <label
              className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
            >
              Nomor NIAM
            </label>

            <div className="relative">
              <Search
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
                {...register("niam")}
                placeholder="Masukkan nomor NIAM"
                className="
              h-14
              w-full

              rounded-2xl

              border
              border-slate-200

              bg-white/90

              pl-12
              pr-4

              shadow-sm

              transition-all
              duration-300

              focus:border-green-500
              focus:ring-4
              focus:ring-green-500/10
            "
              />
            </div>

            {errors.niam && (
              <p
                className="
              mt-2
              text-sm
              text-red-500
            "
              >
                {errors.niam.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
          h-14
          w-full

          rounded-2xl

          bg-gradient-to-r
          from-green-500
          to-green-600

          text-white
          font-semibold

          shadow-[0_15px_35px_rgba(34,197,94,.25)]

          transition-all
          duration-300

          hover:-translate-y-0.5
          hover:shadow-[0_20px_45px_rgba(34,197,94,.35)]

          disabled:opacity-60
          disabled:cursor-not-allowed
        "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div
                  className="
                h-5
                w-5

                animate-spin

                rounded-full

                border-2
                border-white/30
                border-t-white
              "
                />
                Mencari...
              </span>
            ) : (
              "Cari Data"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
