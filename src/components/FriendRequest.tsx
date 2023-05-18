'use client';

import axios from 'axios';
import { Check, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useState } from 'react';

interface FriendRequestProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequest: FC<FriendRequestProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const acceptFriend = useCallback(
    async (senderId: string) => {
      axios.post('/api/friends/accept', {
        id: senderId,
      });
      setFriendRequests((prev) =>
        prev.filter((request) => request.senderId !== senderId)
      );
      router.push('/dashboard');
    },
    [setFriendRequests, router]
  );

  const denyFriend = useCallback(
    async (senderId: string) => {
      axios.post('/api/friends/deny', {
        id: senderId,
      });
      setFriendRequests((prev) =>
        prev.filter((request) => request.senderId !== senderId)
      );
      router.push('/dashboard');
    },
    [setFriendRequests, router]
  );

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500 ">
          Nothing to see here! You have no friend requests.
        </p>
      ) : (
        friendRequests.map((friendRequest) => (
          <div className="flex items-center gap-4" key={friendRequest.senderId}>
            <UserPlus className="text-black" />
            <p className="text-lg font-medium">{friendRequest.senderEmail}</p>
            <button
              onClick={() => acceptFriend(friendRequest.senderId)}
              aria-label="accept friend"
              className="grid w-8 h-8 transition bg-indigo-600 rounded-full hover:bg-indigo-700 place-items-center hover:shadow-md"
            >
              <Check className="w-3/4 font-semibold text-white h-3/4" />
            </button>
            <button
              onClick={() => denyFriend(friendRequest.senderId)}
              aria-label="deny friend"
              className="grid w-8 h-8 transition bg-red-600 rounded-full hover:bg-red-700 place-items-center hover:shadow-md"
            >
              <X className="w-3/4 font-semibold text-white h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequest;
