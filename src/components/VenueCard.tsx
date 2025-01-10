import React from 'react';
import type { Venue } from '../types';
import { Music4, MapPin } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer ${
        !venue.isWithinGeofence ? 'opacity-75' : ''
      }`}
    >
      <div className="relative h-48">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{venue.name}</h3>
          {venue.currentSong && (
            <div className="flex items-center mt-2 text-gray-300">
              <Music4 className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {venue.currentSong.title} - {venue.currentSong.artist}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-2">
            <span>Minimum bid: ${venue.minBid}</span>
            {venue.distance !== undefined && (
              <span className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                {venue.distance < 1
                  ? `${Math.round(venue.distance * 1000)}m`
                  : `${venue.distance.toFixed(1)}km`}
              </span>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm ${
            venue.isWithinGeofence
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {venue.isWithinGeofence ? 'In Range' : 'Out of Range'}
          </div>
        </div>
      </div>
    </div>
  );
}