export default function StatusBadge({
  status,
}) {
  const styles = {
    settlement:
      "bg-green-100 text-green-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    expire:
      "bg-red-100 text-red-700",

    cancel:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}