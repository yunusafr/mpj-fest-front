import { Link } from "react-router-dom";

export default function EventCard({
  event,
}) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="
      block

      rounded-3xl

      border

      bg-white

      p-6

      transition

      hover:shadow-lg
      "
    >
      <h3
        className="
        text-lg
        font-bold
        "
      >
        {event.nama}
      </h3>

      <p
        className="
        mt-2
        text-slate-500
        "
      >
        {event.kategori}
      </p>

      <div className="mt-4">
        <span
          className="
          rounded-full
          bg-green-100
          px-3
          py-1
          text-sm
          "
        >
          {event.jenis}
        </span>
      </div>

      <div className="mt-4">
        HTM:
        {" "}
        Rp
        {Number(
          event.htm
        ).toLocaleString()}
      </div>
    </Link>
  );
}