import React from 'react';
import { MapPin } from 'lucide-react';
import { VenueCard } from './VenueCard';
import type { Venue } from '../types';

interface VenueListProps {
  venues: Venue[];
  loading: boolean;
  error: string | null;
}

export function VenueList({ venues, loading, error }: VenueListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-purple-500 mb-4">
          <MapPin className="w-8 h-8" />
        </div>
        <p className="text-gray-400">Discovering nearby venues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No venues found nearby</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}