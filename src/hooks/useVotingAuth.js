import { useState } from "react";
import { loginVoting } from "@/api/votingApi";

export default function useVotingAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginVoting(email);

      localStorage.setItem("token", res.token);
      localStorage.setItem("voting_user", JSON.stringify(res.user));

      return res;
    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("voting_user");
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return { login, logout, loading, error, isLoggedIn };
}
