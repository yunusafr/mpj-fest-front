import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // redirect ke dashboard / home
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}
