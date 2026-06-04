import { Link } from "react-router-dom";
import { Ticket, CreditCard, Calendar } from "lucide-react";

export default function QuickAction() {
  const actions = [
    {
      title: "Lihat Event",
      desc: "Daftar & detail event",
      icon: Calendar,
      to: "/participant/events",
      color: "rgba(34,197,94,.15)",
    },
    {
      title: "Pembayaran",
      desc: "Status & transaksi",
      icon: CreditCard,
      to: "/participant/payments",
      color: "rgba(234,179,8,.15)",
    },
    {
      title: "E-Ticket",
      desc: "Tiket digital kamu",
      icon: Ticket,
      to: "/participant/tickets",
      color: "rgba(59,130,246,.12)",
    },
  ];

  return (
    <div
      className="
        card
        p-6
      "
    >
      <h2 className="text-lg font-semibold mb-6">
        Aksi Cepat
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              to={item.to}
              className="
                relative
                overflow-hidden

                rounded-2xl

                border
                border-white/60

                bg-white/70

                p-6

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              {/* glow */}
              <div
                className="
                  absolute
                  -right-6
                  -top-6

                  h-20
                  w-20

                  rounded-full

                  blur-2xl
                "
                style={{
                  background: item.color,
                }}
              />

              <div className="relative z-10">
                <div
                  className="
                    mb-4
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-green-50

                    text-green-600
                  "
                >
                  <Icon size={18} />
                </div>

                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}