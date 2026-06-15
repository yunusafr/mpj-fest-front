import { FileText } from "lucide-react";

export default function InfoCard({ label, value }) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:-translate-y-0.5 transition">
      
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition">
        <FileText size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 font-semibold text-slate-800 truncate">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}