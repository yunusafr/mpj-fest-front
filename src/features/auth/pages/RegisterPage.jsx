import RegisterForm from "../components/RegisterForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
return (
<section
className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-green-50
      via-white
      to-yellow-50
      px-4
  "
>
  <div
className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        w-full
        max-w-xl
        "
  >
    {/* TITLE */}
    <h1
      className="
        text-3xl
        font-bold
        text-center
        mb-6
      "
    >
      Register Akun
    </h1>

    {/* BACK BUTTON (same as ClaimAccountPage) */}
    <div className="mb-6 mt-5 flex justify-center">
      <Link
        to="/"
        className="
          inline-flex
          items-center
          gap-2

          text-sm
          font-medium

          text-slate-500

          transition-colors

          hover:text-green-600
        "
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </Link>
    </div>

    {/* FORM */}
    <RegisterForm />
  </div>
</section>


);
}
