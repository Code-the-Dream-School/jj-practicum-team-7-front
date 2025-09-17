import { useState, useEffect } from "react";
import { getData, postData } from "../util";

const ChallengeDetails = ({ challenge, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen z-50">
      {/* Gradient background & blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"></div>
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>

      {/* Inner glassy card */}
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-tr from-green-400/20 via-transparent to-blue-400/20 pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-gray-600 transition z-10"
        >
          &times;
        </button>

        {/* Challenge title and description */}
        <h2 className="text-2xl font-bold text-black text-center mb-2 relative z-10">
          {challenge.title}
        </h2>
        <p className="text-gray-600 text-center mb-6 relative z-10">
          {challenge.description}
        </p>

        {/* Check In Button */}
        <button
          onClick={handleCheckIn}
          disabled={!canCheckIn || checkInLoading || challengeEnded}
          className={`w-full py-3 rounded-xl font-semibold transition mb-6 relative z-10 ${
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

        {/* Progress tracking */}
        <div className="mt-4 relative z-10">
          {loading ? (
            <p className="text-gray-500">Loading progress...</p>
          ) : checkInData ? (
            <>
              <p className="mb-2 text-center">
                <span className="font-semibold">Current Day:</span>{" "}
                {displayCurrentDay}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from(
                  { length: challenge.duration },
                  (_, i) => i + 1
                ).map((day) => {
                  const isChecked = checkInData.checkedDays?.includes(day);
                  const isMissed = checkInData.missedDays?.includes(day);
                  return (
                    <div
                      key={day}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                        isChecked
                          ? "bg-green-500 text-white"
                          : isMissed
                          ? "bg-red-400 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">No progress yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
