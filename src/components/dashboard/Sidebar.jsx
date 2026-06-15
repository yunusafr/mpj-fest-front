import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "@/app/store/authStore";
import { sidebarMenu } from "@/config/sidebarMenu";

export default function Sidebar() {
  const location =
    useLocation();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const menus =
    sidebarMenu[user?.role] ||
    [];

  const roleLabels = {
    super_admin:
      "Super Admin",
    admin_event:
      "Admin Event",
    peserta: "Peserta",
    juri: "Juri",
  };

  const isMenuActive = (
    menu
  ) => {
    if (menu.exact) {
      return (
        location.pathname ===
        menu.path
      );
    }

    return (
      location.pathname ===
        menu.path ||
      location.pathname.startsWith(
        `${menu.path}/`
      )
    );
  };

  return (
    <aside
      className="
        z-40

        fixed
        bottom-0
        left-0
        right-0

        flex
        h-20
        w-full
        flex-row
        items-center
        justify-around

        border-t
        bg-white

        lg:sticky
        lg:top-0
        lg:h-screen
        lg:w-64
        lg:flex-col
        lg:justify-between
        lg:border-r
      "
      style={{
        background:
          "linear-gradient(180deg,rgba(255,255,255,.95),rgba(248,250,252,.92))",
        borderColor:
          "rgba(6,70,34,.08)",
      }}
    >
      {/* LOGO */}
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
      <nav className="flex flex-1 justify-around px-2 lg:block lg:px-4">
        {menus.map((menu) => {
          const MenuIcon =
            menu.icon;

          const active =
            isMenuActive(menu);

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={`
                flex
                flex-col
                items-center
                gap-1

                px-2
                py-2

                text-[10px]
                lg:flex-row
                lg:gap-3
                lg:px-5
                lg:py-3
                lg:text-sm

                ${
                  active
                    ? `
                      text-green-700

                      lg:rounded-xl
                      lg:bg-gradient-to-r
                      lg:from-green-500
                      lg:to-green-600
                      lg:text-white
                      lg:shadow-lg
                    `
                    : `
                      text-slate-500
                      hover:text-slate-900
                      lg:hover:bg-slate-100
                    `
                }
              `}
            >
              <MenuIcon
                size={20}
                strokeWidth={
                  active
                    ? 2.5
                    : 2
                }
              />

              <span>
                {menu.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* USER */}
      <div className="hidden border-t border-slate-200/60 p-4 lg:flex">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-green-100
              font-semibold
              text-green-700
            "
          >
            {user?.nama
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">
              {user?.nama}
            </p>

            <p className="text-xs text-slate-500">
              {roleLabels[
                user?.role
              ] || "-"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}