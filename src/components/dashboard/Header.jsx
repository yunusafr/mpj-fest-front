import UserDropdown from "./UserDropdown";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-1
        z-30
        h-16
        border-b
        bg-white/70
        backdrop-blur-xl
        mx-2
        sm:mx-4
        rounded-2xl
      "
      style={{
        borderColor: "rgba(6,70,34,.08)",
      }}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left - Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: "#064622" }}
          />

          <div className="leading-tight min-w-0">
            <p className="text-sm sm:text-sm font-medium text-slate-800 truncate">
              Dashboard
            </p>

            <p className="text-[11px] sm:text-xs text-slate-500 truncate">
              MPJ Fest Admin Panel
            </p>
          </div>
        </div>

        {/* Right - User */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* divider only on larger screens */}
          <div
            className="hidden sm:block h-6 w-px"
            style={{ backgroundColor: "rgba(6,70,34,.15)" }}
          />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}