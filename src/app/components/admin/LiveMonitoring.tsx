import React from 'react';
import { MapPin, Activity, Users, Navigation } from 'lucide-react';

export function LiveMonitoring() {
  const activeUsers = [
    { id: '1', name: 'User_12345', activity: 'Walking', lat: 40.7128, lng: -74.0060, pet: 'Max' },
    { id: '2', name: 'User_67890', activity: 'At Park', lat: 40.7589, lng: -73.9851, pet: 'Luna' },
    { id: '3', name: 'User_24680', activity: 'Online', lat: 40.7484, lng: -73.9857, pet: 'Buddy' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Live Monitoring</h2>
        <p className="text-gray-600">Real-time user activity and location tracking</p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: '8,456', icon: Users, color: 'green' },
          { label: 'Currently Walking', value: '1,234', icon: Navigation, color: 'blue' },
          { label: 'Live Streams', value: '23', icon: Activity, color: 'red' },
          { label: 'Active Locations', value: '156', icon: MapPin, color: 'purple' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Map */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">Live Location Map</h3>
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-8 h-full">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-800">Microsoft Maps Integration</h4>
            <p className="text-gray-600 text-sm">Tracking {activeUsers.length} active users in real-time</p>
          </div>
          
          {/* Mock location pins */}
          {activeUsers.map((user, index) => (
            <div
              key={user.id}
              className="absolute animate-pulse"
              style={{
                top: `${20 + index * 30}%`,
                left: `${30 + index * 20}%`,
              }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">Active Users Right Now</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location (Lat, Lng)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activeUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{user.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {user.activity}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">{user.pet}</td>
                <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                  {user.lat.toFixed(4)}, {user.lng.toFixed(4)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
