import { useState } from "react";
import { getGoogleLoginUrl } from "@/api/votingApi";

export default function useVotingAuth() {
  const [loading, setLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = async () => {
    localStorage.setItem("oauth_redirect", window.location.pathname);

    const res = await getGoogleLoginUrl();

    window.location.href = res.url;
  };

  const logout = () => {
    localStorage.setItem("oauth_redirect", window.location.pathname);

    localStorage.removeItem("token");
    localStorage.removeItem("voting_user");

    setLoggedIn(false);
  };

  return {
    login,
    logout,
    loading,
    isLoggedIn: loggedIn,
    setLoggedIn,
  };
}
