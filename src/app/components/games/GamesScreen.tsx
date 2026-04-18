import React from 'react';
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';

interface GamesScreenProps {
  currentUser: any;
}

export function GamesScreen({ currentUser }: GamesScreenProps) {
  const games = [
    {
      id: '1',
      name: 'Pet Match Connect',
      type: 'puzzle',
      players: '1',
      plays: '12.5K',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    },
    {
      id: '2',
      name: 'Animal War Battle',
      type: 'multiplayer',
      players: '2-4',
      plays: '8.3K',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-900">Pet Games</h2>
        <p className="text-sm text-gray-600">Fun games for you and your pets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <img src={game.thumbnail} alt={game.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{game.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {game.players} players
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {game.plays} plays
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
