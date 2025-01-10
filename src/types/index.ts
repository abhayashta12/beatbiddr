export interface Venue {
  id: string;
  name: string;
  image: string;
  description?: string;
  currentSong?: {
    title: string;
    artist: string;
    progress: number;
  };
  minBid: number;
  location: {
    latitude: number;
    longitude: number;
    radius: number; // Geofence radius in meters
  };
  distance?: number;
  genres?: string[];
  openingHours?: {
    open: string;
    close: string;
  };
  isWithinGeofence?: boolean;
}

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  bidAmount: number;
  userAvatar: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'playing' | 'completed';
}

export interface SearchFilters {
  query: string;
  maxDistance: number;
  minBid?: number;
  maxBid?: number;
  genres?: string[];
}