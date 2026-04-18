import React, { useState } from 'react';
import { AlertCircle, Check, X, Eye, Flag } from 'lucide-react';

export function ContentModeration() {
  const [filter, setFilter] = useState('all');

  const queueItems = [
    {
      id: '1',
      type: 'post',
      content: 'Check out my new puppy! So cute!',
      author: 'user_12345',
      reportReason: 'Spam',
      aiFlag: null,
      priority: 'low',
      timestamp: '5 mins ago',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
    },
    {
      id: '2',
      type: 'ad',
      content: 'Premium Pet Food - 50% OFF',
      author: 'advertiser_789',
      reportReason: null,
      aiFlag: 'Inappropriate content detected',
      priority: 'high',
      timestamp: '10 mins ago',
      image: null,
    },
    {
      id: '3',
      type: 'comment',
      content: 'Great post! Love your pet!',
      author: 'user_67890',
      reportReason: 'Harassment',
      aiFlag: null,
      priority: 'medium',
      timestamp: '15 mins ago',
      image: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Content Moderation</h2>
        <p className="text-gray-600">Review and moderate reported content</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All', count: 23 },
          { id: 'pending', label: 'Pending', count: 15 },
          { id: 'flagged', label: 'AI Flagged', count: 5 },
          { id: 'urgent', label: 'Urgent', count: 3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === tab.id
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Queue Items */}
      <div className="space-y-4">
        {queueItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
              item.priority === 'high'
                ? 'border-red-500'
                : item.priority === 'medium'
                ? 'border-yellow-500'
                : 'border-blue-500'
            }`}
          >
            <div className="flex gap-4">
              {item.image && (
                <img src={item.image} alt="Content" className="w-24 h-24 object-cover rounded-lg" />
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.type}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : item.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.priority} priority
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Author: {item.author} • {item.timestamp}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-gray-900 mb-2">{item.content}</div>
                  
                  {item.reportReason && (
                    <div className="flex items-center gap-2 text-sm text-orange-700 bg-orange-50 px-3 py-2 rounded-lg w-fit">
                      <Flag className="w-4 h-4" />
                      Reported: {item.reportReason}
                    </div>
                  )}
                  
                  {item.aiFlag && (
                    <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg w-fit mt-2">
                      <AlertCircle className="w-4 h-4" />
                      AI Flag: {item.aiFlag}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
