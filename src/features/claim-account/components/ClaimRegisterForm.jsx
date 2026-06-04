import { toast } from "sonner";

import { useForm }
from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  claimSchema,
}
from "../schemas/claimSchema";

import {
  useRegisterNiam,
}
from "../hooks/useRegisterNiam";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";

export default function ClaimRegisterForm({
  member,
}) {

  const registerNiam =
    useRegisterNiam();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      zodResolver(
        claimSchema
      ),
  });

  const navigate = useNavigate();

const login =
  useAuthStore(
    (state) => state.login
  );

  const onSubmit =
    async (values) => {

      try {

        const payload = {
          niam:
            member.niam,

          email:
            values.email,

          password:
            values.password,

          password_confirmation:
            values.password_confirmation,
        };

        const result =
  await registerNiam
    .mutateAsync(payload);

login(
  result.data,
  result.token
);

toast.success(
  "Akun berhasil dibuat"
);

navigate("/participant");

      } catch (error) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          "Gagal membuat akun"
        );
      }
    };

  return (
    <div
      className="
      mt-6

      rounded-[32px]

      border
      border-white/70

      bg-white/75

      p-8

      shadow-[0_30px_80px_rgba(15,23,42,.08)]
      "
    >
      <h3
        className="
        text-xl
        font-bold
        mb-6
        "
      >
        Lengkapi Akun
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="
            w-full
            h-14
            px-4

            rounded-2xl
            border
          "
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="
            w-full
            h-14
            px-4

            rounded-2xl
            border
          "
        />

        <input
          {...register(
            "password_confirmation"
          )}
          type="password"
          placeholder="Konfirmasi Password"
          className="
            w-full
            h-14
            px-4

            rounded-2xl
            border
          "
        />

        <button
          type="submit"
          className="
            h-14
            w-full

            rounded-2xl

            bg-gradient-to-r
            from-green-500
            to-green-600

            text-white
            font-semibold
          "
        >
          Klaim Akun
        </button>

      </form>
    </div>
  );
}