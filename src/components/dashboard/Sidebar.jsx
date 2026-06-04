import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { sidebarMenu } from "@/config/sidebarMenu";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const menus = sidebarMenu[user?.role] || [];

  const roleLabels = {
    super_admin: "Super Admin",
    admin_event: "Admin Event",
    panitia: "Panitia",
    kru_media: "Kru Media",
  };

  return (
    <aside
      className="
        z-40

        /* MOBILE bottom nav */
        fixed bottom-0 left-0 right-0
        h-20 w-full
        flex flex-row
        items-center justify-around
        border-t bg-white

        /* DESKTOP sidebar */
        lg:relative
        lg:h-screen
        lg:w-60
        lg:flex-col
        lg:justify-between
        lg:border-r
      "
      style={{
        background:
          "linear-gradient(180deg,rgba(255,255,255,.95),rgba(248,250,252,.92))",
        borderColor: "rgba(6,70,34,.08)",
      }}
    >
      {/* LOGO (desktop only) */}
      <div className="hidden lg:flex items-center justify-center px-6 py-8">
        <Link to="/">
          <img
            src="/mpj-horizontal-color.png"
            alt="MPJ Fest"
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>

      {/* MENU */}
      <nav className="flex-1 flex lg:block justify-around lg:justify-start px-2 lg:px-4">
        {menus.map((menu) => {
          const MenuIcon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              end
              to={menu.path}
              className={({ isActive }) =>
  `
  flex flex-col lg:flex-row
  items-center
  gap-1 lg:gap-2
  px-2 lg:px-6 py-2 lg:py-3

  text-[10px] lg:text-base

  ${
    isActive
      ? `
        text-green-700

        lg:bg-gradient-to-r
        lg:from-green-500
        lg:to-green-600
        lg:text-white
        lg:rounded-xl
        lg:shadow-lg
      `
      : `
        text-slate-500
        hover:text-slate-900
        lg:hover:bg-slate-100
      `
  }
`
}
            >
              <MenuIcon
  className={`w-5 h-5 lg:w-6 lg:h-6 ${
    location.pathname === menu.path ? "font-bold" : ""
  }`}
  strokeWidth={2.3}
/>

              <span className="mt-0.5 lg:mt-0 ">
                {menu.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* USER (desktop only) */}
      <div className="hidden lg:flex border-t border-slate-200/60 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-semibold">
            {user?.nama?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">
              {user?.nama}
            </p>
            <p className="text-xs text-slate-500">
              {roleLabels[user?.role] || "-"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}