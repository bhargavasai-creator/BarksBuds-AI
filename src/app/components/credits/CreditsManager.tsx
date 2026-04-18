import React, { useState, useEffect } from 'react';
import { Coins, CreditCard, Zap, TrendingUp, AlertCircle, Check } from 'lucide-react';

interface CreditsManagerProps {
  currentUser: any;
  onUpdateCredits: (newCredits: number) => void;
}

export function CreditsManager({ currentUser, onUpdateCredits }: CreditsManagerProps) {
  const [credits, setCredits] = useState(currentUser?.credits || 1);
  const [tokens, setTokens] = useState(currentUser?.tokens || 0);
  const [subscription, setSubscription] = useState(currentUser?.subscription || 'free');
  const [usageHistory, setUsageHistory] = useState<any[]>([]);

  useEffect(() => {
    // Load from localStorage
    const savedData = localStorage.getItem(`user_${currentUser?.id}_credits`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setCredits(data.credits);
      setTokens(data.tokens);
      setUsageHistory(data.history || []);
    }
  }, [currentUser]);

  const saveToLocalStorage = (newCredits: number, newTokens: number, history: any[]) => {
    localStorage.setItem(
      `user_${currentUser?.id}_credits`,
      JSON.stringify({ credits: newCredits, tokens: newTokens, history })
    );
  };

  // Cost per word in cents
  const COST_PER_WORD = 0.01; // 1 penny per word

  const calculateCost = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const cost = words * COST_PER_WORD;
    return { words, cost };
  };

  const deductCredits = (text: string) => {
    const { words, cost } = calculateCost(text);
    
    if (credits === 1) {
      // First prompt is free
      const newHistory = [
        ...usageHistory,
        {
          date: new Date().toISOString(),
          words,
          cost: 0,
          isFree: true,
          text: text.substring(0, 50) + '...',
        },
      ];
      setCredits(0);
      setUsageHistory(newHistory);
      saveToLocalStorage(0, tokens, newHistory);
      alert('First prompt used (FREE)! Future prompts will cost $' + cost.toFixed(2) + ' for ' + words + ' words.');
      return true;
    }

    if (subscription === 'free') {
      alert(`This requires ${words} words ($${cost.toFixed(2)}). Please subscribe or buy credits!`);
      return false;
    }

    // For paid subscribers, deduct from tokens
    const requiredTokens = Math.ceil(words);
    if (tokens < requiredTokens) {
      alert(`Insufficient tokens! You need ${requiredTokens} tokens but have ${tokens}.`);
      return false;
    }

    const newTokens = tokens - requiredTokens;
    const newHistory = [
      ...usageHistory,
      {
        date: new Date().toISOString(),
        words,
        cost,
        tokens: requiredTokens,
        text: text.substring(0, 50) + '...',
      },
    ];
    
    setTokens(newTokens);
    setUsageHistory(newHistory);
    saveToLocalStorage(credits, newTokens, newHistory);
    onUpdateCredits(credits);
    
    return true;
  };

  const buyTokens = (amount: number) => {
    // In production, integrate with payment gateway (Stripe, crypto wallet, etc.)
    const cost = (amount * COST_PER_WORD * 100).toFixed(2); // Cost for 100 words per token
    
    if (confirm(`Buy ${amount} tokens for $${cost}?`)) {
      const newTokens = tokens + amount;
      setTokens(newTokens);
      saveToLocalStorage(credits, newTokens, usageHistory);
      alert('Tokens purchased successfully!');
    }
  };

  const subscribe = (plan: 'basic' | 'premium' | 'pro') => {
    const plans = {
      basic: { price: 9.99, tokens: 10000 },
      premium: { price: 24.99, tokens: 30000 },
      pro: { price: 49.99, tokens: 100000 },
    };

    const selected = plans[plan];
    
    if (confirm(`Subscribe to ${plan.toUpperCase()} plan for $${selected.price}/month? You'll get ${selected.tokens} tokens.`)) {
      setSubscription(plan);
      setTokens(tokens + selected.tokens);
      saveToLocalStorage(credits, tokens + selected.tokens, usageHistory);
      
      // Save subscription to user profile
      const updatedUser = {
        ...currentUser,
        subscription: plan,
        subscriptionDate: new Date().toISOString(),
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      alert('Subscription activated! Enjoy your tokens.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Balance</h2>
          <Coins className="w-8 h-8" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm opacity-90 mb-1">Free Credits</div>
            <div className="text-3xl font-bold">{credits}</div>
            <div className="text-xs opacity-75 mt-1">First prompt free!</div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm opacity-90 mb-1">Tokens</div>
            <div className="text-3xl font-bold">{tokens.toLocaleString()}</div>
            <div className="text-xs opacity-75 mt-1">~{Math.floor(tokens / 100)} words</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Subscription: <strong>{subscription.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      {subscription === 'free' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Subscription Plans</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: 'basic', name: 'Basic', price: 9.99, tokens: 10000, features: ['10,000 tokens/month', 'All features', 'Email support'] },
              { id: 'premium', name: 'Premium', price: 24.99, tokens: 30000, features: ['30,000 tokens/month', 'Priority support', 'Advanced AI'] },
              { id: 'pro', name: 'Pro', price: 49.99, tokens: 100000, features: ['100,000 tokens/month', '24/7 support', 'All AI models', 'Custom branding'] },
            ].map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 hover:border-purple-500 transition-colors">
                <h4 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h4>
                <div className="text-3xl font-bold text-purple-600 mb-4">
                  ${plan.price}
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => subscribe(plan.id as any)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buy Tokens */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Buy More Tokens
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1000, 5000, 10000, 25000].map((amount) => (
            <button
              key={amount}
              onClick={() => buyTokens(amount)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <div className="text-2xl font-bold text-purple-600">{amount}</div>
              <div className="text-sm text-gray-600 mt-1">tokens</div>
              <div className="text-xs text-gray-500 mt-2">
                ${(amount * COST_PER_WORD).toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Crypto Payment Option */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Crypto Payments Supported
        </h3>
        <p className="text-sm opacity-90 mb-4">
          Pay with Bitcoin, Ethereum, USDT, or other cryptocurrencies
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">BTC</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">ETH</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">USDT</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs">USDC</span>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          Usage History
        </h3>
        {usageHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No usage history yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {usageHistory.slice().reverse().map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.text}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {item.isFree ? 'FREE' : `$${item.cost.toFixed(2)}`}
                  </div>
                  <div className="text-xs text-gray-500">{item.words} words</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-bold text-blue-900 mb-2">💰 Pricing Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• First prompt is <strong>completely FREE</strong></li>
          <li>• After that: <strong>$0.01 per word</strong> (1 penny)</li>
          <li>• Subscribe for monthly tokens at discounted rates</li>
          <li>• No ads - 100% subscription-based platform</li>
          <li>• All features unlocked for subscribers</li>
        </ul>
      </div>
    </div>
  );
}

// Utility hook to use credits system in other components
export function useCreditsSystem(currentUser: any) {
  const [credits, setCredits] = useState(currentUser?.credits || 1);
  const [tokens, setTokens] = useState(currentUser?.tokens || 0);

  const canAfford = (text: string) => {
    if (credits > 0) return true;
    
    const words = text.trim().split(/\s+/).length;
    const requiredTokens = Math.ceil(words);
    return tokens >= requiredTokens;
  };

  const deduct = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    
    if (credits > 0) {
      setCredits(0);
      return true;
    }
    
    const requiredTokens = Math.ceil(words);
    if (tokens >= requiredTokens) {
      setTokens(tokens - requiredTokens);
      return true;
    }
    
    return false;
  };

  return { credits, tokens, canAfford, deduct };
}
