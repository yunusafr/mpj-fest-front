// biasanya tidak wajib di Next.js terbaru
import React from "react";

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "rgba(34,197,94,.15)",
}) {
  return (
    <div className="card p-6 relative overflow-hidden">
      {/* top accent line */}
      <div className="absolute left-0 top-0 h-1 w-full" />

      {/* header row (title + icon) */}
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{title}</p>

        {Icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: iconColor,
              color: "#064622",
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      {/* value */}
      <h3
        className="mt-3 text-4xl font-black tracking-tight"
        style={{ color: "#064622" }}
      >
        {value}
      </h3>

      {/* description */}
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}