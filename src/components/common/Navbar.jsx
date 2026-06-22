import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menus = [
    { label: "Festival", href: "#festival" },
    { label: "Event", href: "#event" },
    { label: "Voting", href: "/v" },
  ];

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className="
            w-full
            max-w-7xl
            rounded-[28px]
            border
            border-white/20
            bg-white/60
            backdrop-blur-3xl
            shadow-[0_20px_60px_rgba(15,23,42,0.12)]
            ring-1
            ring-white/30
          "
        >
          <div className="h-20 flex items-center justify-between px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <img
                src="/mpj-horizontal-color.png"
                alt="MPJ FEST"
                className="
                  h-9
                  md:h-10
                  w-auto
                  object-contain
                  transition-transform
                  duration-300
                "
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <nav className="flex items-center gap-10">
                {menus.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="
                      relative
                      text-[15px]
                      font-medium
                      text-slate-700
                      transition-all
                      duration-300
                      hover:text-slate-950
                      after:absolute
                      after:left-0
                      after:-bottom-1.5
                      after:h-[2px]
                      after:w-0
                      after:bg-gradient-to-r
                      after:from-green-500
                      after:to-emerald-400
                      after:transition-all
                      after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="
                    px-5
                    py-2.5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/70
                    text-slate-700
                    font-medium
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:shadow-lg
                  "
                >
                  Login
                </Link>

                <Link
                  to="/klaim-akun"
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    px-6
                    py-2.5
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:shadow-[0_12px_35px_rgba(16,185,129,0.35)]
                    bg-gradient-to-r
                    from-green-600
                    via-emerald-500
                    to-lime-500
                  "
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-2xl
                bg-white/70
                border
                border-slate-200
                text-slate-700
                transition
              "
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`
              md:hidden
              overflow-hidden
              transition-all
              duration-300
              ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="border-t border-slate-200/60 px-6 py-6">
              <div className="flex flex-col gap-5">
                {menus.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      text-slate-700
                      font-medium
                      text-base
                      transition
                      hover:text-emerald-600
                    "
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-3 flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="
                      w-full
                      text-center
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      py-3
                      font-medium
                      text-slate-700
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/klaim-akun"
                    onClick={() => setOpen(false)}
                    className="
                      w-full
                      text-center
                      rounded-2xl
                      py-3
                      font-semibold
                      text-white
                      bg-gradient-to-r
                      from-green-600
                      via-emerald-500
                      to-lime-500
                      shadow-lg
                    "
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-28" />
    </>
  );
}
