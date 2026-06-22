import { useState } from "react";
import { useParams } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useLeaderboard } from "../hooks/useLeaderboard";

export default function VotingLeaderboardPage() {
  const { eventId } = useParams();
  const [sort, setSort] = useState("votes");

  const { data, isLoading } = useLeaderboard(eventId, sort);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-9 w-9 border-2 border-slate-200 border-t-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const submissions = Array.isArray(data?.data?.submissions)
    ? data.data.submissions
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <Trophy size={12} />
              Voting Leaderboard
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Leaderboard Voting
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Ranking peserta berdasarkan jumlah vote
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Leaderboard</h2>
          <p className="text-sm text-slate-500 mt-1">
            Urutan peserta berdasarkan voting
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="p-16 text-center">
            <Trophy size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Belum ada data voting
            </h3>
            <p className="mt-2 text-slate-500">
              Data leaderboard akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Pesantren
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Vote
                  </th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        {index < 3 && (
                          <Trophy size={16} className="text-yellow-500" />
                        )}
                        <span className="font-medium">#{index + 1}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.registration?.user?.nama}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.registration?.user?.pesantren}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-emerald-600">
                      {item.votes_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
