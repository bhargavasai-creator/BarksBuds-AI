import React, { useState } from 'react';
import { Search, Globe, Leaf, Waves, Mountain } from 'lucide-react';

export function AnimalEncyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const animals = [
    {
      id: '1',
      commonName: 'African Elephant',
      scientificName: 'Loxodonta africana',
      category: 'mammal',
      habitat: 'Savanna, forests',
      conservation: 'Endangered',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
      funFact: 'Elephants are the largest land animals and have incredible memory!',
    },
    {
      id: '2',
      commonName: 'Blue Whale',
      scientificName: 'Balaenoptera musculus',
      category: 'mammal',
      habitat: 'Oceans worldwide',
      conservation: 'Endangered',
      image: 'https://images.unsplash.com/photo-1567586879813-e9f6f9bf0fc1?w=400',
      funFact: 'The largest animal ever known to have lived, reaching up to 100 feet long!',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Animal Encyclopedia</h2>
        <p className="text-sm text-gray-600 mb-4">
          Explore 4.1 billion years of life on Earth 🌍
        </p>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search animals, species, habitats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All', icon: Globe },
            { id: 'mammal', label: 'Mammals', icon: null },
            { id: 'bird', label: 'Birds', icon: null },
            { id: 'fish', label: 'Fish', icon: Waves },
            { id: 'forest', label: 'Forests', icon: Leaf },
            { id: 'mountain', label: 'Mountains', icon: Mountain },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                  category === cat.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img src={animal.image} alt={animal.commonName} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-xl mb-1">{animal.commonName}</h3>
              <p className="text-sm italic text-gray-600 mb-3">{animal.scientificName}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Habitat:</span>
                  <span className="text-gray-600">{animal.habitat}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {animal.conservation}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs font-medium text-blue-900 mb-1">💡 Fun Fact</div>
                <p className="text-sm text-blue-800">{animal.funFact}</p>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
