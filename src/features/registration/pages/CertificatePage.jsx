import { useParams } from "react-router-dom";
import { useMyCertificate } from "../hooks/useMyCertificate";

export default function CertificatePage() {
  const { registrationId } = useParams();
  const { data, isLoading, error } = useMyCertificate(registrationId);

  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
        {error.response?.data?.message}
      </div>
    );
  }

  const config = data.sertifikat_config || {};

  const logoUrls = config.logo_urls || [];

  const safePrimary = config.primary_color || "#B8860B";
  const safeSecondary = config.secondary_color || "#FFFFFF";
  const safeText = config.text_color || "#111827";

  return (
    <div className="py-10 px-4 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            relative
            w-full
            aspect-[297/210]
            overflow-hidden
            rounded-[32px]
            shadow-[0_30px_80px_rgba(0,0,0,0.15)]
          "
          style={{
            background: `
              radial-gradient(circle at top left,
              rgba(212,175,55,.08),
              transparent 35%),
              radial-gradient(circle at bottom right,
              rgba(212,175,55,.08),
              transparent 35%),
              ${safeSecondary}
            `,
          }}
        >
          {/* ISLAMIC GEOMETRIC PATTERN */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='1'%3E%3Cpath d='M60 0 L75 45 L120 60 L75 75 L60 120 L45 75 L0 60 L45 45 Z'/%3E%3Ccircle cx='60' cy='60' r='18'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
            }}
          />

          {/* TOP LEFT GLOW */}
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05]"
            style={{
              background: safePrimary,
            }}
          />

          {/* BOTTOM RIGHT GLOW */}
          <div
            className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05]"
            style={{
              background: safePrimary,
            }}
          />
          {/* GEOMETRIC ISLAMIC TEXTURE */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="certificatePattern"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    fill={safePrimary}
                    d="
            M50 50H0V0h50v50z
            M35 35V15H15v20h20z
            M100 100H50V50h50v50z
            M85 85V65H65v20h20z
            M35 64.9571v20H15v-20z
            M85 14.9571v20H65v-20z
          "
                  />

                  <use href="#patternShape" x="-100" />
                  <use href="#patternShape" x="100" />
                  <use href="#patternShape" y="-100" />
                  <use href="#patternShape" y="100" />

                  <path
                    id="patternShape"
                    fill={safePrimary}
                    d="
            M50 50H0V0h50v50z
            M35 35V15H15v20h20z
            M100 100H50V50h50v50z
            M85 85V65H65v20h20z
            M35 64.9571v20H15v-20z
            M85 14.9571v20H65v-20z
          "
                  />
                </pattern>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="url(#certificatePattern)"
              />
            </svg>
          </div>
          {/* FRAME */}
          <div
            className="absolute inset-5 rounded-[28px] border-[3px]"
            style={{ borderColor: safePrimary }}
          />

          <div
            className="absolute inset-9 rounded-[24px] border"
            style={{
              borderColor: `${safePrimary}55`,
            }}
          />

          {/* CORNER ORNAMENTS */}
          <div
            className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 rounded-tl-3xl"
            style={{ borderColor: safePrimary }}
          />

          <div
            className="absolute top-8 right-8 w-24 h-24 border-t-4 border-r-4 rounded-tr-3xl"
            style={{ borderColor: safePrimary }}
          />

          <div
            className="absolute bottom-8 left-8 w-24 h-24 border-b-4 border-l-4 rounded-bl-3xl"
            style={{ borderColor: safePrimary }}
          />

          <div
            className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 rounded-br-3xl"
            style={{ borderColor: safePrimary }}
          />

          <div className="relative z-10 h-full flex flex-col px-20 py-12">
            {/* HEADER */}
            <div>
              {logoUrls.length > 0 && (
                <div className="flex justify-center gap-8 mt-18 mb-12">
                  {logoUrls.map((logo, i) => (
                    <img
                      key={i}
                      src={`${baseUrl}${logo}`}
                      className="h-14 object-contain"
                      alt=""
                    />
                  ))}
                </div>
              )}

              <div className="text-center mt-4">
                <h1
                  className="
                    text-6xl
                    font-black
                    tracking-[0.25em]
                  "
                  style={{ color: safePrimary }}
                >
                  CERTIFICATE
                </h1>

                <p className="mt-2 uppercase tracking-[0.35em] text-xs text-slate-500">
                  Certificate of Participation
                </p>
              </div>
            </div>

            {/* BODY */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <p className="text-slate-500 text-lg">Diberikan Kepada</p>

              <h2
                className="
                  mt-5
                  text-6xl
                  font-serif
                  font-bold
                "
                style={{
                  color: safeText,
                  textShadow: "0 4px 10px rgba(0,0,0,0.08)",
                }}
              >
                {data.nama_peserta || "-"}
              </h2>

              <div className="flex items-center justify-center gap-4 mt-8">
                <div
                  className="w-32 h-px"
                  style={{ background: safePrimary }}
                />

                <div
                  className="w-3 h-3 rotate-45"
                  style={{ background: safePrimary }}
                />

                <div
                  className="w-32 h-px"
                  style={{ background: safePrimary }}
                />
              </div>

              <p className="mt-10 text-slate-600">Atas partisipasinya pada</p>

              <h3 className="text-3xl font-bold mt-4 text-slate-800">
                {data.event_name}
              </h3>

              {config.custom_text && (
                <p className="mt-8 text-slate-600 leading-relaxed">
                  {config.custom_text}
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-end">
              {/* CERT NUMBER */}
              <div>
                <p className="text-sm text-slate-500">Nomor Sertifikat</p>

                <p
                  className="mt-2 font-semibold tracking-wider"
                  style={{ color: safePrimary }}
                >
                  {data.nomor_sertifikat}
                </p>
              </div>

              {/* SIGNATURE */}
              <div className="relative w-72 h-44">
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <div className="border-t border-slate-400 pt-3">
                    {config.signature_url && (
                      <img
                        src={`${baseUrl}${config.signature_url}`}
                        alt=""
                        className="
                      absolute
                      left-1/2
                      bottom-4
                      -translate-x-1/2
                      h-40
                      object-contain
                      z-20
                      opacity-95
                    "
                      />
                    )}
                    <p className="font-semibold text-lg">
                      {config.signer_name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {config.signer_position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
