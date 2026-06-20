import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

export default function PublicVotingPage() {
  const { slug } = useParams();
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("token");
  const handleGoogleLogin = async () => {
  const res = await axios.get("/auth/google");
  window.location.href = res.data.url;
};
const isLoggedIn = !!token;

  const queryClient = useQueryClient();

  // =========================
  // FETCH DATA VOTING
  // =========================
  const { data, isLoading } = useQuery({
    queryKey: ["public-voting", slug],
    queryFn: async () => {
      const res = await axios.get(`/voting/${slug}`);
      return res.data.data;
    },
    enabled: !!slug,
  });

  // =========================
  // MUTATION VOTE
  // =========================
  const voteMutation = useMutation({
    mutationFn: (submission_id) =>
      axios.post(`/voting/${slug}/vote`, {
        submission_id,
        fingerprint: "web",
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      }),
  });

  // =========================
  // HANDLE VOTE
  // =========================
  const handleVote = (id) => {
    setLoadingId(id);

    voteMutation.mutate(id, {
      onSuccess: (res) => {
        toast.success(res.data.message);

        // optional refresh (kalau belum pakai optimistic update)
        queryClient.invalidateQueries({
          queryKey: ["public-voting", slug],
        });
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Gagal vote"
        );
      },
      onSettled: () => {
        setLoadingId(null);
      },
    });
  };

  // =========================
  // LOADING STATE
  // =========================
  if (isLoading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading voting...
      </div>
    );
  }

  // =========================
  // SAFE GUARD
  // =========================
  if (!data) {
    return (
      <div className="p-6 text-center text-red-500">
        Data voting tidak ditemukan
      </div>
    );
  }

  const {
    submissions = [],
    remaining_votes = 0,
    voting_status = "closed",
    has_voted = false,
  } = data;

  // =========================
  // RULE ENGINE
  // =========================
const canVote =
  isLoggedIn &&
  voting_status === "open" &&
  remaining_votes > 0 &&
  !has_voted;

  // =========================
  // UI
  // =========================
  return (
    <div className="space-y-4 p-6">
      
      {/* STATUS BAR */}
      <div className="rounded-xl border p-3 text-sm text-slate-600">
        Sisa vote:{" "}
        <b className="text-slate-900">{remaining_votes}</b>
        {" | "}
        Status: <b>{voting_status}</b>
      </div>
      {!isLoggedIn && (
  <div className="p-4 bg-white border rounded-xl">
    <p className="text-sm text-slate-600 mb-2">
      Kamu harus login untuk vote
    </p>

    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-red-500 text-white rounded-xl"
    >
      Login dengan Google
    </button>
  </div>
)}

      {/* LIST SUBMISSION */}
      {submissions.length === 0 ? (
        <div className="text-center text-slate-500">
          Belum ada karya
        </div>
      ) : (
        submissions.map((item, index) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl bg-white"
          >
            {/* RANK */}
            <div className="text-xs text-slate-400">
              #{index + 1}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold">
              {item.judul_karya}
            </h3>

            {/* VOTE COUNT */}
            <p className="text-sm text-slate-500">
              Vote: {item.votes_count}
            </p>

            {/* BUTTON */}
            <button
              disabled={
                !canVote || loadingId === item.id
              }
              onClick={() => handleVote(item.id)}
              className="
                mt-2 px-4 py-2
                bg-emerald-600 text-white
                rounded-xl
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loadingId === item.id
                ? "Voting..."
                : "Vote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}