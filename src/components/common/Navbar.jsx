import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-5
        z-50
        mx-auto
        w-[95%]
        max-w-7xl
        rounded-3xl
        border
        border-white/20
        bg-white/70
        backdrop-blur-2xl
        shadow-[0_8px_40px_rgba(0,0,0,0.08)]
      "
    >
      <div className="h-20 flex items-center justify-between px-8">
<Link
  to="/"
  className="flex items-center"
>
  <img
    src="/mpj-horizontal-color.png"
    alt="MPJ FEST"
    className="h-8 md:h-10 w-auto object-contain"
  />
</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            "Festival",
            "Event",
            "Tentang",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="
                relative
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:text-slate-900
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-green-500
                after:transition-all
                hover:after:w-full
              "
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white/70
              text-slate-700
              font-medium
              hover:bg-white
              hover:shadow-md
              transition-all
            "
          >
            Login
          </Link>

          <Link
            to="/klaim-akun"
            className="
              px-6
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-green-600
              via-emerald-500
              to-lime-500
              text-white
              font-semibold
              shadow-lg
              shadow-green-500/25
              hover:-translate-y-0.5
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}