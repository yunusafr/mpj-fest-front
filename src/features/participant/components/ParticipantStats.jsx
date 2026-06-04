import StatCard from "@/components/dashboard/StatCard";
import { Calendar, CreditCard, Award } from "lucide-react";

export default function ParticipantStats() {
  const stats = [
    {
      title: "Event Saya",
      value: "0",
      icon: Calendar,
      color: "rgba(34,197,94,.15)",
    },
    {
      title: "Pembayaran",
      value: "0",
      icon: CreditCard,
      color: "rgba(234,179,8,.15)",
    },
    {
      title: "Sertifikat",
      value: "0",
      icon: Award,
      color: "rgba(59,130,246,.12)",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <StatCard
            key={i}
            title={item.title}
            value={item.value}
            description={
              <div className="mt-4 flex items-center gap-3">
                {/* ICON tetap ada, tapi jadi part of description area */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                  "
                  style={{
                    background: item.color,
                    color: "#064622",
                  }}
                >
                  <Icon size={18} />
                </div>

                <span className="text-sm text-slate-500">
                  Total {item.title.toLowerCase()}
                </span>
              </div>
            }
          />
        );
      })}
    </div>
  );
}