import React from 'react';
import type { SongRequest } from '../types';
import { Clock, Music2 } from 'lucide-react';

interface SongQueueProps {
  requests: SongRequest[];
}

export function SongQueue({ requests }: SongQueueProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Current Queue</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={request.userAvatar}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-white font-medium">{request.title}</h3>
                <p className="text-gray-400 text-sm">{request.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-purple-400 font-medium">${request.bidAmount}</div>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {request.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}