import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Memuat | MPJ Fest</title>
        </Helmet>

        <div
          className={`
            fixed inset-0 z-50
            flex min-h-screen
            items-center
            justify-center
            overflow-hidden
            bg-gradient-to-br
            from-slate-50
            via-white
            to-green-50
            transition-opacity
            duration-500
            ${fadeOut ? "opacity-0" : "opacity-100"}
          `}
        >
          {/* Background Glow */}
          <div
            className="
              absolute
              -left-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-green-200/30
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -right-32
              -bottom-32
              h-96
              w-96
              rounded-full
              bg-lime-200/30
              blur-3xl
            "
          />

          <div className="relative text-center px-6">
            {/* Title */}
            <h1
  className="
    text-2xl
    md:text-6xl
    font-extrabold
    tracking-tight
  "
  style={{ color: "#064622" }}
>
  MPJ Fest 
</h1>

            {/* Subtitle */}
            <p
              className="
                mt-4
                text-base
                md:text-lg
                font-medium
                tracking-wide
                text-slate-600
              "
            >
              Menyiapkan pengalaman terbaik untuk Anda
              <span className="inline-block animate-bounce">.</span>
              <span className="inline-block animate-bounce [animation-delay:0.15s]">
                .
              </span>
              <span className="inline-block animate-bounce [animation-delay:0.3s]">
                .
              </span>
            </p>

            {/* Loading Line */}
            <div
              className="
                mx-auto
                mt-8
                h-1.5
                w-40
                overflow-hidden
                rounded-full
                bg-slate-200
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-green-500
                  to-lime-500
                  animate-[loading_1.2s_ease-in-out_forwards]
                "
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return children;
}