import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  Users,
  CheckCircle,
  MapPin,
  Clock,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { useAttendance } from "../hooks/useAttendance";

export default function AttendanceDetailPage() {
  const { eventId } =
    useParams();

  const [searchParams] =
    useSearchParams();

  const festivalId =
    searchParams.get(
      "festival_id"
    );

  const {
    data,
    isLoading,
  } = useAttendance(
    eventId,
    festivalId
  );

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">
            Loading attendance...
          </p>
        </div>
      </div>
    );
  }

  const event = data?.event;
  const attendances = data?.data || [];
  const totalHadir = data?.total_hadir || 0;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-emerald-50
                px-3 py-1
                text-xs
                font-semibold
                text-emerald-700
                ring-1
                ring-emerald-200
              "
            >
              <Sparkles size={12} />
              Attendance Detail
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              {event?.nama}
            </h1>

            <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {event?.lokasi}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {event?.kategori}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                {event?.waktu_mulai}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Attendance Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-900">
            Daftar Kehadiran
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Seluruh peserta yang telah melakukan scan QR
          </p>
        </div>

        {attendances.length === 0 ? (
          <div className="p-16 text-center">
            <Users
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-900">
              Belum ada peserta hadir
            </h3>

            <p className="mt-2 text-slate-500">
              Data kehadiran akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Peserta
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    NIAM
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Petugas Scan
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Waktu Scan
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendances.map((attendance) => {
                  const peserta =
                    attendance?.registration?.user;

                  return (
                    <tr
                      key={attendance.id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              h-10
                              w-10
                              rounded-full
                              bg-emerald-100
                              flex
                              items-center
                              justify-center
                              text-sm
                              font-semibold
                              text-emerald-700
                            "
                          >
                            {peserta?.nama?.charAt(0)}
                          </div>

                          <div>
                            <div className="font-medium text-slate-900">
                              {peserta?.nama}
                            </div>

                            <div className="text-sm text-slate-500">
                              {peserta?.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {peserta?.niam}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {attendance?.scanner?.nama}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {attendance?.scanned_at}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}