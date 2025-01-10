import { useMemo } from 'react';
import type { Venue, SearchFilters } from '../types';

export function useVenueSearch(venues: Venue[], filters: SearchFilters) {
  return useMemo(() => {
    return venues.filter(venue => {
      // Text search
      const matchesQuery = filters.query
        ? venue.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          venue.description?.toLowerCase().includes(filters.query.toLowerCase())
        : true;

      // Distance filter
      const matchesDistance = venue.distance
        ? venue.distance <= filters.maxDistance
        : true;

      // Price range filter
      const matchesMinBid = filters.minBid
        ? venue.minBid >= filters.minBid
        : true;
      const matchesMaxBid = filters.maxBid
        ? venue.minBid <= filters.maxBid
        : true;

      // Genre filter
      const matchesGenres = filters.genres?.length
        ? venue.genres?.some(genre => filters.genres?.includes(genre))
        : true;

      return (
        matchesQuery &&
        matchesDistance &&
        matchesMinBid &&
        matchesMaxBid &&
        matchesGenres
      );
    });
  }, [venues, filters]);
}