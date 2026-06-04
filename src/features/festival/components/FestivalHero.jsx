export default function FestivalHero({
  festival,
}) {
  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-green-600
      to-yellow-500

      text-white

      p-8
      "
    >
      <p className="text-sm opacity-80">
        Festival Aktif
      </p>

      <h1
        className="
        text-4xl
        font-black
        mt-2
        "
      >
        {festival.nama}
      </h1>

      <p className="mt-4">
        {festival.lokasi}
      </p>

      <p className="mt-2 text-sm">
        {festival.tanggal_mulai}
        {" - "}
        {festival.tanggal_selesai}
      </p>
    </div>
  );
}