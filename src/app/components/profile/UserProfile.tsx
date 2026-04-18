import React, { useState } from 'react';
import { ArrowLeft, Edit, Plus, Settings, Heart, MapPin, Calendar } from 'lucide-react';

interface UserProfileProps {
  currentUser: any;
  onBack: () => void;
}

export function UserProfile({ currentUser, onBack }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('pets');

  const userPets = [
    {
      id: '1',
      name: 'Max',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      emoji: '🐕',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      likes: 2456,
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Cat',
      breed: 'Persian',
      age: 2,
      emoji: '🐈',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      likes: 1834,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
              {currentUser?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name || 'User'}</h2>
              <p className="text-gray-600">{currentUser?.phoneNumber || 'Phone not set'}</p>
            </div>
            <button className="mb-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          <div className="flex gap-6 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location: {currentUser?.location ? `${currentUser.location.lat.toFixed(2)}, ${currentUser.location.lng.toFixed(2)}` : 'Not set'}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined: {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pets')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'pets'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              My Pets ({userPets.length})
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'posts'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'settings'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'pets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userPets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{pet.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg">{pet.name}</h3>
                    <p className="text-sm text-gray-600">{pet.breed} • {pet.age} years old</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium">{pet.likes.toLocaleString()} likes</span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
          
          <button className="bg-gray-100 rounded-2xl shadow-md p-8 hover:bg-gray-200 transition-colors flex flex-col items-center justify-center gap-3 min-h-[280px]">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <span className="font-medium text-gray-700">Add New Pet</span>
          </button>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <p className="text-gray-600">Your posts will appear here</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Account Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Notifications</span>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Location Services</span>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Microphone Access</span>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">Enabled</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
