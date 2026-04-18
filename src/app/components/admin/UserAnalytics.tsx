import React from 'react';
import { Users, TrendingUp, Activity, Calendar } from 'lucide-react';

export function UserAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">User Analytics</h2>
        <p className="text-gray-600">Detailed user behavior and engagement metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '45,234', change: '+12%', icon: Users },
          { label: 'Active Today', value: '8,456', change: '+5%', icon: Activity },
          { label: 'Avg. Session', value: '12m 34s', change: '+8%', icon: Calendar },
          { label: 'Retention Rate', value: '78%', change: '+3%', icon: TrendingUp },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-green-600">{stat.change} from last week</div>
            </div>
          );
        })}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">User Growth (Last 30 Days)</h3>
        <div className="flex items-end gap-2 h-64">
          {Array.from({ length: 30 }).map((_, index) => {
            const height = 30 + Math.random() * 70;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`Day ${index + 1}: ${Math.floor(height * 100)} new users`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Top Activities</h3>
          <div className="space-y-3">
            {[
              { activity: 'Viewing Feed', count: 23456, percentage: 45 },
              { activity: 'Walking Pets', count: 12345, percentage: 28 },
              { activity: 'Dating/Matching', count: 8234, percentage: 18 },
              { activity: 'Marketplace', count: 4567, percentage: 9 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.activity}</span>
                  <span className="text-gray-600">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">User Demographics</h3>
          <div className="space-y-3">
            {[
              { label: 'Age 18-24', count: 8234, color: 'blue' },
              { label: 'Age 25-34', count: 15678, color: 'purple' },
              { label: 'Age 35-44', count: 12345, color: 'green' },
              { label: 'Age 45+', count: 8977, color: 'orange' },
            ].map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 bg-${demo.color}-500 rounded-full`}></div>
                  <span className="text-gray-700">{demo.label}</span>
                </div>
                <span className="font-medium text-gray-900">{demo.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
