import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");
    const email = params.get("email");

    if (token) {
      // Store token & user info
      localStorage.setItem("authToken", token);
      if (username) localStorage.setItem("username", username);
      if (email) localStorage.setItem("email", email);

      // Delay navigate by a tick to ensure React has applied state changes
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 50);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-lg">Signing you in with Google...</p>
    </div>
  );
};

export default OAuthSuccess;
