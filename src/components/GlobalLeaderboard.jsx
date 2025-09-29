import { useState, useEffect } from "react";
import { getData } from "../util";
import useAuthStore from "../store/useAuthStore";

export default function GlobalLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getData("/leaderboard");
        setLeaderboard(Array.isArray(res?.leaderboard) ? res.leaderboard : []);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading)
    return <p className="text-gray-500 italic">Loading leaderboard...</p>;
  if (error) return <p className="text-red-500 font-medium">{error}</p>;
  if (!leaderboard.length)
    return <p className="text-gray-500 italic">No check-ins yet</p>;

  // Normalize ids to plain strings
  const normalizeId = (id) => String(id).replace(/ObjectId\("([^"]+)"\)/, "$1");

  // Current user id 
  const currentUserId = normalizeId(user?._id || user?.id || "");

  // Rank calculation
  const userIndex = leaderboard.findIndex(
    (u) => normalizeId(u.userId) === currentUserId
  );
  const userRank = userIndex >= 0 ? userIndex + 1 : null;
  const currentUser = userIndex >= 0 ? leaderboard[userIndex] : null;

  const topThree = leaderboard.slice(0, 3);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="space-y-4">
      {/* Top 3 */}
      {topThree.map((u, idx) => (
        <div
          key={u.userId}
          className="flex items-center justify-between p-3 rounded-lg border bg-white shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{medals[idx]}</span>
            <span className="font-medium text-gray-800">{u.username}</span>
          </div>
          <span className="text-green-600 font-semibold">
            {u.totalCheckIns} check-ins
          </span>
        </div>
      ))}

      {/* If current user is outside top-3, show their rank */}
      {currentUser && userRank > 3 && (
        <p className="mt-2 text-center text-gray-700">
          You are currently <span className="font-semibold">#{userRank}</span>{" "}
          with{" "}
          <span className="font-semibold">{currentUser.totalCheckIns}</span>{" "}
          check-ins
        </p>
      )}

      {/* Fallback for users with 0 check-ins */}
      {!currentUser && (
        <p className="mt-2 text-center text-gray-700">
          You have <span className="font-semibold">0</span> check-ins yet. Your
          rank will appear after your first check-in
        </p>
      )}

      <p className="text-xs text-gray-400 text-right mt-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
