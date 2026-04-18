import React from 'react';
import { Video, Eye, Heart, Users } from 'lucide-react';

interface LiveStreamScreenProps {
  currentUser: any;
}

export function LiveStreamScreen({ currentUser }: LiveStreamScreenProps) {
  const streams = [
    {
      id: '1',
      title: 'Puppies Playing Live! 🐶',
      streamer: 'Happy Paws Shelter',
      viewers: 1234,
      thumbnail: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      isLive: true,
    },
    {
      id: '2',
      title: 'Cat Cafe Stream - Relaxing Vibes',
      streamer: 'Meow Cafe',
      viewers: 856,
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
      isLive: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-900">Live Streams</h2>
        <p className="text-sm text-gray-600">Watch live pet streams from around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streams.map((stream) => (
          <div key={stream.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <div className="relative">
              <img src={stream.thumbnail} alt={stream.title} className="w-full h-48 object-cover" />
              {stream.isLive && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE
                </div>
              )}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {stream.viewers.toLocaleString()}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{stream.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{stream.streamer}</p>
              <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Video className="w-5 h-5" />
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
