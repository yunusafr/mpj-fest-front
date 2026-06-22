import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
} from "lucide-react";

import usePublicEvents from "@/hooks/usePublicEvents";
import useEventLeaderboard from "@/hooks/useEventLeaderboard";

export default function PublicEventPage() {
  const navigate = useNavigate();
  const festivalId = "all";

  const { events, loading } = usePublicEvents(festivalId);

  const safeEvents = Array.isArray(events) ? events : [];

  const activeEvents = useMemo(
    () => (safeEvents || []).filter((e) => e.voting_status === "open"),
    [safeEvents],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const selectedEvent = activeEvents[activeIndex];

  const { data: leaderboard } = useEventLeaderboard(selectedEvent?.id);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">Loading votings...</p>
        </div>
      </div>
    );
  }

  if (!safeEvents.length) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="card p-8 text-center">Tidak ada event tersedia</div>
      </section>
    );
  }

  if (!activeEvents.length) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="card p-8 text-center">Tidak ada event voting aktif</div>
      </section>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-br
        from-green-50
        via-white
        to-yellow-50
        px-4
        py-12
      "
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HERO */}
        <div className="card p-10 md:p-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-5">
            <Sparkles size={14} />
            Live Voting Platform
          </div>

          <h1 className=" mb-4">Daftar Event Voting</h1>

          <p>
            Pilih event aktif dan pantau leaderboard voting secara real-time.
          </p>
          {/* BACK */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="
              glass
              inline-flex
              items-center
              gap-2
              mb-1
              py-2
              rounded-2xl
              text-sm
              font-medium
              text-slate-600
              transition
              hover:text-green-600
            "
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* EVENT SWITCHER */}
        <div className="card">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
              disabled={activeIndex === 0}
              className="
              glass
              h-11
              w-11
              rounded-xl
              flex
              items-center
              justify-center
              disabled:opacity-40
              transition
            "
            >
              <ChevronLeft size={18} />
            </button>

            <div
              className="
              glass
              px-6
              py-3
              rounded-2xl
              font-semibold
              min-w-[220px]
              text-center
            "
            >
              {selectedEvent?.nama}
            </div>

            <button
              onClick={() =>
                setActiveIndex((p) => Math.min(activeEvents.length - 1, p + 1))
              }
              disabled={activeIndex === activeEvents.length - 1}
              className="
              glass
              h-11
              w-11
              rounded-xl
              flex
              items-center
              justify-center
              disabled:opacity-40
              transition
            "
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* LEADERBOARD */}
          <div className="flex flex-wrap justify-center gap-6">
            {leaderboard?.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="
        p-6
        text-center
        relative
        overflow-hidden
        w-full
        max-w-sm
        md:w-[300px]
      "
              >
                <div className="flex items-center justify-center gap-1 text-slate-700 font-black text-2xl">
                  <Trophy size={18} />#{index + 1}
                </div>

                <div className="flex justify-center mt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {item.registration?.user?.nama?.charAt(0)?.toUpperCase() ||
                      "?"}
                  </div>
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  {item.registration?.user?.nama}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.votes_count} votes
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EVENT LIST */}
        <div className="grid md:grid-cols-2 gap-5">
          {activeEvents.map((e) => (
            <div
              key={e.id}
              className="
                card
                group
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-green-700 transition">
                  {e.nama}
                </h3>

                <p className="text-sm text-slate-500">Voting aktif</p>
              </div>

              <button
                onClick={() => navigate(`/v/${e.slug}`)}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-green-500
                  text-white
                  font-semibold
                  hover:bg-green-600
                  transition
                "
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
