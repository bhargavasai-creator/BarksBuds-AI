import React, { useState } from 'react';
import { Users, Star, MapPin, Calendar, Clock } from 'lucide-react';

interface ServicesScreenProps {
  currentUser: any;
}

export function ServicesScreen({ currentUser }: ServicesScreenProps) {
  const services = [
    {
      id: '1',
      type: 'Walking',
      provider: 'Sarah\'s Pet Care',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 25,
      distance: 1.2,
      verified: true,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    },
    {
      id: '2',
      type: 'Grooming',
      provider: 'Paw Perfect Salon',
      rating: 4.7,
      reviews: 234,
      hourlyRate: 45,
      distance: 3.5,
      verified: true,
      image: 'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?w=400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-900">Pet Services</h2>
        <p className="text-sm text-gray-600">Walking, grooming, sitting, training & more</p>
      </div>

      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex">
            <img src={service.image} alt={service.provider} className="w-48 h-48 object-cover" />
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-xl mb-1">{service.provider}</h3>
                  <p className="text-gray-600">{service.type} Service</p>
                </div>
                {service.verified && (
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    ✓ Verified
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-gray-500">({service.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {service.distance} km away
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  ${service.hourlyRate}/hr
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
