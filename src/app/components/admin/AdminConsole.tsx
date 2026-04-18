import React, { useState } from 'react';
import { X, Users, DollarSign, FileText, TrendingUp, MapPin, Video, AlertCircle, Shield } from 'lucide-react';
import { EmployeeManagement } from './EmployeeManagement';
import { ContentModeration } from './ContentModeration';
import { MarketingConsole } from './MarketingConsole';
import { FinancialReports } from './FinancialReports';
import { LiveMonitoring } from './LiveMonitoring';
import { UserAnalytics } from './UserAnalytics';

// Admin Console - Main Hub
// Multiple specialized consoles for managing the platform
interface AdminConsoleProps {
  onClose: () => void;
  currentUser: any;
}

export function AdminConsole({ onClose, currentUser }: AdminConsoleProps) {
  const [activeConsole, setActiveConsole] = useState('dashboard');

  const consoles = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'content', label: 'Content Moderation', icon: Shield },
    { id: 'marketing', label: 'Marketing', icon: Video },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'monitoring', label: 'Live Monitoring', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-purple-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Admin Console</h1>
            <p className="text-sm opacity-90">Critter Affinity Platform Management</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-76px)]">
          <nav className="p-4 space-y-2">
            {consoles.map((console) => {
              const Icon = console.icon;
              return (
                <button
                  key={console.id}
                  onClick={() => setActiveConsole(console.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeConsole === console.id
                      ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{console.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeConsole === 'dashboard' && <AdminDashboard />}
          {activeConsole === 'employees' && <EmployeeManagement />}
          {activeConsole === 'content' && <ContentModeration />}
          {activeConsole === 'marketing' && <MarketingConsole />}
          {activeConsole === 'financial' && <FinancialReports />}
          {activeConsole === 'monitoring' && <LiveMonitoring />}
          {activeConsole === 'analytics' && <UserAnalytics />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Component
function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '45,234', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Now', value: '8,456', change: '+5%', icon: TrendingUp, color: 'green' },
    { label: 'Revenue Today', value: '$12,345', change: '+18%', icon: DollarSign, color: 'purple' },
    { label: 'Pending Reviews', value: '23', change: '-8%', icon: AlertCircle, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from yesterday
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-xl mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registered', user: 'john@example.com', time: '2 mins ago', type: 'success' },
            { action: 'Content reported', content: 'Post #12345', time: '5 mins ago', type: 'warning' },
            { action: 'Transaction completed', amount: '$45.99', time: '10 mins ago', type: 'success' },
            { action: 'Ad approved', advertiser: 'PetCo', time: '15 mins ago', type: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{activity.action}</div>
                <div className="text-sm text-gray-600">
                  {activity.user || activity.content || activity.amount || activity.advertiser}
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <Users className="w-8 h-8 mb-2" />
          <div className="font-bold text-lg">Manage Users</div>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <Shield className="w-8 h-8 mb-2" />
          <div className="font-bold text-lg">Review Content</div>
        </button>
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl hover:shadow-xl transition-shadow">
          <DollarSign className="w-8 h-8 mb-2" />
          <div className="font-bold text-lg">View Reports</div>
        </button>
      </div>
    </div>
  );
}
