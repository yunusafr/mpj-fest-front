export default function EventTypeBadge({ type }) {
  const config = {
    lomba: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    non_lomba: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
  };

  const className =
    config[type] ||
    "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

  const formatLabel =
    typeof type === "string"
      ? type
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())
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