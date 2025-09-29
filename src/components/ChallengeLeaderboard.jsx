import { useEffect, useState } from "react";
import { getData } from "../util";

export default function ChallengeLeaderboard({ challengeId }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getData(`/challenges/${challengeId}/leaderboard`);
        console.log("Challenge leaderboard response:", res);
        setLeaderboard(res.leaderboard || []);
      } catch (err) {
        console.error("Failed to fetch challenge leaderboard:", err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchLeaderboard();
    }
  }, [challengeId]);

  if (loading)
    return <p className="text-gray-500 italic">Loading leaderboard...</p>;
  if (error) return <p className="text-red-500 font-medium">{error}</p>;
  if (!leaderboard.length)
    return <p className="text-gray-500 italic">No check-ins yet</p>;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        🏆 Challenge Leaderboard
      </h3>
      {leaderboard.map((user, index) => (
        <div
          key={user.userId}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-700">#{index + 1}</span>
            <span className="text-gray-800 font-medium">{user.username}</span>
          </div>
          <span className="text-green-600 font-semibold">
            {user.totalCheckIns} check-ins
          </span>
        </div>
      ))}
    </div>
  );
}
