import React from 'react';
import { Video, TrendingUp, Eye, MousePointerClick } from 'lucide-react';

export function MarketingConsole() {
  const campaigns = [
    {
      id: '1',
      name: 'Summer Pet Care Campaign',
      type: 'Video Ad',
      status: 'active',
      impressions: 45234,
      clicks: 3421,
      conversions: 234,
      spend: 1234.56,
      ctr: 7.56,
    },
    {
      id: '2',
      name: 'New User Acquisition',
      type: 'Sponsored Posts',
      status: 'paused',
      impressions: 23456,
      clicks: 1890,
      conversions: 145,
      spend: 890.23,
      ctr: 8.05,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Marketing Console</h2>
        <p className="text-gray-600">Manage advertising campaigns and performance</p>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Impressions', value: '68.7K', icon: Eye, color: 'blue' },
          { label: 'Total Clicks', value: '5.3K', icon: MousePointerClick, color: 'purple' },
          { label: 'Conversions', value: '379', icon: TrendingUp, color: 'green' },
          { label: 'Total Spend', value: '$2,124', icon: Video, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <Icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">Active Campaigns</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{campaign.name}</div>
                  <div className="text-sm text-gray-500">{campaign.type}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">{campaign.impressions.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-900">{campaign.clicks.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-900">{campaign.ctr}%</td>
                <td className="px-6 py-4 text-gray-900">${campaign.spend.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
