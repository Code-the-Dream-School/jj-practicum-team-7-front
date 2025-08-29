import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../util/index";


const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Invalid password format: must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending register request:", { username: name.trim(), email: email.trim().toLowerCase(), password });
      const res = await postData("/auth/register", {
        username: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      console.log("Register response:", res);

      if (res.success) {
        console.log("Registration successful, redirecting to /login");
        navigate("/login", { replace: true });
      } else {
        setError("Registration failed: No success response from server");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(
        errorMessage.includes("email")
          ? "Email already registered"
          : errorMessage.includes("username")
          ? "Username already taken"
          : errorMessage.includes("password")
          ? "Invalid password format: must be at least 6 characters long"
          : errorMessage.includes("required")
          ? "Username, email, and password are required"
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };
const handleGoogleLogin = () => {
    console.log("Initiating Google login");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`;
  };
  
   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative">
          <span className="absolute top-2 right-2 text-gray-400 text-xl cursor-pointer">&times;</span>

          <h2 className="text-2xl font-bold text-black text-center mb-2">Join the Quest</h2>
          <p className="text-gray-600 text-center mb-4">Create your PeerQuests account</p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username / Nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Start now"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="mt-4 text-center text-sm text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
  );
};


export default Register;
