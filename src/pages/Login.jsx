import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../util/index";
import logo from "../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await postData("/auth/login", { email, password });
      if (res.token) {
        localStorage.setItem("authToken", res.token);
        navigate("/dashboard"); 
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative">
        <span className="absolute top-2 right-2 text-gray-400 text-xl cursor-pointer">&times;</span>

        {/* Logo */}
        <img src={logo} alt="App Logo" className="w-45 h-40 mx-auto mb-6" style={{ clipPath: 'inset(0 0 0 5px)' }} />

        <h2 className="text-2xl font-bold text-black text-center mb-2">Welcome back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to your account</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
