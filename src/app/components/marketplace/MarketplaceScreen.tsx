import React, { useState } from 'react';
import { ShoppingBag, Star, MapPin, DollarSign, TrendingUp } from 'lucide-react';

interface MarketplaceScreenProps {
  currentUser: any;
}

export function MarketplaceScreen({ currentUser }: MarketplaceScreenProps) {
  const [category, setCategory] = useState('all');

  const products = [
    {
      id: '1',
      name: 'Premium Dog Food - Organic',
      price: 45.99,
      currency: 'USD',
      seller: 'FarmFresh Co.',
      sellerType: 'farmer',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
      category: 'food',
      distance: 3.2,
      noFee: true,
    },
    {
      id: '2',
      name: 'Interactive Pet Toy Set',
      price: 29.99,
      currency: 'USD',
      seller: 'PetJoy Store',
      sellerType: 'vendor',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400',
      category: 'toys',
      distance: 5.1,
      noFee: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketplace</h2>
        <p className="text-sm text-gray-600 mb-4">Shop for your pet - Free fees for farmers!</p>
        
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'food', 'toys', 'accessories', 'health'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                category === cat
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              {product.noFee && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  No Fees
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {product.distance} km • {product.seller}
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  ${product.price}
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
