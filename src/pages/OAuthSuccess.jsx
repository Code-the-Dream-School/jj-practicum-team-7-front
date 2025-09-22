import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setOAuthUser = useAuthStore((state) => state.setOAuthUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");
    const email = params.get("email");
    if (token && username && email) {
      setOAuthUser({
        user: { username, email },
        token,
      });
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, setOAuthUser]);

  return <div>Loading...</div>;
};

export default OAuthSuccess;
