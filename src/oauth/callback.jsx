import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const redirectUrl = localStorage.getItem("oauth_redirect") || "/";

      localStorage.removeItem("oauth_redirect");

      navigate(redirectUrl);
    } else {
      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
}
