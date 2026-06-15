import LoginForm from "../components/LoginForm";
import { Helmet } from "react-helmet-async";
import {
  useActiveFestival,
} from "@/features/festival/hooks/useActiveFestival";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
    const { data } =
  useActiveFestival();

const festival =
  data?.data;
  return (
<>
      <Helmet>
        <title>Login | MPJ Fest</title>
      </Helmet>

    <section
  className="
    relative
    pt-10
    pb-12
    lg:min-h-[calc(100svh-88px)]
    lg:flex
    lg:items-center
    overflow-hidden
  "
>
      {/* Background Blur */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
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
              Portal Peserta
              <span className="block text-green-600">
                & Manajemen Festival
              </span>
            </h1>

            <p
              className="
                mt-8
                max-w-xl
                text-lg
                text-slate-600
              "
            >
              Akses sistem pendaftaran peserta,
              penilaian lomba, administrasi event,
              dan monitoring festival secara real-time.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
     </>
  );
}