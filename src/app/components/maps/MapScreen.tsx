import React, { useState } from 'react';
import { MapPin, Navigation, Trash2, Route, Star, Filter } from 'lucide-react';

// Map Screen Component
// Microsoft Maps integration with walking routes, poop bins, pet-friendly locations
// Live location tracking and route suggestions
interface MapScreenProps {
  currentUser: any;
}

export function MapScreen({ currentUser }: MapScreenProps) {
  const [mapView, setMapView] = useState<'routes' | 'bins' | 'places'>('routes');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Mock map data
  const walkingRoutes = [
    {
      id: 'route_1',
      name: 'Riverside Trail',
      distance: 3.2,
      duration: 45,
      difficulty: 'easy',
      rating: 4.8,
      reviews: 234,
      description: 'Beautiful scenic route along the river with plenty of shade',
      poopBins: 5,
    },
    {
      id: 'route_2',
      name: 'City Park Loop',
      distance: 2.1,
      duration: 30,
      difficulty: 'easy',
      rating: 4.6,
      reviews: 189,
      description: 'Popular park with designated dog areas and water fountains',
      poopBins: 8,
    },
    {
      id: 'route_3',
      name: 'Mountain Trail',
      distance: 5.5,
      duration: 90,
      difficulty: 'hard',
      rating: 4.9,
      reviews: 156,
      description: 'Challenging hike with stunning views - bring water!',
      poopBins: 3,
    },
  ];

  const poopBins = [
    {
      id: 'bin_1',
      name: 'Main Street Park',
      distance: 0.3,
      hasBags: true,
      lastVerified: '2 days ago',
      type: 'park',
    },
    {
      id: 'bin_2',
      name: 'River Walk Entrance',
      distance: 0.8,
      hasBags: true,
      lastVerified: '1 week ago',
      type: 'public',
    },
    {
      id: 'bin_3',
      name: 'Community Garden',
      distance: 1.2,
      hasBags: false,
      lastVerified: '3 days ago',
      type: 'public',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pet Map</h2>
            <p className="text-sm text-gray-600">Walking routes, poop bins & pet-friendly places</p>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex gap-2">
          <button
            onClick={() => setMapView('routes')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mapView === 'routes'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Route className="w-4 h-4 inline mr-2" />
            Walking Routes
          </button>
          <button
            onClick={() => setMapView('bins')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mapView === 'bins'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Trash2 className="w-4 h-4 inline mr-2" />
            Poop Bins
          </button>
          <button
            onClick={() => setMapView('places')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mapView === 'places'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Pet Places
          </button>
        </div>
      </div>

      {/* Map Container (Mock) */}
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-md p-8 h-96 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center">
          <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Microsoft Maps Integration
          </h3>
          <p className="text-gray-600 mb-4">
            Live location tracking, route navigation & nearby locations
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Navigation className="w-4 h-4" />
            <span>
              Your location: {currentUser.location?.lat?.toFixed(4)}, {currentUser.location?.lng?.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Mock Map Pins */}
        <div className="absolute top-12 left-20 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="absolute bottom-24 right-32 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="absolute top-32 right-20 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <MapPin className="w-5 h-5" />
        </div>
      </div>

      {/* Walking Routes */}
      {mapView === 'routes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Suggested Walking Routes</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {walkingRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedRoute(route.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{route.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{route.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Route className="w-4 h-4" />
                      {route.distance} km
                    </span>
                    <span>{route.duration} mins</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      route.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      route.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {route.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trash2 className="w-4 h-4" />
                      {route.poopBins} bins
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{route.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{route.reviews} reviews</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Start Walking
                </button>
                <button className="px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Poop Bins */}
      {mapView === 'bins' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Trash2 className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <div className="font-medium text-blue-900 mb-1">Poop Bin Locations</div>
                <div className="text-sm text-blue-700">
                  Live data from community reports. Help us keep locations updated!
                </div>
              </div>
            </div>
          </div>

          {poopBins.map((bin) => (
            <div key={bin.id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{bin.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {bin.distance} km away
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bin.hasBags ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {bin.hasBags ? '✓ Has bags' : 'No bags'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Last verified: {bin.lastVerified}
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
