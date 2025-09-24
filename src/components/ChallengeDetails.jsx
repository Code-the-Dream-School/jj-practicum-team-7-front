import { useState, useEffect } from "react";
import { getData, postData, deleteData } from "../util";
import ChallengeLeaderboard from "./ChallengeLeaderboard";

const ChallengeDetails = ({ challenge, onClose, currentUserId }) => {
  const [checkInData, setCheckInData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCheckIns = async () => {
    if (!challenge?._id) return;
    setLoading(true);
    try {
      const res = await getData(`/challenges/${challenge._id}/checkins`);
      setCheckInData(res);
    } catch (err) {
      console.error("Error fetching check-ins", err);
      setCheckInData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, [challenge?._id]);

  const handleCheckIn = async () => {
    if (!challenge?._id) return;
    setCheckInLoading(true);
    try {
      await postData(`/challenges/${challenge._id}/checkins`);
      await fetchCheckIns();
    } catch (err) {
      console.error("Error checking in", err);
    } finally {
      setCheckInLoading(false);
    }
  };

  if (!challenge) return null;

  // Determine if the user can check in today
  const canCheckIn =
    !checkInData || // First-time user
    checkInData.currentDay === 0 || // New challenge start
    !checkInData.checkedDays?.includes(checkInData.currentDay);

  // Show current day as 1 if 0
  const displayCurrentDay =
    checkInData?.currentDay > 0 ? checkInData.currentDay : 1;

  const challengeEnded =
    challenge.status === "completed" || challenge.status === "failed";

  // Create an array of days for the challenge duration
  const daysArray = Array.from({ length: challenge.duration }, (_, i) => i + 1);

  const gradients = [
    "from-pink-500 to-yellow-500",
    "from-green-400 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-indigo-500 to-teal-400",
    "from-orange-400 to-red-500",
    "from-blue-400 to-cyan-500",
  ];

  const getGradient = (username) => {
    if (!username) return gradients[0];
    const hash = [...username].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return gradients[hash % gradients.length];
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, { id: Date.now(), text: newComment }]);
    setNewComment("");
  };

  const handleDeleteChallenge = async () => {
    if (!challenge?._id) return;
    try {
      await deleteData(`/challenges/${challenge._id}`);
      console.log("Challenge deleted or user left:", challenge._id);
      setShowDeleteModal(false);
      onClose();
    } catch (err) {
      console.error("Error deleting challenge", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen z-50 p-4">
      {/* Gradient background & blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"></div>
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>

      {/* Inner glassy card */}
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-tr from-green-400/20 via-transparent to-blue-400/20 pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div>
            {/* Title with optional edit icon */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-black">
                {challenge.title}
              </h2>
              {/* Show edit icon only if user is creator */}
              {challenge.createdBy === currentUserId && (
                <button
                  onClick={() => console.log("Edit challenge clicked")}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Edit Challenge Title"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 010 2.828L8.828 14H6v-2.828l8.586-8.586a2 2 0 012.828 0z" />
                    <path
                      fillRule="evenodd"
                      d="M4 16h12a1 1 0 110 2H4a1 1 0 110-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm mt-1">
              {challengeEnded
                ? "Past Challenge"
                : checkInData
                ? `Day ${displayCurrentDay} of ${challenge.duration}`
                : ""}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-gray-400 text-2xl hover:text-gray-600 transition"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <hr className="border-gray-300 border mt-2 mb-4" />

        {/* Participants */}
        <div className="mb-6 relative z-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Participants
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {challenge.participant?.slice(0, 5).map((p) => {
              const initials = p.username
                ? p.username.slice(0, 2).toUpperCase()
                : "?";
              return (
                <div
                  key={p._id}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${getGradient(
                    p.username
                  )} text-white font-bold shadow-md relative group cursor-pointer`}
                >
                  {initials}
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {p.username}
                  </span>
                </div>
              );
            })}

            {challenge.participant?.length > 5 && (
              <button
                onClick={() => setShowAllParticipants(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold shadow-inner cursor-pointer"
              >
                +{challenge.participant.length - 5}
              </button>
            )}

            <button
              onClick={() => console.log("Open edit participants modal")}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-gray-500 hover:border-gray-600 hover:text-gray-700 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Participants modal */}
        {showAllParticipants && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            onClick={() => setShowAllParticipants(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">All Participants</h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {challenge.participant?.map((p) => (
                  <li
                    key={p._id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r ${getGradient(
                        p.username
                      )} text-white font-bold`}
                    >
                      {p.username ? p.username[0].toUpperCase() : "?"}
                    </div>
                    <span>{p.username}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowAllParticipants(false)}
                className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <hr className="border-gray-300 border mt-2 mb-4" />

        {/* Status indicators */}
        <div className="flex justify-between mb-6 px-2 relative z-10">
          <div className="flex items-center">
            <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-200 mr-2"></div>
            <span className="text-sm text-gray-600">Check In</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 flex items-center justify-center rounded-full bg-green-600  mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Checked In</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 flex items-center justify-center rounded-full bg-red-400  mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Missed</span>
          </div>
        </div>

        {/* Progress tracking */}
        <div className="mb-6 relative z-10">
          {loading ? (
            <p className="text-gray-500 text-center">Loading progress...</p>
          ) : checkInData ? (
            <div className="grid grid-cols-10 gap-2 justify-center mb-4">
              {daysArray.map((day) => {
                const isChecked = checkInData.checkedDays?.includes(day);
                const isMissed = checkInData.missedDays?.includes(day);
                const isCurrent = day === displayCurrentDay;
                const isFutureDay = day > displayCurrentDay;

                return (
                  <div key={day} className="flex flex-col items-center">
                    <div className={`text-xs font-medium mb-1 text-green-600`}>
                      {day}
                    </div>
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border-2 ${
                        isChecked
                          ? "bg-green-600 text-white"
                          : isMissed
                          ? "bg-red-400 text-white"
                          : isCurrent
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : isFutureDay
                          ? "bg-gray-200 border-gray-300 text-gray-600"
                          : "bg-gray-100 border-gray-200 text-gray-600"
                      }`}
                    >
                      {isChecked ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : isMissed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No progress yet.</p>
          )}
        </div>

        {/* Check In Button */}
        <button
          onClick={handleCheckIn}
          disabled={!canCheckIn || checkInLoading || challengeEnded}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition mb-6 relative z-10 ${
            canCheckIn && !checkInLoading && !challengeEnded
              ? "bg-green-600 text-white hover:bg-green-700 hover:scale-[1.01] shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {checkInLoading
            ? "Checking in..."
            : challengeEnded
            ? challenge.status === "completed"
              ? "Challenge Completed"
              : "Challenge Failed"
            : canCheckIn
            ? "Check In Today"
            : "Already Checked In"}
        </button>

        <hr className="border-gray-300 border mt-2 mb-4" />

        {/* Leaderboard Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Leaderboard
          </h3>
          <ChallengeLeaderboard challengeId={challenge._id} />
        </div>

        {/* Delete Challenge */}
        {challenge.createdBy === currentUserId && (
          <div className="mb-6 flex justify-center">
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}
                className="text-red-400 hover:underline"
              >
                Delete Challenge
              </a>
            </p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this challenge?
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteChallenge}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;
