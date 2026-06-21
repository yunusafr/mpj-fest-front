import { useEffect, useState } from "react";
import { getPublicVoting } from "@/api/votingApi";

export default function usePublicVoting(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVoting = async () => {
    try {
      setLoading(true);
      const res = await getPublicVoting(slug);
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal load voting");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchVoting();
  }, [slug]);

  return { data, loading, error, refetch: fetchVoting };
}
