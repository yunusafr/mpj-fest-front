import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function NotFoundPage() {
  return (
        <>
    <Helmet>
            <title>Tidak ditemukan | MPJ Fest</title>
          </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-black text-green-500">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mt-4 text-gray-500">
          Halaman yang Anda cari tidak tersedia
          atau telah dipindahkan.
        </p>

        <Link
          to="/"
          className="
            inline-flex
            mt-8
            px-6
            py-3
            rounded-xl
            bg-green-600
            text-white
            hover:bg-green-700
          "
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
    </>
  );
}