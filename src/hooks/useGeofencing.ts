import { useState, useEffect } from 'react';
import type { Venue } from '../types';
import { calculateDistance } from '../utils/distance';

export function useGeofencing(venues: Venue[], userLat?: number | null, userLon?: number | null) {
  const [venuesWithGeofence, setVenuesWithGeofence] = useState<Venue[]>(venues);

  useEffect(() => {
    if (!userLat || !userLon) {
      setVenuesWithGeofence(venues.map(venue => ({ ...venue, isWithinGeofence: false })));
      return;
    }

    const updatedVenues = venues.map(venue => {
      const distanceInKm = calculateDistance(
        userLat,
        userLon,
        venue.location.latitude,
        venue.location.longitude
      );
      
      // Convert distance to meters for comparison with geofence radius
      const distanceInMeters = distanceInKm * 1000;
      
      return {
        ...venue,
        distance: distanceInKm,
        isWithinGeofence: distanceInMeters <= venue.location.radius
      };
    });

    setVenuesWithGeofence(updatedVenues);
  }, [venues, userLat, userLon]);

  return venuesWithGeofence;
}