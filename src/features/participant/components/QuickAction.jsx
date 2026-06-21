import { Link } from "react-router-dom";
import {
  Ticket,
  CreditCard,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";

export default function QuickAction() {
  const actions = [
    {
      title: "Lihat Event",
      desc: "Daftar & detail event",
      icon: Calendar,
      to: "/participant/events",
    },
    {
      title: "Pembayaran",
      desc: "Status & transaksi",
      icon: CreditCard,
      to: "/participant/payments",
    },
    {
      title: "Sertifikat",
      desc: "Sertifikat digital kamu",
      icon: Award,
      to: "/participant/certificates",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Aksi Cepat</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              to={item.to}
              className="
                group
                rounded-3xl
                border
                border-slate-200/70
                bg-white
                p-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon size={20} className="text-slate-700" />
                </div>

                <ChevronRight
                  size={18}
                  className="
                    text-slate-400
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">{item.title}</h3>

              <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
