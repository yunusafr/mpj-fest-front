import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="tentang"
      className="
      border-t
      border-slate-200
      bg-gradient-to-b
      from-white
      via-slate-50
      to-white
      "
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-4">
  <img
    src="/mpj-horizontal-color.png"
    alt="MPJ FEST"
    className="h-13 w-auto object-contain"
  />
</div>

            <p
              className="
              mt-10
              max-w-md
              leading-relaxed
              text-slate-500
              "
            >
              Wadah kreativitas santri dalam bidang
              jurnalistik, fotografi, videografi,
              desain grafis, dan karya digital
              untuk membangun generasi kreatif
              yang berdaya saing.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4
              className="
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-900
              "
            >
              Navigasi
            </h4>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#festival"
                className="text-slate-500 hover:text-green-600"
              >
                Festival
              </a>

              <a
                href="#event"
                className="text-slate-500 hover:text-green-600"
              >
                Event
              </a>

              <Link
                to="/login"
                className="text-slate-500 hover:text-green-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-slate-500 hover:text-green-600"
              >
                Daftar
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4
              className="
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-900
              "
            >
              Kontak
            </h4>

            <div className="mt-5 space-y-3">
              <p className="text-slate-500">
                media.pondokjatim@gmail.com
              </p>

              <p className="text-slate-500">
                Jawa Timur, Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
          mt-14
          flex
          flex-col
          gap-3
          border-t
          border-slate-200
          pt-6
          text-sm
          text-slate-500
          md:flex-row
          md:items-center
          md:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} MPJ FEST.
            All rights reserved.
          </p>

          <p>
            Festival Media Pondok Jawa Timur
          </p>
        </div>
      </div>
    </footer>
  );
}