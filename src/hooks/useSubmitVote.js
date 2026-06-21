import { useState } from "react";
import { submitVote } from "@/api/votingApi";

export default function useSubmitVote(slug) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const vote = async (submissionId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await submitVote(slug, {
        submission_id: submissionId,
        fingerprint: navigator.userAgent,
      });

      return res;
    } catch (err) {
      setError(err?.response?.data?.message || "Vote gagal");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { vote, loading, error };
}
