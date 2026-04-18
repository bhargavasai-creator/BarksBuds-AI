import React, { useState } from 'react';
import { Heart, TreePine, Flower, Flame, MessageCircle } from 'lucide-react';

interface MemorialScreenProps {
  currentUser: any;
}

export function MemorialScreen({ currentUser }: MemorialScreenProps) {
  const memorials = [
    {
      id: '1',
      petName: 'Buddy',
      species: 'Dog',
      emoji: '🐕',
      birthDate: '2015-03-15',
      passedDate: '2025-11-20',
      owner: 'John Smith',
      tributeMessage: 'You brought so much joy to our lives. Forever in our hearts. 💙',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      condolences: 156,
      candles: 234,
    },
    {
      id: '2',
      petName: 'Whiskers',
      species: 'Cat',
      emoji: '🐈',
      birthDate: '2018-06-10',
      passedDate: '2025-12-01',
      owner: 'Emma Davis',
      tributeMessage: 'The sweetest companion. Thank you for 7 beautiful years together. 🌈',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      condolences: 89,
      candles: 142,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center gap-3">
          <TreePine className="w-8 h-8 text-green-700" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Memorial Pages</h2>
            <p className="text-sm text-gray-600">Honoring the pets who touched our lives</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-md p-6 text-white text-center">
        <p className="text-lg font-medium">
          "Until one has loved an animal, a part of one's soul remains unawakened."
        </p>
        <p className="text-sm opacity-90 mt-2">- Anatole France</p>
      </div>

      <div className="space-y-6">
        {memorials.map((memorial) => (
          <div key={memorial.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative h-64">
              <img src={memorial.image} alt={memorial.petName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                <TreePine className="w-4 h-4" />
                <span className="text-sm">In Loving Memory</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{memorial.emoji}</span>
                  <div>
                    <h3 className="text-3xl font-bold">{memorial.petName}</h3>
                    <p className="text-lg opacity-90">{memorial.species}</p>
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  {new Date(memorial.birthDate).toLocaleDateString()} - {new Date(memorial.passedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700 italic">"{memorial.tributeMessage}"</p>
                <p className="text-sm text-gray-500 mt-2">- {memorial.owner}</p>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div className="flex gap-6">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Flame className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium">{memorial.candles} candles lit</span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{memorial.condolences} condolences</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-yellow-100 text-yellow-700 py-3 rounded-lg font-medium hover:bg-yellow-200 transition-colors flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5" />
                  Light a Candle
                </button>
                <button className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Leave Condolence
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}