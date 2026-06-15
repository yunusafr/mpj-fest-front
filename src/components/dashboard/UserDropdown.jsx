import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);

  const logoutMutation = useLogout();
  const roleLabels = {
  super_admin: "Super Admin",
  admin_event: "Admin Event",
  peserta: "Peserta",
  juri: "Juri",
};

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      logoutStore();
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          bg-white/70
          px-2
          py-2
          transition
          hover:bg-white
        "
        style={{
          borderRadius: "10px",
        }}
      >
        <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-green-100
                font-bold
                text-green-700
              "
            >
              {user?.nama?.charAt(0)?.toUpperCase()}
            </div>

        <div className="text-left leading-tight">
          <p className="text-sm font-medium text-slate-900">
            {user?.nama}
          </p>
          <p className="text-[11px] text-slate-500 capitalize">
            <p className="text-xs text-slate-500">
  {roleLabels[user?.role] || "-"}
</p>
          </p>
        </div>

        <span className="text-xs text-slate-400">▾</span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute
          right-0
          z-20
          mt-0.5
          w-52
          border
          bg-white
          shadow-lg
          transition-all
          duration-200
          origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
        style={{
          borderColor: "rgba(6,70,34,.10)",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        {/* header section */}
        <div className="px-3 py-3">
          <p className="text-sm font-medium text-slate-900">
            {user?.nama}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            <p className="text-xs text-slate-500">
  {roleLabels[user?.role] || "-"}
</p>
          </p>
        </div>

        <div
          className="h-px w-full"
          style={{ backgroundColor: "rgba(15,23,42,.06)" }}
        />

        {/* menu */}
        <div className="p-1">
          <button
  onClick={handleLogout}
  className="
    w-full
    rounded-lg
    px-3
    py-2
    text-left
    text-sm
    font-semibold
    text-red-600
    transition
    hover:bg-red-50
  "
>
  Logout
</button>
        </div>

      </div>
    </div>
  );
}