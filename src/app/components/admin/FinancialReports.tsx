import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';

export function FinancialReports() {
  const dailyData = [
    { date: '2026-01-06', revenue: 12345.67, transactions: 234, fees: 1234.56, farmerFees: 567.89 },
    { date: '2026-01-05', revenue: 10234.45, transactions: 198, fees: 1023.44, farmerFees: 456.78 },
    { date: '2026-01-04', revenue: 11567.89, transactions: 212, fees: 1156.78, farmerFees: 512.34 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Financial Reports</h2>
          <p className="text-gray-600">Daily transaction reports and revenue tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Revenue', value: '$12,345.67', change: '+18%', trend: 'up' },
          { label: 'Total Transactions', value: '234', change: '+12%', trend: 'up' },
          { label: 'Platform Fees', value: '$1,234.56', change: '+15%', trend: 'up' },
          { label: 'Farmer Fee Waivers', value: '$567.89', change: '-5%', trend: 'down' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className={`flex items-center gap-1 text-sm ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stat.change} from yesterday
            </div>
          </div>
        ))}
      </div>

      {/* Daily Breakdown */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">Daily Financial Breakdown</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform Fees</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Waivers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dailyData.map((day, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{new Date(day.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-medium text-green-600">${day.revenue.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-900">{day.transactions}</td>
                <td className="px-6 py-4 text-gray-900">${day.fees.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-900">${day.farmerFees.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Crypto Transactions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">Cryptocurrency Transactions</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { coin: 'BTC', volume: '0.234', value: '$12,345' },
            { coin: 'ETH', volume: '2.567', value: '$8,234' },
            { coin: 'USDT', volume: '15,234', value: '$15,234' },
          ].map((crypto, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{crypto.coin}</div>
              <div className="text-xl font-bold text-gray-900">{crypto.volume}</div>
              <div className="text-sm text-gray-600">{crypto.value} USD</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
