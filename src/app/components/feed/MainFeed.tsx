import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Sparkles, TrendingUp } from 'lucide-react';

// Main Feed Component
// AI-powered personalized feed based on user search history, interactions, and pet preferences
// Uses Qwen/DeepSeek API for content curation (mock implementation)
interface MainFeedProps {
  currentUser: any;
}

export function MainFeed({ currentUser }: MainFeedProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('for_you');

  // Mock AI-powered feed generation
  useEffect(() => {
    generateAIFeed();
  }, [selectedFilter, currentUser]);

  // Generate personalized feed using AI algorithm
  const generateAIFeed = async () => {
    setLoading(true);
    
    // Simulate AI API call (Qwen/DeepSeek)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock posts - In production: Fetch from server with AI relevance scores
    const mockPosts = [
      {
        postId: '1',
        author: {
          name: 'Sarah Johnson',
          avatar: '👩',
          petName: 'Max',
          petEmoji: '🐕',
        },
        content: 'Beautiful morning walk with Max! We discovered a new trail with amazing views 🌄',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
        likes: 234,
        comments: 18,
        shares: 5,
        timestamp: '2 hours ago',
        aiRelevanceScore: 95.5,
        isLiked: false,
        isBookmarked: false,
        tags: ['walking', 'outdoors', 'golden_retriever'],
      },
      {
        postId: '2',
        author: {
          name: 'Mike Chen',
          avatar: '👨',
          petName: 'Luna',
          petEmoji: '🐈',
        },
        content: 'Luna turned 5 today! Celebrating with her favorite treats 🎂🎉',
        mediaType: 'carousel',
        mediaUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        likes: 567,
        comments: 42,
        shares: 12,
        timestamp: '5 hours ago',
        aiRelevanceScore: 88.2,
        isLiked: true,
        isBookmarked: false,
        tags: ['birthday', 'celebration', 'cat'],
      },
      {
        postId: '3',
        author: {
          name: 'Emma Davis',
          avatar: '👩',
          petName: 'Buddy',
          petEmoji: '🐰',
        },
        content: 'Just got back from the vet - Buddy is healthy and happy! Regular checkups are so important 💚',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800',
        likes: 189,
        comments: 24,
        shares: 8,
        timestamp: '1 day ago',
        aiRelevanceScore: 82.7,
        isLiked: false,
        isBookmarked: true,
        tags: ['health', 'veterinary', 'rabbit'],
      },
      {
        postId: '4',
        author: {
          name: 'Critter News',
          avatar: '📰',
          petName: null,
          petEmoji: null,
        },
        content: '🔬 New study shows that regular walks improve pet mental health by 47%. Read more about the science behind pet wellness!',
        mediaType: 'article',
        mediaUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
        likes: 1203,
        comments: 95,
        shares: 234,
        timestamp: '3 hours ago',
        aiRelevanceScore: 91.3,
        isLiked: false,
        isBookmarked: false,
        tags: ['science', 'health', 'research'],
      },
    ];

    setPosts(mockPosts);
    setLoading(false);
  };

  // Handle post interactions
  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.postId === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.postId === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  // Filter options
  const filters = [
    { id: 'for_you', label: 'For You', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'following', label: 'Following', icon: Heart },
  ];

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Personalization Notice */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-md p-4 text-white">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <div className="flex-1">
            <div className="font-medium">AI-Powered Feed</div>
            <div className="text-sm opacity-90">
              Personalized based on your interests, search history, and pet interactions
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.postId} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {post.author.name}
                      {post.author.petName && (
                        <span className="text-sm text-gray-500">
                          with {post.author.petEmoji} {post.author.petName}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{post.timestamp}</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-800">{post.content}</p>
              </div>

              {/* Post Media */}
              {post.mediaUrl && (
                <div className="relative">
                  <img
                    src={post.mediaUrl}
                    alt={post.content}
                    className="w-full h-96 object-cover"
                  />
                  {/* AI Relevance Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {post.aiRelevanceScore.toFixed(1)}% match
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{post.likes.toLocaleString()} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleLike(post.postId)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      post.isLiked
                        ? 'text-pink-500 bg-pink-50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">Like</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Comment</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">Share</span>
                  </button>

                  <button
                    onClick={() => handleBookmark(post.postId)}
                    className={`p-2 rounded-lg transition-all ${
                      post.isBookmarked
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-6">
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
          Load More Posts
        </button>
      </div>
    </div>
  );
}
