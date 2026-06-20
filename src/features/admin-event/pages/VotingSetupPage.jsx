import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVotingConfig } from "../hooks/useVotingConfig";
import { useSetupVoting } from "../hooks/useSetupVoting";
import { toast } from "sonner";
import { Copy } from "lucide-react";


export default function VotingSetupPage() {
  const { eventId } = useParams();

  const { data, isLoading } = useVotingConfig(eventId);
  const mutation = useSetupVoting(eventId);
  

  const [form, setForm] = useState({
    waktu_buka: "",
    waktu_tutup: "",
    batas_voting: 1,
  });

  useEffect(() => {
    if (data?.voting) {
      setForm({
        waktu_buka: data.voting.waktu_buka?.slice(0, 16).replace(" ", "T") || "",
        waktu_tutup: data.voting.waktu_tutup?.slice(0, 16).replace(" ", "T") || "",
        batas_voting: data.voting.batas_voting || 1,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(form, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

const slug = data?.slug;
const publicLink = slug ? `${window.location.origin}/v/${slug}` : null;

  return (
    <div className="max-w-3xl space-y-6">

      {/* HEADER */}
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-xl font-bold">Voting Setup</h1>
        <p className="text-sm text-slate-500">
          Atur periode dan batas voting publik
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-6 space-y-4"
      >
        <div>
          <label className="text-sm font-medium">Waktu Buka</label>
          <input
            type="datetime-local"
            className="w-full border rounded-xl p-3"
            value={form.waktu_buka}
            onChange={(e) =>
              setForm({ ...form, waktu_buka: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">Waktu Tutup</label>
          <input
            type="datetime-local"
            className="w-full border rounded-xl p-3"
            value={form.waktu_tutup}
            onChange={(e) =>
              setForm({ ...form, waktu_tutup: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">Batas Vote</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded-xl p-3"
            value={form.batas_voting}
            onChange={(e) =>
              setForm({ ...form, batas_voting: e.target.value })
            }
          />
        </div>

        <button
          disabled={mutation.isPending}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold"
        >
          Simpan Pengaturan
        </button>
      </form>

      {/* PUBLIC LINK */}
      {publicLink && (
        <div className="rounded-2xl border bg-white p-6 space-y-3">
          <h2 className="font-semibold">Link Voting Publik</h2>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
            <span className="text-sm font-mono break-all">
              {publicLink}
            </span>

            <button
              onClick={() => {
                navigator.clipboard.writeText(publicLink);
                toast.success("Link disalin");
              }}
              className="p-2 hover:bg-slate-200 rounded-lg"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}