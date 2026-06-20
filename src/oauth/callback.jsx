import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

useEffect(() => {
  const hash = window.location.hash;
  const token = new URLSearchParams(hash.replace("#", "")).get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.location.replace("/");
  } else {
    window.location.replace("/login");
  }
}, []);

  return <div>Logging in...</div>;
}