import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../util";
import ChallengeDetailsModal from "../components/ChallengeDetails";

const Dashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await getData("/challenges");
      setChallenges(response.challenges);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
      setError("Failed to load challenges");
      setLoading(false);
    }
  };

  const openChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
    // Refresh challenges when modal closes to get updated status
    fetchChallenges();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Challenges</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              onClick={() => openChallengeModal(challenge)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition duration-200 cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {challenge.title}
              </h3>
              <p className="text-gray-600 mb-3 capitalize">
                {challenge.category}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  challenge.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : challenge.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : challenge.status === "active"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {challenge.status}
              </span>
            </div>
          ))}
        </div>

        {challenges.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-lg mb-4">No challenges yet!</p>
            <Link
              to="/challenge/new"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Create Your First Challenge
            </Link>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedChallenge && (
          <ChallengeDetailsModal
            challenge={selectedChallenge}
            onClose={closeModal}
          />
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
