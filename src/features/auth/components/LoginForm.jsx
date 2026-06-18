import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";

import { useAuthStore } from "@/app/store/authStore";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const navigate = useNavigate();

  const authStore = useAuthStore();

  const loginMutation = useLogin();

  const errorMessage =
    loginMutation.error?.response?.data?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const redirectByRole = (role) => {
    switch (role) {
      case "peserta":
        navigate("/participant");
        break;

      case "juri":
        navigate("/judge");
        break;

      case "admin_event":
        navigate("/admin-event");
        break;

      case "super_admin":
        navigate("/super-admin");
        break;

      default:
        navigate("/");
    }
  };

  const onSubmit = async (values) => {
    const response =
      await loginMutation.mutateAsync(values);

    authStore.login(
      response.data,
      response.token
    );

    redirectByRole(response.data.role);
  };

 return (
<Card
className="
w-full
max-w-md
rounded-[32px]
border
border-slate-200/70
bg-white/85
backdrop-blur-xl
shadow-xl
"

>


<CardHeader className="space-y-5 pb-2 text-center">



  {/* Logo */}
{/* Logo */}
<img
  src="/mpj-vertical-color.png"
  alt="MPJ FEST"
  className="
    mx-auto
    h-28
    w-auto
    object-contain
  "
/>

</CardHeader>

<CardContent className="pt-6">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >
    {errorMessage && (
      <div
        className="
        rounded-2xl
        border
        border-red-200
        bg-red-50
        px-4
        py-3
        text-sm
        text-red-600
        "
      >
        {errorMessage}
      </div>
    )}

    {/* Email */}
    <div className="space-y-2">
      <label
        className="
        text-sm
        font-medium
        text-slate-700
        "
      >
        Email
      </label>

      <Input
        placeholder="nama@email.com"
        className="
        h-12
        rounded-2xl
        
        bg-white
        "
        {...register("email")}
      />

      {errors.email && (
        <p className="text-sm text-red-500">
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Password */}
    <div className="space-y-2">
      <label
        className="
        text-sm
        font-medium
        text-slate-700
        "
      >
        Password
      </label>

      <Input
        type="password"
        placeholder="••••••••"
        className="
        h-12
        rounded-2xl
        
        bg-white
        "
        {...register("password")}
      />

      {errors.password && (
        <p className="text-sm text-red-500">
          {errors.password.message}
        </p>
      )}
    </div>

    {/* Button */}
    <Button
      type="submit"
      disabled={loginMutation.isPending}
      className="
      h-12
      w-full
      rounded-2xl
      bg-gradient-to-r
      from-green-600
      to-lime-500
      font-semibold
      text-white
      shadow-lg
      transition-all
      hover:opacity-95
      "
    >
      {loginMutation.isPending
        ? "Memproses..."
        : "Masuk"}
    </Button>

    {/* Divider */}
    <div className="pt-2">
      <div className="h-px bg-slate-100" />
    </div>

    {/* Footer */}
    <p
      className="
      text-center
      text-xs
      text-slate-400
      "
    >
      © {new Date().getFullYear()} MPJ FEST
    </p>
  </form>
</CardContent>


  </Card>
);

}