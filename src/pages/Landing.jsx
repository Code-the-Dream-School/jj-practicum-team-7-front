import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        🚀 Landing Page is coming soon...
      </h1>
      
      <Link
        to="/login"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Landing;
