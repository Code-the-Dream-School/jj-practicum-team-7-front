import { useState, useEffect } from "react";
import { getData, postData } from "../util";

const ChallengeDetails = ({ challenge, onClose, currentUserId }) => {
  const [checkInData, setCheckInData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);

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
      </div>
    </div>
  );
};

export default ChallengeDetails;
