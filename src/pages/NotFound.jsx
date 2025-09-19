import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 relative">
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center relative z-10">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
          <p className="text-lg text-gray-600 mb-6">Page not found</p>

          <p className="text-sm text-gray-500 mb-6">
            Looks like the page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl border border-gray-200 shadow-sm bg-white hover:scale-[1.01] transition"
            >
              Go back
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-xl bg-green-600 text-white shadow-md hover:bg-green-700 transition"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
