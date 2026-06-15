import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function SplashScreen({
  children,
}) {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

if (loading) {
  return (
    <>
          <Helmet>
            <title>Menyiapkan Tampilan | MPJ Fest 2026</title>
          </Helmet>
    <div
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-gradient-to-br
      from-slate-50
      via-white
      to-green-50
      "
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

      <div className="relative text-center">
        {/* Logo */}
        <img
          src="/mpj-vertical-color.png"
          alt="MPJ Fest"
          className="mx-auto w-[clamp(120px,30vw,180px)]"
        />

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
    animate-[loading_0.4s_ease-in-out_forwards]
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