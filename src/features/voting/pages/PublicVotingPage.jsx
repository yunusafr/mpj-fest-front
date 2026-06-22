import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  CalendarDays,
  Trophy,
  Users,
  UserCog,
  CreditCard,
  Vote,
  Award,
  ClipboardCheck,
  FileBarChart,
  Ticket,
  FileUp,
  CalendarCheck,
  FileText,
  Settings,
  ScanLine,
  Medal,
  Receipt,
} from "lucide-react";

import usePublicVoting from "@/hooks/usePublicVoting";
import useSubmitVote from "@/hooks/useSubmitVote";
import useVotingAuth from "@/hooks/useVotingAuth";

export default function PublicVotingPage() {
  const { slug } = useParams();

  const { data, loading, error, refetch } = usePublicVoting(slug);

  const { vote, loading: voteLoading } = useSubmitVote(slug);

  const { login, logout, loading: loginLoading, isLoggedIn } = useVotingAuth();

  const [page, setPage] = useState(1);
  const [votedId, setVotedId] = useState(null);

  const ITEMS_PER_PAGE = 8;

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.replace("/api/", "");

  const handleLogin = async () => {
    try {
      await login();

      toast.success("Login berhasil");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal login");
    }
  };

  const handleLogout = () => {
    logout();

    setVotedId(null);
    setPage(1);

    toast.success("Logout berhasil");
  };

  const handleVote = async (submissionId) => {
    try {
      await vote(submissionId);

      setVotedId(submissionId);

      toast.success("Vote berhasil diberikan");

      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Gagal memberikan vote");
    }
  };

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

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  const event = data || {};

  const { event_name, submissions = [], voting_status } = event;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedSubmissions = submissions.slice(startIndex, endIndex);

  const totalPages = Math.max(
    1,
    Math.ceil(submissions.length / ITEMS_PER_PAGE),
  );

  return (
    <section
      className="
      min-h-screen
      bg-gradient-to-br
      from-green-50
      via-white
      to-yellow-50
      py-12
      px-4
    "
    >
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <div className="card p-10 md:p-14 mb-8 text-center">
          <div className="mt-1">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border ${
                voting_status === "open"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    voting_status === "open" ? "bg-green-400" : "bg-red-400"
                  }`}
                />

                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    voting_status === "open" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </span>

              {voting_status === "open" ? "Voting Aktif" : "Voting Ditutup"}
            </span>
          </div>

          <h1 className="mb-4">{event_name}</h1>
          <p>Pilih karya favoritmu dan dukung peserta terbaik.</p>
          <div className="mt-4 flex justify-center">
            <Link
              to="/v"
              className="
        inline-flex
        items-center
        gap-2
        text-sm
        font-medium
        text-slate-500
        transition-colors
        hover:text-green-600
      "
            >
              <ArrowLeft size={16} />
              Kembali ke Daftar Event
            </Link>
          </div>
        </div>

        {/* AUTH CARD */}
        <div className="card p-8 mb-8 text-center">
          {isLoggedIn ? (
            <>
              <div className="flex justify-center mb-4">
                <div
                  className="
            h-20
            w-20
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
          "
                >
                  <ClipboardCheck size={40} className="text-green-600" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Anda Sudah Login
              </h3>

              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Akun Google berhasil terverifikasi. Sekarang Anda dapat
                memberikan vote pada karya favorit Anda.
              </p>

              <div
                className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          bg-green-50
          text-green-700
          border
          border-green-200
          mb-6
        "
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Status Login Aktif
              </div>

              <div>
                <button
                  onClick={handleLogout}
                  className="
            px-6
            py-3
            rounded-2xl
            bg-red-500
            text-white
            font-semibold
            hover:bg-red-600
            transition
          "
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <UserCog size={42} className="mx-auto text-green-600 mb-4" />

              <h3 className="text-2xl font-bold mb-2">Login Voting</h3>

              <p className="mb-6 text-slate-500">
                Login menggunakan akun Google untuk memberikan suara.
              </p>

              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="btn-primary"
              >
                {loginLoading ? "Loading..." : "Login dengan Google"}
              </button>
            </>
          )}
        </div>

        {/* CLOSED */}
        {voting_status !== "open" && (
          <div className="mb-8 text-center bg-red-50 text-red-600 p-5 rounded-3xl border border-red-200">
            Voting belum aktif atau sudah ditutup
          </div>
        )}

        {/* LIST */}
        {submissions.length === 0 ? (
          <div className="card p-12 text-center">
            <FileUp size={52} className="mx-auto text-slate-300 mb-4" />

            <h3 className="text-2xl font-bold mb-2">Belum Ada Karya</h3>

            <p>Peserta belum mengirimkan karya untuk event ini.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {paginatedSubmissions.map((item) => {
                const coverUrl = item.file_url
                  ? `${baseUrl}${item.file_url}`
                  : null;

                return (
                  <div
                    key={item.id}
                    className="
                    card
                    p-6
                    relative
                    overflow-hidden
                    group
                  "
                  >
                    {/* TOTAL VOTE */}
                    <div className="absolute top-5 right-5 z-10">
                      <div
                        className="
                        h-16
                        w-16
                        rounded-full
                        bg-gradient-to-br
                        from-green-500
                        to-green-700
                        text-white
                        flex
                        flex-col
                        items-center
                        justify-center
                        shadow-xl
                      "
                      >
                        <span className="text-lg font-black leading-none">
                          {item.votes_count}
                        </span>

                        <span className="text-[10px] uppercase">Vote</span>
                      </div>
                    </div>

                    {/* COVER */}
                    <div className="w-full h-56 rounded-2xl mb-5 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt="Cover karya"
                          className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <FileUp
                            size={40}
                            className="mx-auto text-slate-400"
                          />

                          <p>Tidak ada cover</p>
                        </div>
                      )}
                    </div>

                    {/* PESERTA */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-green-100
                        font-bold
                        text-green-700
                      "
                      >
                        {item.registration?.user?.nama
                          ?.charAt(0)
                          ?.toUpperCase() || "?"}
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {item.registration?.user?.nama}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {item.registration?.user?.pesantren || "-"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(item.id)}
                      disabled={
                        !isLoggedIn ||
                        voteLoading ||
                        voting_status !== "open" ||
                        votedId === item.id
                      }
                      className={`w-full mt-3 py-3 rounded-2xl font-semibold transition ${
                        votedId === item.id
                          ? "bg-green-500 text-white"
                          : "btn-primary"
                      }`}
                    >
                      {votedId === item.id ? "Sudah Vote" : "Vote Sekarang"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="
                  glass
                  px-4
                  py-2
                  rounded-xl
                  disabled:opacity-50
                "
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`
                      w-11
                      h-11
                      rounded-xl
                      font-semibold
                      transition
                      ${
                        page === index + 1
                          ? "bg-green-500 text-white shadow-lg"
                          : "glass"
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="
                  glass
                  px-4
                  py-2
                  rounded-xl
                  disabled:opacity-50
                "
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
