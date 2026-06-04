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

  const {
    data,
    isLoading,
  } = useEventDetail(id);

  const {
    data: registrationsData,
    isLoading: isLoadingRegistrations,
  } = useMyRegistrations();

  const registerEvent =
    useRegisterEvent();

  const registrations =
    registrationsData?.data || [];

const isRegistered =
  registrations.some(
    (item) =>
      String(item.event_id) === String(id)
  );
  
  if (
    isLoading ||
    isLoadingRegistrations
  ) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  const event = data?.data;

  const handleRegister =
    async () => {
      try {
        const result =
          await registerEvent.mutateAsync(
            Number(id)
          );

        toast.success(
          result.message ||
            "Berhasil mendaftar event"
        );

        navigate(
          "/participant/my-events"
        );
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Gagal mendaftar event"
        );
      }
    };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
            >
              {event?.kategori}
            </span>

            {isRegistered && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-blue-700
                "
              >
                <CheckCircle size={14} />
                Sudah Terdaftar
              </span>
            )}
          </div>

          <h1
            className="
              mt-4
              text-2xl
              md:text-3xl
              font-bold
              text-slate-900
            "
          >
            {event?.nama}
          </h1>

          <p
            className="
              mt-3
              text-slate-600
              leading-relaxed
            "
          >
            {event?.deskripsi}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Info
              icon={<Tag size={18} />}
              label="Jenis Event"
              value={event?.jenis}
            />

            <Info
              icon={<Users size={18} />}
              label="Kuota"
              value={`${event?.kuota} Peserta`}
            />

            <Info
              icon={<MapPin size={18} />}
              label="Lokasi"
              value={event?.lokasi}
            />

            <Info
              icon={<Ticket size={18} />}
              label="HTM"
              value={`Rp ${Number(
                event?.htm || 0
              ).toLocaleString("id-ID")}`}
            />
          </div>

          <div
            className="
              mt-8
              pt-6
              border-t
              border-slate-100
            "
          >
            {isRegistered ? (
              <div
                className="
                  h-12
                  rounded-xl
                  bg-green-50
                  border
                  border-green-200
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-green-700
                  font-semibold
                "
              >
                <CheckCircle size={18} />
                Sudah Terdaftar
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={
                  registerEvent.isPending
                }
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  transition-colors
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {registerEvent.isPending
                  ? "Memproses..."
                  : "Daftar Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-green-50
          text-green-700
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-xs
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            font-medium
            text-slate-800
          "
        >
          {value || "-"}
        </p>
      </div>
    </div>
  );
}