import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

export default function PublicVotingPage() {
  const { slug } = useParams();
  const [loadingId, setLoadingId] = useState(null);
  const queryClient = useQueryClient();

  const isLoggedIn = !!localStorage.getItem("token");

const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}auth/google`;
};

  const { data, isLoading } = useQuery({
    queryKey: ["public-voting", slug],
    queryFn: async () => {
      const res = await axios.get(`/voting/${slug}`);
      return res.data.data;
    },
    enabled: !!slug,
  });

  const voteMutation = useMutation({
    mutationFn: (submission_id) =>
      axios.post(`/voting/${slug}/vote`, {
        submission_id,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      }),
  });

  const handleVote = (id) => {
    setLoadingId(id);

    voteMutation.mutate(id, {
      onSuccess: (res) => {
        toast.success(res.data.message);

        queryClient.invalidateQueries({
          queryKey: ["public-voting", slug],
        });
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Gagal vote");
      },
      onSettled: () => {
        setLoadingId(null);
      },
    });
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading voting...</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-red-500">Data tidak ditemukan</div>;
  }

  const {
    submissions = [],
    remaining_votes = 0,
    voting_status = "closed",
    has_voted = false,
  } = data;

  const canVote =
    isLoggedIn &&
    voting_status === "open" &&
    remaining_votes > 0 &&
    !has_voted;

  return (
    <div className="space-y-4 p-6">

      <div className="border p-3 rounded-xl text-sm">
        Sisa vote: <b>{remaining_votes}</b> | Status: <b>{voting_status}</b>
      </div>

      {!isLoggedIn && (
        <div className="p-4 border rounded-xl">
          <p className="mb-2">Harus login untuk vote</p>
          <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Login Google
          </button>
        </div>
      )}

      {submissions.length === 0 ? (
        <div className="text-center text-slate-500">Belum ada karya</div>
      ) : (
        submissions.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-xl">
            <div className="text-xs">#{index + 1}</div>
            <h3 className="font-semibold">{item.judul_karya}</h3>
            <p className="text-sm">Vote: {item.votes_count}</p>

            <button
              disabled={!canVote || loadingId === item.id}
              onClick={() => handleVote(item.id)}
              className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl disabled:opacity-50"
            >
              {loadingId === item.id ? "Voting..." : "Vote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}