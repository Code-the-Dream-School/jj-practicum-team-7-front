import { useEffect, useState } from "react";
import axios from "axios";

const ChallengeLeaderboard = ({ challengeId }) => {
  const [top3, setTop3] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `http://localhost:8000/api/v1/challenges/${challengeId}/leaderboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTop3(res.data.top3 || []);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, [challengeId]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-4">
      <h3 className="text-lg font-bold mb-2">🏆 Top 3 Participants</h3>
      {top3.length === 0 ? (
        <p className="text-gray-500">No check-ins yet</p>
      ) : (
        <ul>
          {top3.map((item, index) => (
            <li
              key={item.userId}
              className="flex items-center justify-between py-1"
            >
              <span>
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
              </span>
              <span className="ml-2 font-medium">{item.username}</span>
              <span className="ml-auto text-gray-500">
                {item.totalCheckIns} check-ins
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengeLeaderboard;
