import React from "react";

export default function InvitationCard({ invite, getInitials, onAccept, onDecline }) {
  return (
    <div className="border border-[#4CAF50] rounded-lg shadow-[0_0_8px_2px_rgba(76,175,80,0.4)] p-4 flex flex-col justify-between">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF50] text-white font-bold mr-3">
          {getInitials(invite.invitedBy)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{invite.title}</h3>
          <p className="text-sm text-gray-500">Invited by {invite.invitedBy}</p>
          <span className="text-xs border border-gray-600 text-gray-700 px-2 py-1 rounded-full mt-1 inline-block">
            {invite.category}
          </span>
        </div>
      </div>

      <div className="mt-auto flex justify-end space-x-2">
        <button
          onClick={onAccept}
          className="text-sm bg-[#4CAF50] text-white px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="text-sm border border-gray-500 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
