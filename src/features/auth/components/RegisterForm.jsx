import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerSchema } from "../schemas/registerSchema";
import { useRegister } from "../hooks/useRegister";

import { useAuthStore } from "@/app/store/authStore";

export default function RegisterForm() {
  const navigate = useNavigate();

  const authStore =
    useAuthStore();

  const registerMutation =
    useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  const onSubmit =
    async (values) => {
      try {

        const response =
          await registerMutation.mutateAsync({
            nama:
              values.nama,

            email:
              values.email,

            password:
              values.password,
          });

        authStore.login(
          response.data,
          response.token
        );

        toast.success(
          "Registrasi berhasil"
        );

        navigate("/participant");

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Registrasi gagal"
        );
      }
    };

return (

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >
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
        Nama Lengkap
      </label>


  <input
    {...register("nama")}
    placeholder="Masukkan nama lengkap"
    className="
      h-14
      w-full

      rounded-2xl

      border
      border-slate-200

      bg-white/90

      px-4

      shadow-sm

      transition-all
      duration-300

      focus:border-green-500
      focus:ring-4
      focus:ring-green-500/10
    "
  />

  {errors.nama && (
    <p className="mt-2 text-sm text-red-500">
      {errors.nama.message}
    </p>
  )}
</div>

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
    Email
  </label>

  <input
    type="email"
    {...register("email")}
    placeholder="nama@email.com"
    className="
      h-14
      w-full

      rounded-2xl

      border
      border-slate-200

      bg-white/90

      px-4

      shadow-sm

      transition-all
      duration-300

      focus:border-green-500
      focus:ring-4
      focus:ring-green-500/10
    "
  />

  {errors.email && (
    <p className="mt-2 text-sm text-red-500">
      {errors.email.message}
    </p>
  )}
</div>

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
    Password
  </label>

  <input
    type="password"
    {...register("password")}
    placeholder="Minimal 8 karakter"
    className="
      h-14
      w-full

      rounded-2xl

      border
      border-slate-200

      bg-white/90

      px-4

      shadow-sm

      transition-all
      duration-300

      focus:border-green-500
      focus:ring-4
      focus:ring-green-500/10
    "
  />

  {errors.password && (
    <p className="mt-2 text-sm text-red-500">
      {errors.password.message}
    </p>
  )}
</div>

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
    Konfirmasi Password
  </label>

  <input
    type="password"
    {...register("confirmPassword")}
    placeholder="Ulangi password"
    className="
      h-14
      w-full

      rounded-2xl

      border
      border-slate-200

      bg-white/90

      px-4

      shadow-sm

      transition-all
      duration-300

      focus:border-green-500
      focus:ring-4
      focus:ring-green-500/10
    "
  />

  {errors.confirmPassword && (
    <p className="mt-2 text-sm text-red-500">
      {errors.confirmPassword.message}
    </p>
  )}
</div>

<button
  type="submit"
  disabled={registerMutation.isPending}
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

    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {registerMutation.isPending ? (
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
      Memproses...
    </span>
  ) : (
    "Daftar Sekarang"
  )}
</button>


  </form>
);

}