import React, { useState, useEffect } from "react";
import { getData, patchData } from "../util/index";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import CreateChallenge from "../components/CreateChallenge";
import ChallengeDetails from "../components/ChallengeDetails";
import ChallengeCard from "../components/ChallengeCard";
import InvitationCard from "../components/InvitationCard";
import PastChallengeCard from "../components/PastChallengeCard";
import Modal from "../components/Modal";
import CardWrapper from "../components/CardWrapper";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [pastChallenges, setPastChallenges] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [modal, setModal] = useState(null); // "create" | "details" | null
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    return parts.length === 1
      ? parts[0].slice(0, 2).toUpperCase()
      : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Fetch challenges for logged-in user
  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const res = await getData("/challenges");
      const challenges = Array.isArray(res?.challenges) ? res.challenges : [];

      // Normalize user id to string
      const userId = String(user?._id || "");

      // Helper to extract _id safely
      const idOf = (item) =>
        item && typeof item === "object"
          ? String(item._id ?? item.id ?? "")
          : String(item ?? "");

      const isParticipant = (c) =>
        Array.isArray(c?.participant) &&
        c.participant.some((p) => idOf(p) === userId);

      const isInvited = (c) =>
        Array.isArray(c?.invited) && c.invited.some((i) => idOf(i) === userId);

      // Filter active, past, and invitations safely
      const active = challenges
        .filter(
          (c) =>
            (c.status === "active" || c.status === "pending") &&
            isParticipant(c)
        )
        .filter((c) => c && c._id);

      const past = challenges
        .filter(
          (c) =>
            (c.status === "completed" || c.status === "failed") &&
            isParticipant(c)
        )
        .filter((c) => c && c._id);

      const invites = challenges
        .filter((c) => isInvited(c) && !isParticipant(c))
        .filter((c) => c && c._id);

      setActiveChallenges(active);
      setPastChallenges(past);
      setInvitations(invites);
    } catch (err) {
      console.error("Failed to fetch challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchChallenges();
    }
  }, [user]);

  // ACCEPT: remove from invitations, add to active challenges
  const handleAccept = async (challenge) => {
    try {
      const res = await patchData(`/challenges/${challenge._id}/accept`);
      const updatedChallenge = res.challenge;

      setInvitations((prev) =>
        prev.filter((i) => i && i._id !== challenge._id)
      );

      setActiveChallenges((prev) => {
        const exists = prev.some((c) => c && c._id === challenge._id);
        if (exists) return prev;
        return [...prev, updatedChallenge].filter((c) => c && c._id);
      });
    } catch (err) {
      console.error("Failed to accept challenge:", err);
    }
  };

  // DECLINE: remove from invitations
  const handleDecline = async (challenge) => {
    try {
      await patchData(`/challenges/${challenge._id}/decline`);
      setInvitations((prev) =>
        prev.filter((i) => i && i._id !== challenge._id)
      );
      setActiveChallenges((prev) =>
        prev.filter((c) => c && c._id !== challenge._id)
      );
    } catch (err) {
      console.error("Failed to decline challenge:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading challenges...</p>
        </div>
      ) : (
        <div className="pt-28 px-20 py-12 min-h-screen bg-gray-50">
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
            <CardWrapper className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Active Challenges ({activeChallenges.length})
              </h2>
              {activeChallenges.length === 0 ? (
                <p className="text-gray-500 italic">No active challenges yet</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {activeChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge._id}
                      title={challenge.title}
                      category={challenge.category}
                      total={challenge.duration}
                      days={Array(challenge.duration).fill("upcoming")}
                      onOpenDetails={() => {
                        setSelectedChallenge(challenge);
                        setModal("details");
                      }}
                    />
                  ))}
                </div>
              )}
            </CardWrapper>

            {/* Invitations */}
            <CardWrapper>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Incoming Invitations ({invitations.length})
              </h2>
              {invitations.length === 0 ? (
                <p className="text-gray-500 italic">No invitations yet</p>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invite) => (
                    <InvitationCard
                      key={invite._id}
                      invite={{
                        title: invite.title,
                        category: invite.category,
                        invitedBy: invite.creator.username,
                      }}
                      getInitials={getInitials}
                      onAccept={() => handleAccept(invite)}
                      onDecline={() => handleDecline(invite)}
                    />
                  ))}
                </div>
              )}
            </CardWrapper>
          </div>

          {/* Past Challenges */}
          <CardWrapper
            shadow="shadow-[0_0_14px_rgba(0,0,0,0.2)]"
            className="mt-8 p-4"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Past Challenges
            </h2>
            {pastChallenges.length === 0 ? (
              <p className="text-gray-500 italic">No past challenges yet</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {pastChallenges.map((challenge) => (
                  <PastChallengeCard
                    key={challenge._id}
                    title={challenge.title}
                    category={challenge.category}
                    progress={challenge.duration}
                    total={challenge.duration}
                    status={
                      challenge.status === "completed" ? "Completed" : "Failed"
                    }
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      setModal("details");
                    }}
                  />
                ))}
              </div>
            )}
          </CardWrapper>

          {/* Modals */}
          {modal === "create" && (
            <Modal onClose={() => setModal(null)}>
              <CreateChallenge
                onClose={() => setModal(null)}
                onChallengeCreated={(newChallenge) =>
                  setActiveChallenges((prev) => [...prev, newChallenge])
                }
              />
            </Modal>
          )}
          {modal === "details" && selectedChallenge && (
            <Modal onClose={() => setModal(null)}>
              <ChallengeDetails
                challenge={selectedChallenge}
                onClose={() => setModal(null)}
                currentUserId={user?._id}
                onDelete={fetchChallenges}
              />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
