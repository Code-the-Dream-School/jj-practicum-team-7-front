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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        {/* Challenge title */}
        <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
        <p className="text-gray-600 mb-6">{challenge.description}</p>

        {/* Check In Button */}
        <button
          onClick={handleCheckIn}
          disabled={!canCheckIn || checkInLoading}
          className={`w-full py-3 rounded-lg font-semibold transition mb-6 ${
            canCheckIn && !checkInLoading
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {checkInLoading
            ? "Checking in..."
            : canCheckIn
            ? "Check In Today"
            : "Already Checked In"}
        </button>

        {/* Progress tracking */}
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-500">Loading progress...</p>
          ) : checkInData ? (
            <>
              <p className="mb-2">
                <span className="font-semibold">Current Day:</span>{" "}
                {displayCurrentDay}
              </p>
              <div className="flex flex-wrap gap-2">
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
            <p className="text-gray-500">No progress yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
