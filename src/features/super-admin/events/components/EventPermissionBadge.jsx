export default function EventPermissionBadge({ permission }) {
  const config = {
    aktif: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    umum: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    semua: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  };

  const className =
    config[permission] ||
    "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  const formatLabel =
    typeof permission === "string"
      ? permission
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "-";

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${className}
      `}
    >
      {formatLabel}
    </span>
  );
}