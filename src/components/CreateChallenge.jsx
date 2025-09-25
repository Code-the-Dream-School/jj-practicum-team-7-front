import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { postData , getData} from "../util/index"
import Select from 'react-select'
import useAuthStore from "../store/useAuthStore"; // ADDED THIS

const categories = [
  "Fitness",
  "Learning",
  "Productivity",
  "Health",
  "Creativity",
  "Self-Care",
  "Finance",
  "Mindfulness",
  "Other",
];

const CreateChallengeModal = ({ onClose, onChallengeCreated  }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [invited, setInvited] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const currentUserId = localStorage.getItem("userId");
  const { user: currentUser } = useAuthStore(); // ADDED THIS INSTEAD

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getData("/users");
        const filteredUsers = res.users.filter(
          (user) => user._id !== currentUser?._id //REPLCAED "currentUserId" with currentUser?._id 
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };
     if (currentUser?._id) fetchUsers(); // ADDED THIS: Only fetch if currentUser exists
  }, [currentUser]);// REPLACED "currentUserId" with currentUser

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }
    if (title.length < 5) {
      setError("Title must be at least 5 characters");
      setLoading(false);
      return;
    }
    if (!category) {
      setError("Please choose a category");
      setLoading(false);
      return;
    }
    if (!duration || duration < 1 || duration > 10) {
      setError("Please set a duration between 1 and 10 days");
      setLoading(false);
      return;
    }
    if (invited.length === 0) {
      setError("Please select at least one friend to invite!");
      setLoading(false);
      return;
    }
    try {
      const data = {
        title,
        category,
        duration: Number(duration),
        invited,
      };
      const res = await postData("/challenges", data);
      console.log(res);
      // navigate("/dashboard");
      if (onChallengeCreated) onChallengeCreated(res.challenge);
      // onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"></div>
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-tr from-green-400/20 via-transparent to-blue-400/20 pointer-events-none"></div>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-gray-600 transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-black text-center mb-2 relative z-10">
          Create a Challenge
        </h2>
        <p className="text-gray-600 text-center mb-6 relative z-10">
          Set up your next quest and invite friends
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center relative z-10">
            {error}
          </p>
        )}

        <form className="space-y-4 relative z-10" onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <input
            type="text"
            placeholder="Challenge title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength="5"
            maxLength="50"
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 shadow-sm 
                       focus:ring-2 focus:ring-green-400 focus:scale-[1.02] transition"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-white border border-gray-200 shadow-sm 
             focus:ring-2 focus:ring-green-400 focus:scale-[1.02] transition 
             text-gray-700 appearance-none"
          >
            <option value="">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Duration */}
          <input
            type="number"
            placeholder="Duration (1-10 days)"
            value={duration}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
                setDuration(value);
              }
            }}
            required
            min="1"
            max="10"
            className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 shadow-sm 
                       focus:ring-2 focus:ring-green-400 focus:scale-[1.02] transition"
          />

          {/* Invited */}
          <Select
            isMulti
            options={users.map((user) => ({
              value: user._id,
              label: user.username || user.email,
            }))}
            onChange={(selectedOptions) =>
              setInvited(selectedOptions.map((option) => option.value))
            }
            placeholder="Select friends to invite..."
            className="text-sm"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "0.75rem",
                borderColor: state.isFocused ? "#4ade80" : "#e5e7eb",
                boxShadow: state.isFocused ? "0 0 0 2px #4ade80" : "none",
                padding: "2px",
                "&:hover": {
                  borderColor: "#4ade80",
                },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                paddingLeft: "4px",
                paddingRight: "4px",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#374151",
                fontWeight: 500,
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#6b7280",
                ":hover": {
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                },
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }),
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl shadow-md 
                       hover:bg-green-700 hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Challenge"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeModal;