import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Ticket,
  Tag,
  CheckCircle,
} from "lucide-react";

import { toast } from "sonner";

import { useEventDetail } from "../hooks/useEventDetail";
import { useMyRegistrations } from "@/features/registration/hooks/useMyRegistrations";
import { useRegisterEvent } from "@/features/registration/hooks/useRegisterEvent";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useEventDetail(id);

  const {
    data: registrationsData,
    isLoading: isLoadingRegistrations,
  } = useMyRegistrations();

  const registerEvent = useRegisterEvent();

  const registrations = registrationsData?.data || [];

  const isRegistered = registrations.some(
    (item) => String(item.event_id) === String(id)
  );

  const event = data?.data;

  const getPermissionLabel = (perm) => {
    switch (perm) {
      case "semua":
        return {
          text: "Terbuka Untuk Semua",
          style: "bg-green-100 text-green-700",
        };
      case "aktif":
        return {
          text: "Khusus Anggota Aktif",
          style: "bg-blue-100 text-blue-700",
        };
      case "umum":
        return {
          text: "Peserta Umum",
          style: "bg-emerald-100 text-emerald-700",
        };
      default:
        return {
          text: "Terbatas",
          style: "bg-slate-100 text-slate-600",
        };
    }
  };

  const permission = getPermissionLabel(
    event?.permission_peserta
  );

  const handleRegister = async () => {
    try {
      const result = await registerEvent.mutateAsync(Number(id));

      toast.success("Pendaftaran berhasil", {
        description:
          "Silakan cek menu 'Event Saya' untuk detail tiket dan status pembayaran",
      });

      navigate("/participant/my-events");
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message || "Gagal mendaftar event";

      if (status === 403) {
        toast.error("Tidak memenuhi syarat", {
          description: message,
        });
        return;
      }

      if (status === 400) {
        toast.warning("Pendaftaran ditolak", {
          description: message,
        });
        return;
      }

      toast.error("Terjadi kesalahan", {
        description: message,
      });
    }
  };

  if (isLoading || isLoadingRegistrations) {
    return (
      <div className="flex justify-center py-20">Loading...</div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center py-20">
        Event tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {event?.kategori}
            </span>

            <span
              className={`
                inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                ${permission.style}
              `}
            >
              {permission.text}
            </span>

            {isRegistered && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                <CheckCircle size={14} />
                Sudah Terdaftar
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">
            {event?.nama}
          </h1>

          <p className="mt-3 text-slate-600 leading-relaxed">
            {event?.deskripsi}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Info icon={<Tag size={18} />} label="Jenis Event" value={event?.jenis} />

            <Info
              icon={<Users size={18} />}
              label="Kuota"
              value={`${event?.kuota} Peserta`}
            />

            <Info icon={<MapPin size={18} />} label="Lokasi" value={event?.lokasi} />

            <Info
              icon={<Ticket size={18} />}
              label="HTM"
              value={`Rp ${Number(event?.htm || 0).toLocaleString("id-ID")}`}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            {isRegistered ? (
              <div className="h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center gap-2 text-green-700 font-semibold">
                <CheckCircle size={18} />
                Sudah Terdaftar
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={registerEvent.isPending}
                className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {registerEvent.isPending ? "Memproses..." : "Daftar Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 font-medium text-slate-800">{value || "-"}</p>
      </div>
    </div>
  );
}