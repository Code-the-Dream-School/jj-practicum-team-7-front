import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', { email, password });
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  
return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
        {/* Close Button */}
        <span className="absolute top-2 right-2 text-gray-400 text-xl cursor-pointer">&times;</span>

        {/* Friendly Title */}
        <h2 className="text-2xl font-bold text-black text-center">Welcome back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="loginEmail" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="loginEmail"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="text-left">
            <label htmlFor="loginPassword" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="loginPassword"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition mt-4"
          >
            Sign in
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