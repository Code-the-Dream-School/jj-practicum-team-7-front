import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import CreateChallenge from "../components/CreateChallenge";
import ChallengeDetails from "../components/ChallengeDetails";
import ChallengeCard from "../components/ChallengeCard";
import InvitationCard from "../components/InvitationCard";
import PastChallengeCard from "../components/PastChallengeCard";
import Modal from "../components/Modal";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeChallenges, setActiveChallenges] = useState([
    {
      id: 1,
      title: "Morning meditation",
      category: "Wellness",
      total: 10,
      days: [
        "done",
        "done",
        "missed",
        "missed",
        "done",
        "done",
        "done",
        "done",
        "done",
        "done",
      ],
    },
    {
      id: 2,
      title: "Daily 10K Steps",
      category: "Fitness",
      total: 10,
      days: [
        "done",
        "done",
        "done",
        "missed",
        "done",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
      ],
    },
    {
      id: 3,
      title: "Healthy Breakfast",
      category: "Nutrition",
      total: 10,
      days: [
        "done",
        "done",
        "done",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
        "upcoming",
      ],
    },
  ]);

  const [pastChallenges] = useState([
    {
      id: 4,
      title: "January Yoga Challenge",
      category: "Fitness",
      progress: 10,
      total: 10,
      status: "Completed",
    },
    {
      id: 5,
      title: "30-Days No Sugar Challenge",
      category: "Nutrition",
      progress: 7,
      total: 10,
      status: "Failed",
    },
    {
      id: 6,
      title: "No coffee after 2PM",
      category: "Nutrition",
      progress: 10,
      total: 10,
      status: "Completed",
    },
  ]);

  const [invitations, setInvitations] = useState([
    {
      id: 7,
      title: "30-Day Reading Challenge",
      category: "Learning",
      invitedBy: "Kate Chu",
    },
    {
      id: 8,
      title: "30-Day Fitness Challenge",
      category: "Fitness",
      invitedBy: "Alex Lee",
    },
  ]);

  const [modal, setModal] = useState(null); // "create" | "details" | null
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  //Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-[0_0_14px_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF50] text-white font-bold mr-3">
            {getInitials(user?.username || "User")}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Welcome back, {user?.username || "User"}!
            </h1>
            <p className="text-sm text-gray-600">
              Ready to tackle your challenges today?
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#4CAF50] text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-600 transition"
        >
          Logout
        </button>
      </nav>
      <div className="pt-28 px-20 py-12">
        
        {/* Create Challenge Button */}
        <button
          onClick={() => setModal("create")}
          className="w-full bg-[#4CAF50] text-white font-semibold py-3 rounded-2xl hover:bg-green-600 transition"
        >
          + Create New Challenge
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Active Challenges */}
          <div className="lg:col-span-2 border rounded-lg bg-white p-8 shadow-[0_0_14px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Active Challenges ({activeChallenges.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onOpenDetails={() => {
                    setSelectedChallenge(challenge);
                    setModal("details");
                  }}
                />
              ))}
            </div>
          </div>

          {/* Invitations */}
          <div className="border rounded-lg bg-white p-8 shadow-[0_0_14px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Incoming Invitations ({invitations.length})
            </h2>
            <div className="space-y-4">
              {invitations.map((invite) => (
                <InvitationCard
                  key={invite.id}
                  invite={invite}
                  getInitials={getInitials}
                  onAccept={() => {
                    setInvitations((prev) =>
                      prev.filter((i) => i.id !== invite.id)
                    );
                    setActiveChallenges((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        title: invite.title,
                        category: invite.category,
                        total: 10,
                        days: Array(10).fill("upcoming"),
                      },
                    ]);
                  }}
                  onDecline={() =>
                    setInvitations((prev) =>
                      prev.filter((i) => i.id !== invite.id)
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Past Challenges */}
        <div className="mt-8 border rounded-lg bg-white p-4 shadow-[0_0_14px_rgba(0,0,0,0.2)]">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Past Challenges
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pastChallenges.map((challenge) => (
              <PastChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        </div>

        {/* Modals */}
        {modal === "create" && (
          <Modal onClose={() => setModal(null)}>
            <CreateChallenge />
          </Modal>
        )}
        {modal === "details" && selectedChallenge && (
          <Modal onClose={() => setModal(null)}>
            <ChallengeDetails challenge={selectedChallenge} />
          </Modal>
        )}
      </div>
    </div>
  );
}
