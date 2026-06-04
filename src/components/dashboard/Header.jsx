import UserDropdown from "./UserDropdown";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-2
        z-30
        h-16
        border-b
        bg-white/70
        backdrop-blur-xl
      "
      style={{
        borderColor: "rgba(6,70,34,.08)",
      }}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left - Breadcrumb / Title */}
        <div className="flex items-center gap-3">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#064622" }}
          />

          <div>
            <p className="text-sm font-medium text-slate-800">
              Dashboard
            </p>

            <p className="text-xs text-slate-500">
              MPJ Fest Admin Panel
            </p>
          </div>
        </div>

        {/* Right - User */}
        <div className="flex items-center gap-4">
          {/* small accent line */}
          <div
            className="hidden h-6 w-px sm:block"
            style={{ backgroundColor: "rgba(6,70,34,.15)" }}
          />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}