export default function EventFilter({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Cari event..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="
        w-full
        h-12

        rounded-2xl
        border

        px-4

        focus:outline-none
        focus:ring-2
        focus:ring-green-500
      "
    />
  );
}