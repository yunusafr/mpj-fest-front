import { Link } from "react-router-dom";

export default function NotFoundMember() {
  return (
    <div
      className="
      mt-6
      bg-yellow-50
      border
      border-yellow-300
      rounded-2xl
      p-6
      text-center
    "
    >
      <h3 className="font-bold">
        NIAM Tidak Ditemukan
      </h3>

      <p className="text-gray-600 mt-2">
        Silakan daftar sebagai
        peserta umum.
      </p>

      <Link
  to="/register"
  className="
    mt-6

    inline-flex
    w-full
    items-center
    justify-center

    rounded-2xl

    bg-gradient-to-r
    from-yellow-500
    to-amber-500

    px-4
    py-3

    font-semibold
    text-white

    shadow-[0_15px_35px_rgba(234,179,8,.25)]

    transition-all
    duration-300

    hover:-translate-y-0.5
    hover:shadow-[0_20px_45px_rgba(234,179,8,.35)]
  "
>
  Daftar Umum
</Link>
    </div>
  );
}