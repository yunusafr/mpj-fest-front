import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import { QrCode, Sparkles, Camera, ShieldCheck } from "lucide-react";
import { useScanTicket } from "../hooks/useScanTicket";

export default function ScanTicketPage() {
  const { mutateAsync } = useScanTicket();

  const qrRef = useRef(null);
  const isMountedRef = useRef(false);
  const isProcessingRef = useRef(false);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const successAudioRef = useRef(
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"
    )
  );

  const playSuccessSound = () => {
    try {
      successAudioRef.current.volume = 0.4;
      successAudioRef.current.currentTime = 0;
      successAudioRef.current.play();
    } catch {}
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    let qr;

    const startScanner = async () => {
      try {
        setCameraReady(false);
        setCameraError(null);

        qr = new Html5Qrcode("reader");
        qrRef.current = qr;

        await qr.start(
  {
    facingMode: "environment",
  },
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const size = Math.min(
                viewfinderWidth,
                viewfinderHeight,
                280
              );

              return {
                width: size,
                height: size,
              };
            },
            aspectRatio: 1,
            disableFlip: false,
          },
          async (decodedText) => {
            if (isProcessingRef.current) return;

            isProcessingRef.current = true;

            try {
              const result = await mutateAsync(decodedText);

              toast.success(result.message);

              playSuccessSound();

              if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
              }

              try {
                qr.pause(true);
              } catch {}

              setTimeout(() => {
                isProcessingRef.current = false;

                try {
                  qr.resume();
                } catch {}
              }, 2500);
            } catch (err) {
              toast.error(
                err?.response?.data?.message ||
                  err?.message ||
                  "Scan gagal"
              );

              setTimeout(() => {
                isProcessingRef.current = false;
              }, 800);
            }
          },
          () => {}
        );

        setCameraReady(true);
      } catch (err) {
        console.error(err);

        setCameraError(
          "Kamera tidak dapat diakses. Pastikan izin kamera diberikan."
        );

        toast.error("Kamera tidak bisa diakses");
      }
    };

    startScanner();

    return () => {
      const cleanup = async () => {
        try {
          if (
            qrRef.current &&
            qrRef.current.isScanning
          ) {
            await qrRef.current.stop();
          }

          await qrRef.current?.clear();
        } catch (e) {
          console.log(e);
        }

        qrRef.current = null;
        isMountedRef.current = false;
      };

      cleanup();
    };
  }, [mutateAsync]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-50 blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Sparkles size={12} />
              Competition Hub
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Scan Tiket Peserta
            </h1>

            <p className="mt-2 text-slate-500">
              Validasi kehadiran peserta dengan QR Code.
            </p>
          </div>

          <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <QrCode size={30} />
          </div>
        </div>
      </div>

      {/* SCANNER */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Camera size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">Kamera Aktif</p>
                <p className="text-xs text-slate-500">
                  Arahkan ke QR Code
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">Auto Verify</p>
                <p className="text-xs text-slate-500">
                  Validasi real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative rounded-[15px] overflow-hidden border-white/20 bg-black shadow-2xl">
            {/* CAMERA */}
            <div
              id="reader"
              className="w-full min-h-[320px] h-[60vh]"
            />

            {/* OVERLAY LOADING */}
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-20">
                <div className="text-center space-y-2">
                  <Camera className="mx-auto text-slate-400" />

                  {cameraError ? (
                    <>
                      <p className="font-semibold text-red-500">
                        Kamera tidak bisa diakses
                      </p>

                      <p className="text-sm text-slate-500">
                        Aktifkan permission kamera di browser
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-slate-600">
                        Menunggu akses kamera...
                      </p>

                      <p className="text-sm text-slate-400">
                        Pastikan izin kamera diberikan
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
            </div>

            {/* FRAME */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="scanner-frame h-64 w-64 rounded-2xl border-2 border-emerald-400/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}