import React from 'react';
import { X, Music4, MapPin, Clock, Tag } from 'lucide-react';
import type { Venue } from '../types';

interface VenueDetailsProps {
  venue: Venue;
  onClose: () => void;
}

export function VenueDetails({ venue, onClose }: VenueDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{venue.name}</h2>
          
          {venue.description && (
            <p className="text-gray-400 mb-4">{venue.description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-2 text-purple-500" />
              <span>
                {venue.distance ? (
                  venue.distance < 1
                    ? `${Math.round(venue.distance * 1000)}m away`
                    : `${venue.distance.toFixed(1)}km away`
                ) : 'Distance unknown'}
              </span>
            </div>
            
            {venue.openingHours && (
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                <span>{venue.openingHours.open} - {venue.openingHours.close}</span>
              </div>
            )}
          </div>
          
          {venue.genres && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Music Genres</h3>
              <div className="flex flex-wrap gap-2">
                {venue.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {venue.currentSong && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Now Playing</h3>
              <div className="flex items-center bg-gray-800 p-4 rounded-lg">
                <Music4 className="w-6 h-6 text-purple-500 mr-3" />
                <div>
                  <div className="text-white font-medium">{venue.currentSong.title}</div>
                  <div className="text-gray-400 text-sm">{venue.currentSong.artist}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-400">Minimum bid</div>
              <div className="text-2xl font-bold text-white">${venue.minBid}</div>
            </div>
            <button
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
              disabled={!venue.isWithinGeofence}
            >
              {venue.isWithinGeofence ? 'Request Song' : 'Too Far Away'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}