import { CheckCircle2 } from "lucide-react";

export default function StatusBadge({ statusConfig, status }) {
  const current =
    statusConfig[status] || {
      text: "Belum Diketahui",
      className: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
    };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${current.className}`}
    >
      <CheckCircle2 size={14} />
      {current.text}
    </span>
  );
}