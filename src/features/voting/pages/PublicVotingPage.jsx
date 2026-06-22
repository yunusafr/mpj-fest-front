import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

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
      <div className="min-h-screen flex items-center justify-center">
        Loading voting...
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
    <div className="max-w-6xl mx-auto px-6 py-14">
      {/* HERO */}
      <div className="card p-10 mb-8 text-center">
        <h1 className="mt-4 text-5xl font-black">{event_name}</h1>

        <p>Pilih karya favoritmu dan dukung peserta terbaik.</p>

        <div className="mt-6">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
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

            {voting_status === "open" ? "Voting Active" : "Voting Closed"}
          </span>
        </div>
      </div>

      {/* LOGIN STATUS */}
      {isLoggedIn && (
        <div className="glass rounded-3xl p-4 mb-8 flex justify-between items-center">
          <span className="text-green-600 font-medium">
            ✔ Anda sudah login untuk voting
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      )}

      {/* LOGIN */}
      {!isLoggedIn && (
        <div className="card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Login Voting</h3>

          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="btn-primary"
          >
            {loginLoading ? "Loading..." : "Login dengan Google"}
          </button>
        </div>
      )}

      {/* CLOSED */}
      {voting_status !== "open" && (
        <div className="mb-8 text-center bg-red-50 text-red-600 p-4 rounded-2xl">
          Voting belum aktif atau sudah ditutup
        </div>
      )}

      {/* LIST */}

      {submissions.length === 0 ? (
        <div className="card p-10 text-center">
          <FileUp size={40} className="mx-auto text-slate-400" />

          <h3 className="text-xl font-bold mb-2">Belum Ada Karya</h3>

          <p>Peserta belum mengirimkan karya.</p>
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
                  className="card p-6 relative overflow-hidden"
                >
                  {/* TOTAL VOTE BADGE */}
                  <div className="absolute top-4 right-4">
                    <div className="h-16 w-16 rounded-full bg-green-500 text-white flex flex-col items-center justify-center shadow-lg">
                      <span className="text-lg font-black leading-none">
                        {item.votes_count}
                      </span>

                      <span className="text-[10px] uppercase">Vote</span>
                    </div>
                  </div>
                  <div className="w-full h-56 rounded-xl mb-5 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt="Cover karya"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <FileUp size={40} className="mx-auto text-slate-400" />

                        <p>Tidak ada cover</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                      {item.registration?.user?.nama
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {item.registration?.user?.nama}
                      </h3>

                      <p className="text-sm text-gray-500">
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
                    className={`w-full mt-6 py-3 rounded-2xl font-semibold transition ${
                      votedId === item.id
                        ? "bg-green-500 text-white"
                        : "btn-primary"
                    }`}
                  >
                    {votedId === item.id ? "✓ Sudah Vote" : "Vote Sekarang"}
                  </button>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-xl disabled:opacity-50"
              >
                ← Prev
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`w-10 h-10 rounded-xl ${
                      page === index + 1 ? "bg-green-500 text-white" : "border"
                    }`}
                  >
                    {index + 1}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-xl disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
