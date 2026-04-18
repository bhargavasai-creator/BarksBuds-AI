import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Image as ImageIcon, FileText } from 'lucide-react';

interface ModerationResult {
  approved: boolean;
  reason: string;
  flags: string[];
  confidence: number;
  hasAnimal: boolean;
  hasHumanOnly: boolean;
  hasNature: boolean;
}

interface ContentModerationSystemProps {
  onApprove?: (content: any) => void;
  onReject?: (content: any, reason: string) => void;
}

export function ContentModerationSystem({ onApprove, onReject }: ContentModerationSystemProps) {
  const [pendingContent, setPendingContent] = useState<any[]>([]);
  const [moderationHistory, setModerationHistory] = useState<any[]>([]);

  // Simulate AI content moderation
  const moderateContent = async (
    content: {
      type: 'image' | 'text' | 'video';
      data: any;
      userId: string;
      timestamp: string;
    }
  ): Promise<ModerationResult> => {
    // In production, this would call:
    // 1. AI vision API (DeepSeek, Qwen, or custom model) to detect animals/humans/nature
    // 2. Text moderation API for harmful content
    // 3. NSFW detection
    // 4. Country-specific content filtering

    // Simulated AI analysis
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock detection results
    const hasAnimal = Math.random() > 0.3; // 70% chance of animal detection
    const hasHumanOnly = Math.random() > 0.7; // 30% chance of human-only content
    const hasNature = Math.random() > 0.5;
    const hasInappropriate = Math.random() > 0.9; // 10% chance of inappropriate content

    const flags: string[] = [];
    let approved = true;
    let reason = '';

    // Rule 1: Must have animal, pet, or nature in image
    if (!hasAnimal && !hasNature) {
      approved = false;
      reason = 'Content must include animals, pets, or nature. Human-only content is not allowed.';
      flags.push('NO_ANIMAL_OR_NATURE');
    }

    // Rule 2: Human-only content rejected
    if (hasHumanOnly && !hasAnimal && !hasNature) {
      approved = false;
      reason = 'Human-only content without animals or nature is prohibited.';
      flags.push('HUMAN_ONLY');
    }

    // Rule 3: Inappropriate content
    if (hasInappropriate) {
      approved = false;
      reason = 'Content flagged as inappropriate or harmful.';
      flags.push('INAPPROPRIATE');
    }

    // Rule 4: Check text content for harmful words (basic example)
    if (content.type === 'text') {
      const harmfulWords = ['spam', 'scam', 'abuse'];
      const hasHarmful = harmfulWords.some(word => 
        content.data.toLowerCase().includes(word)
      );
      if (hasHarmful) {
        approved = false;
        reason = 'Text contains prohibited words or spam.';
        flags.push('HARMFUL_TEXT');
      }
    }

    return {
      approved,
      reason: approved ? 'Content approved - contains animals/nature' : reason,
      flags,
      confidence: 0.85 + Math.random() * 0.15, // 85-100% confidence
      hasAnimal,
      hasHumanOnly,
      hasNature,
    };
  };

  const handleNewContent = async (content: any) => {
    const result = await moderateContent(content);
    
    const moderatedContent = {
      ...content,
      moderation: result,
      id: Math.random().toString(36).substr(2, 9),
      moderatedAt: new Date().toISOString(),
    };

    if (result.approved) {
      // Auto-approve content that passes
      addToHistory(moderatedContent, 'approved', 'Auto-approved by AI');
      onApprove?.(moderatedContent);
    } else {
      // Send to admin queue for manual review
      setPendingContent(prev => [...prev, moderatedContent]);
      // Store rejected attempt
      storeRejectedAttempt(moderatedContent);
    }

    return result;
  };

  const storeRejectedAttempt = (content: any) => {
    // Store in database for admin review
    const attempts = JSON.parse(localStorage.getItem('rejectedContentAttempts') || '[]');
    attempts.push({
      ...content,
      rejectedAt: new Date().toISOString(),
    });
    localStorage.setItem('rejectedContentAttempts', JSON.stringify(attempts));
  };

  const manualApprove = (contentId: string) => {
    const content = pendingContent.find(c => c.id === contentId);
    if (content) {
      setPendingContent(prev => prev.filter(c => c.id !== contentId));
      addToHistory(content, 'approved', 'Manually approved by admin');
      onApprove?.(content);
    }
  };

  const manualReject = (contentId: string, reason: string) => {
    const content = pendingContent.find(c => c.id === contentId);
    if (content) {
      setPendingContent(prev => prev.filter(c => c.id !== contentId));
      addToHistory(content, 'rejected', reason);
      onReject?.(content, reason);
    }
  };

  const addToHistory = (content: any, status: string, note: string) => {
    const historyItem = {
      ...content,
      status,
      note,
      reviewedAt: new Date().toISOString(),
    };
    setModerationHistory(prev => [historyItem, ...prev]);
    
    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('moderationHistory') || '[]');
    history.unshift(historyItem);
    localStorage.setItem('moderationHistory', JSON.stringify(history.slice(0, 100))); // Keep last 100
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI Content Moderation</h2>
        </div>
        <p className="text-sm opacity-90">
          Protecting our community with AI-powered content filtering
        </p>
      </div>

      {/* Moderation Rules */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">🛡️ Content Guidelines</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900">Required: Animals, Pets, or Nature</div>
              <div className="text-sm text-green-700">Every post must feature animals, pets, or natural elements</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-red-900">Prohibited: Human-Only Content</div>
              <div className="text-sm text-red-700">Photos/videos of only humans without animals or nature are rejected</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900">AI Review Process</div>
              <div className="text-sm text-blue-700">All content is analyzed by AI before publication. Flagged items go to admin review.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-purple-900">Location-Based Filtering</div>
              <div className="text-sm text-purple-700">Dating content limited to same country. News feeds personalized by location.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Moderation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Test Content Moderation</h3>
        <TestModerationForm onSubmit={handleNewContent} />
      </div>

      {/* Pending Review Queue */}
      {pendingContent.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            Pending Admin Review ({pendingContent.length})
          </h3>
          <div className="space-y-4">
            {pendingContent.map((content) => (
              <div key={content.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {content.type === 'image' && <ImageIcon className="w-5 h-5 text-gray-600" />}
                      {content.type === 'text' && <FileText className="w-5 h-5 text-gray-600" />}
                      <span className="font-medium text-gray-900">{content.type.toUpperCase()}</span>
                      <span className="text-sm text-gray-500">• {new Date(content.timestamp).toLocaleString()}</span>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      User: <strong>{content.userId}</strong>
                    </div>

                    <div className="bg-red-100 border border-red-200 rounded p-2 mb-2">
                      <div className="text-sm font-medium text-red-900 mb-1">
                        Rejection Reason:
                      </div>
                      <div className="text-sm text-red-700">{content.moderation.reason}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {content.moderation.flags.map((flag: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                          {flag}
                        </span>
                      ))}
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                        {(content.moderation.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-600">
                      AI Detection: 
                      {content.moderation.hasAnimal && ' ✓ Animal'}
                      {content.moderation.hasNature && ' ✓ Nature'}
                      {content.moderation.hasHumanOnly && ' ⚠️ Human-only'}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => manualApprove(content.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => manualReject(content.id, 'Confirmed violation')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moderation History */}
      {moderationHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Recent Moderation Activity</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {moderationHistory.slice(0, 20).map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  item.status === 'approved'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      {item.status === 'approved' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium">{item.type}</span>
                      <span className="text-gray-500">• {new Date(item.reviewedAt).toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{item.note}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TestModerationForm({ onSubmit }: { onSubmit: (content: any) => void }) {
  const [type, setType] = useState<'image' | 'text' | 'video'>('image');
  const [testData, setTestData] = useState('');
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    
    const content = {
      type,
      data: testData || 'Sample content',
      userId: 'test-user-123',
      timestamp: new Date().toISOString(),
    };

    const moderationResult = await onSubmit(content);
    setResult(moderationResult);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="image">Image/Photo</option>
          <option value="text">Text Post</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Data (optional - for text moderation)
        </label>
        <textarea
          value={testData}
          onChange={(e) => setTestData(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
          placeholder="Enter text to test moderation..."
        />
      </div>

      <button
        onClick={handleTest}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Test Moderation'}
      </button>

      {result && (
        <div
          className={`p-4 rounded-lg border-2 ${
            result.approved
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {result.approved ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <span className="font-bold text-lg">
              {result.approved ? 'APPROVED' : 'REJECTED'}
            </span>
          </div>
          <p className="text-sm mb-3">{result.reason}</p>
          <div className="flex flex-wrap gap-2">
            {result.flags.map((flag, i) => (
              <span key={i} className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                {flag}
              </span>
            ))}
            <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
              {(result.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility function to moderate content before posting
export async function checkContentBeforePost(content: any): Promise<boolean> {
  // This would be imported and used in post creation components
  // Returns true if content is approved, false otherwise
  
  // Simplified version - in production call actual AI API
  const hasAnimal = true; // Replace with actual AI detection
  const hasHumanOnly = false;
  
  if (hasHumanOnly && !hasAnimal) {
    alert('Human-only content is not allowed. Please include your pet, animal, or nature in the photo.');
    return false;
  }
  
  return true;
}
