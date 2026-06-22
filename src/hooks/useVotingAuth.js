import { useState } from "react";
import { getGoogleLoginUrl } from "@/api/votingApi";

export default function useVotingAuth() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    localStorage.setItem("oauth_redirect", window.location.pathname);

    const res = await getGoogleLoginUrl();

    window.location.href = res.url;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("voting_user");
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return {
    login,
    logout,
    loading,
    isLoggedIn,
  };
}
