import React, { useState } from 'react';
import { Heart, X, Star, MapPin, Calendar, Info } from 'lucide-react';

// Dating Screen Component
// Pet dating with AI matching based on DOB similarity, species, location
// Swipe-style interface with match algorithm
interface DatingScreenProps {
  currentUser: any;
}

export function DatingScreen({ currentUser }: DatingScreenProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'discover' | 'matches'>('discover');

  // Mock dating profiles with AI match scores
  const datingProfiles = [
    {
      petId: 'pet_1',
      name: 'Bella',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      dob: '2023-01-15',
      gender: 'female',
      emoji: '🐕',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
      bio: 'Love long walks, playing fetch, and making new friends! Looking for a playful companion.',
      distance: 2.5,
      matchScore: 94.5,
      owner: 'Sarah M.',
      interests: ['Walking', 'Playing', 'Swimming'],
    },
    {
      petId: 'pet_2',
      name: 'Charlie',
      species: 'Dog',
      breed: 'Labrador',
      age: 4,
      dob: '2022-03-20',
      gender: 'male',
      emoji: '🐕',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      bio: 'Energetic and friendly! I enjoy adventures and cuddles. Lets explore together!',
      distance: 5.2,
      matchScore: 89.3,
      owner: 'Mike R.',
      interests: ['Hiking', 'Beach', 'Treats'],
    },
    {
      petId: 'pet_3',
      name: 'Milo',
      species: 'Cat',
      breed: 'Persian',
      age: 2,
      dob: '2024-06-10',
      gender: 'male',
      emoji: '🐈',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      bio: 'Calm and affectionate. I prefer quiet evenings and gentle companionship.',
      distance: 3.8,
      matchScore: 76.8,
      owner: 'Emma D.',
      interests: ['Napping', 'Grooming', 'Window watching'],
    },
  ];

  const currentProfile = datingProfiles[currentProfileIndex];

  // Handle swipe actions
  const handleLike = () => {
    if (currentProfile) {
      // Add to matches (mock mutual match)
      setMatches((prev) => [...prev, { ...currentProfile, matchedAt: new Date().toISOString() }]);
    }
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const handleSuperLike = () => {
    if (currentProfile) {
      setMatches((prev) => [
        ...prev,
        { ...currentProfile, isSuperLike: true, matchedAt: new Date().toISOString() },
      ]);
    }
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < datingProfiles.length - 1) {
      setCurrentProfileIndex((prev) => prev + 1);
    } else {
      setCurrentProfileIndex(0); // Loop back
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pet Dating</h2>
            <p className="text-sm text-gray-600">Find the perfect match for your pet</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('discover')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'discover'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setViewMode('matches')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'matches'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Matches ({matches.length})
            </button>
          </div>
        </div>
      </div>

      {/* AI Matching Info */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-md p-4 text-white">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6" />
          <div className="flex-1">
            <div className="font-medium">AI-Powered Matching</div>
            <div className="text-sm opacity-90">
              Based on DOB similarity, species compatibility, location, and behavior patterns
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'discover' ? (
        <div className="max-w-xl mx-auto">
          {currentProfile ? (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Profile Image */}
              <div className="relative h-[500px]">
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  {currentProfile.matchScore.toFixed(1)}% Match
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{currentProfile.emoji}</span>
                    <div>
                      <h3 className="text-3xl font-bold">
                        {currentProfile.name}, {currentProfile.age}
                      </h3>
                      <p className="text-lg opacity-90">
                        {currentProfile.breed} • {currentProfile.species}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm opacity-90 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {currentProfile.distance} km away
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Born {new Date(currentProfile.dob).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm opacity-90 mb-3">{currentProfile.bio}</p>

                  <div className="flex gap-2">
                    {currentProfile.interests.map((interest: string) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs opacity-75 mt-2">Owner: {currentProfile.owner}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 flex items-center justify-center gap-4">
                <button
                  onClick={handlePass}
                  className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg hover:scale-110"
                >
                  <X className="w-8 h-8 text-gray-600" />
                </button>

                <button
                  onClick={handleSuperLike}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:shadow-xl transition-all shadow-lg hover:scale-110"
                >
                  <Star className="w-8 h-8 text-white fill-current" />
                </button>

                <button
                  onClick={handleLike}
                  className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:shadow-xl transition-all shadow-lg hover:scale-110"
                >
                  <Heart className="w-10 h-10 text-white fill-current" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">😊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No more profiles</h3>
              <p className="text-gray-600">Check back later for new matches!</p>
            </div>
          )}
        </div>
      ) : (
        /* Matches View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.length === 0 ? (
            <div className="col-span-2 bg-white rounded-2xl shadow-md p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches yet</h3>
              <p className="text-gray-600">Start swiping to find your pet's perfect match!</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match.petId}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="relative h-64">
                  <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                  {match.isSuperLike && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Super Like
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{match.emoji}</span>
                    <div>
                      <h4 className="font-bold text-lg">
                        {match.name}, {match.age}
                      </h4>
                      <p className="text-sm text-gray-600">{match.breed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {match.distance} km away
                  </div>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                    Send Message
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
