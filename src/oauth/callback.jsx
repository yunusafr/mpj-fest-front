import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    console.log("TOKEN =", token);

    if (token) {
      localStorage.setItem("token", token);

      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
}
