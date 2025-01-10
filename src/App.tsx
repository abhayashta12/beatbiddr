import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { VenueList } from './components/VenueList';
import { VenueDetails } from './components/VenueDetails';
import { SongQueue } from './components/SongQueue';
import { useGeolocation } from './hooks/useGeolocation';
import { useGeofencing } from './hooks/useGeofencing';
import { useVenueSearch } from './hooks/useVenueSearch';
import type { Venue, SongRequest, SearchFilters } from './types';

// Sample data - in a real app, this would come from an API
const venues: Venue[] = [
  {
    id: '1',
    name: 'Neon Nights Club',
    description: 'Premier nightclub featuring top DJs and state-of-the-art sound system',
    image: 'https://images.unsplash.com/photo-1571935441005-55d9a6c2413c?auto=format&fit=crop&q=80',
    currentSong: {
      title: 'One More Time',
      artist: 'Daft Punk',
      progress: 0.6,
    },
    minBid: 20,
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 100, // 100 meters geofence
    },
    genres: ['House', 'EDM', 'Pop'],
    openingHours: {
      open: '10:00 PM',
      close: '4:00 AM',
    },
  },
  {
    id: '2',
    name: 'Pulse Casino',
    description: 'Luxury casino with live entertainment and premium cocktails',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    currentSong: {
      title: 'Levels',
      artist: 'Avicii',
      progress: 0.3,
    },
    minBid: 40,
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      radius: 150, // 150 meters geofence
    },
    genres: ['Pop', 'Hip Hop', 'R&B'],
    openingHours: {
      open: '12:00 PM',
      close: '4:00 AM',
    },
  },
];

const sampleRequests: SongRequest[] = [
  {
    id: '1',
    title: 'Don\'t Stop Believin\'',
    artist: 'Journey',
    bidAmount: 50,
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    timestamp: '2 min ago',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Sweet Dreams',
    artist: 'Eurythmics',
    bidAmount: 35,
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    timestamp: '5 min ago',
    status: 'pending',
  },
];

function App() {
  const { latitude, longitude, error, loading } = useGeolocation();
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    maxDistance: 5, // 5km
  });

  const venuesWithGeofence = useGeofencing(venues, latitude, longitude);
  const filteredVenues = useVenueSearch(venuesWithGeofence, filters);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Request Your Favorite Songs
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with DJs in real-time, bid on your favorite tracks, and make the night yours.
          </p>
        </div>

        <SearchBar
          filters={filters}
          onFiltersChange={setFilters}
          onToggleFilters={() => {}}
        />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nearby Venues</h2>
          <VenueList
            venues={filteredVenues}
            loading={loading}
            error={error}
            onVenueClick={setSelectedVenue}
          />
        </div>

        {filteredVenues.length > 0 && (
          <div className="mb-12">
            <SongQueue requests={sampleRequests} />
          </div>
        )}
      </main>

      {selectedVenue && (
        <VenueDetails
          venue={selectedVenue}
          onClose={() => setSelectedVenue(null)}
        />
      )}
    </div>
  );
}

export default App;