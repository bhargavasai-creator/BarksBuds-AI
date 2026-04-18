import React, { useState, useEffect } from 'react';

interface AnimalParadeItem {
  scene?: string;
  char?: string;
  size?: string;
  anim?: string;
}

export function AnimatedLanding({ onGetStarted }: { onGetStarted: () => void }) {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [messages, setMessages] = useState<Array<{from: string, text: string}>>([{from: 'Grok', text: 'Hi! Ask about any colorful critter 🐾'}]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if cookies already accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setTimeout(() => setShowCookieConsent(true), 1000);
    }

    // Capture device info
    setDeviceInfo(navigator.userAgent);

    // Get IP address (simulated - in production use a backend service)
    // In production, call your backend API which uses a service like ipify
    setIpAddress('Detecting...');
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('deviceInfo', deviceInfo);
    localStorage.setItem('capturedAt', new Date().toISOString());
    setShowCookieConsent(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { from: 'You', text: inputValue.trim() }]);
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint and key
      const apiKey = import.meta.env.VITE_GROK_API_KEY || '';
      const response = await fetch('https://api.x.ai/v1/grok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: `You are Grok, created by xAI. Answer the following question about animals: ${inputValue.trim()}`
        })
      });
      
      const data = await response.json();
      const reply = data.choices?.[0]?.text?.trim() || 'Sorry, I had trouble answering that. Please try again!';
      
      setMessages(prev => [...prev, { from: 'Grok', text: reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { from: 'Grok', text: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const parade: AnimalParadeItem[] = [
    { scene: 'marine' },
    { scene: 'prehistoric' },
    { scene: 'jungle' },
    { scene: 'savanna' },
    { scene: 'lion' },
    { char: '🦒', size: 'size-30', anim: 'gallop' },
    { char: '🦓', size: 'size-26', anim: 'gallop' },
    { char: '🦌', size: 'size-25', anim: 'gallop' },
    { char: '🦊', size: 'size-24', anim: 'bob' },
    { char: '🦎', size: 'size-24', anim: 'slither' },
    { char: '🐕', size: 'size-23', anim: 'bob' },
    { char: '🐈', size: 'size-22', anim: 'bob' },
    { char: '🐇', size: 'size-21', anim: 'hop' },
    { char: '😺', size: 'size-21', anim: 'bob' },
    { char: '🦮', size: 'size-21', anim: 'bob' },
    { char: '🐘', size: 'size-31', anim: 'lumber' },
    { char: '🦏', size: 'size-30', anim: 'lumber' },
    { char: '🦛', size: 'size-29', anim: 'lumber' },
    { char: '🐫', size: 'size-28', anim: 'lumber' },
    { char: '🐆', size: 'size-27', anim: 'bob' },
    { char: '🐒', size: 'size-24', anim: 'hop' },
    { char: '🦝', size: 'size-23', anim: 'bob' },
    { char: '🐿️', size: 'size-22', anim: 'hop' },
    { char: '🦔', size: 'size-21', anim: 'bob' },
    { char: '🐃', size: 'size-28', anim: 'lumber' },
    { char: '🐂', size: 'size-27', anim: 'lumber' },
    { char: '🐄', size: 'size-26', anim: 'lumber' },
    { char: '🐎', size: 'size-26', anim: 'gallop' },
    { char: '🦙', size: 'size-25', anim: 'bob' },
    { char: '🦘', size: 'size-26', anim: 'hop' },
    { char: '🦡', size: 'size-23', anim: 'bob' },
    { char: '🦜', size: 'size-22', anim: 'swoop' },
    { char: '🦅', size: 'size-24', anim: 'swoop' },
    { char: '🦢', size: 'size-23', anim: 'bob' },
    { char: '🦚', size: 'size-24', anim: 'bob' },
    { char: '🦩', size: 'size-23', anim: 'bob' },
    { char: '🦉', size: 'size-22', anim: 'swoop' },
    { char: '🦇', size: 'size-21', anim: 'swoop' },
    { char: '🐍', size: 'size-23', anim: 'slither' },
    { char: '🐢', size: 'size-22', anim: 'bob' },
    { char: '🐊', size: 'size-25', anim: 'slither' },
    { char: '🦑', size: 'size-23', anim: 'bob' },
    { char: '🐙', size: 'size-24', anim: 'bob' },
    { char: '🦐', size: 'size-21', anim: 'bob' },
    { char: '🦞', size: 'size-22', anim: 'bob' },
    { char: '🦀', size: 'size-22', anim: 'bob' },
    { char: '🐡', size: 'size-21', anim: 'bob' },
    { char: '🐠', size: 'size-21', anim: 'swim' },
    { char: '🐬', size: 'size-24', anim: 'bob' },
    { char: '🦈', size: 'size-26', anim: 'bob' },
    { char: '🐳', size: 'size-28', anim: 'bob' },
    { char: '🐼', size: 'size-24', anim: 'bob' },
    { char: '🦣', size: 'size-30', anim: 'lumber' },
    { char: '🦥', size: 'size-22', anim: 'bob' },
    { char: '🦦', size: 'size-22', anim: 'bob' },
    { char: '🦨', size: 'size-21', anim: 'bob' },
    { char: '🦬', size: 'size-27', anim: 'lumber' },
    { char: '🦁', size: 'size-28', anim: 'bob' },
    { char: '🐯', size: 'size-27', anim: 'bob' },
  ];

  const buildParadeItem = (p: AnimalParadeItem, i: number) => {
    if (p.scene === 'marine') {
      return (
        <div key={`marine-${i}`} className="marine-group">
          <span className="whale animal">🐋</span>
          <span className="fish animal">🐠</span>
        </div>
      );
    }
    if (p.scene === 'prehistoric') {
      return (
        <div key={`prehistoric-${i}`} className="prehistoric-group">
          <span className="trex animal">🦖</span>
          <span className="raptor animal-hop">🦖</span>
        </div>
      );
    }
    if (p.scene === 'jungle') {
      return (
        <div key={`jungle-${i}`} className="jungle-group">
          <span className="jaguar animal">🐆</span>
          <span className="parrot animal-swoop">🦜</span>
        </div>
      );
    }
    if (p.scene === 'savanna') {
      return (
        <div key={`savanna-${i}`} className="savanna-group">
          <span className="giraffe animal-gallop">🦒</span>
          <span className="zebra animal-gallop">🦓</span>
        </div>
      );
    }
    if (p.scene === 'lion') {
      return (
        <div key={`lion-${i}`} className="lion-group">
          <span className="lion animal">🦁</span>
          <span className="cub">🦁</span>
          <span className="cub">🦁</span>
        </div>
      );
    }
    return (
      <span key={i} className={`animal animal-${p.anim} ${p.size}`}>
        {p.char}
      </span>
    );
  };

  const builtParade = parade.map((p, i) => buildParadeItem(p, i));
  const doubledParade = [...builtParade, ...builtParade.map((element, idx) => {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, { key: `dup-${idx}` });
    }
    return element;
  })];

  // Auto-scroll messages to bottom
  useEffect(() => {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          
          @keyframes walkLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          
          @keyframes hop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          
          @keyframes swoop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px) rotate(-10deg); }
          }
          
          @keyframes slither {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(4px); }
          }
          
          @keyframes gallop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px) rotate(3deg); }
          }
          
          @keyframes lumber {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          
          @keyframes swim {
            0% { transform: translateX(0); }
            100% { transform: translateX(-3.2rem); }
          }
          
          @keyframes play {
            from { transform: translateY(0); }
            to { transform: translateY(-8px); }
          }

          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          .logo-text {
            font-family: 'Dancing Script', cursive;
            font-size: clamp(3.5rem, 8vw, 8rem);
            text-shadow: 0 0 15px rgba(255,255,255,.35);
            margin-bottom: 0.25rem;
          }
          
          .logo-text span {
            display: inline-block;
            animation: bounce 1.6s ease-in-out infinite;
            animation-delay: 0s;
          }
          .logo-text .delay-0 { animation-delay: 0s; }
          .logo-text .delay-1 { animation-delay: 0.08s; }
          .logo-text .delay-2 { animation-delay: 0.16s; }
          .logo-text .delay-3 { animation-delay: 0.24s; }
          .logo-text .delay-4 { animation-delay: 0.32s; }
          .logo-text .delay-5 { animation-delay: 0.40s; }
          .logo-text .delay-6 { animation-delay: 0.48s; }
          .logo-text .delay-7 { animation-delay: 0.56s; }
          .logo-text .delay-8 { animation-delay: 0.64s; }
          .logo-text .delay-9 { animation-delay: 0.72s; }
          .logo-text .delay-10 { animation-delay: 0.80s; }
          .logo-text .delay-11 { animation-delay: 0.88s; }
          .logo-text .delay-12 { animation-delay: 0.96s; }
          .logo-text .delay-13 { animation-delay: 1.04s; }
          .logo-text .delay-14 { animation-delay: 1.12s; }
          
          .tagline-text {
            font-family: 'Dancing Script', cursive;
            font-size: clamp(1.2rem, 3vw, 2rem);
            font-weight: 700;
            background: linear-gradient(90deg, #60a5fa, #4ade80, #facc15, #f87171);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            white-space: nowrap;
          }
          
          .parade-wrapper {
            overflow: hidden;
            width: 100%;
            max-width: 90vw;
            margin-bottom: 0.75rem;
          }
          
          .parade-track {
            display: flex;
            gap: 1.5rem;
            animation: walkLeft 60s linear infinite;
          }
          
          .animal {
            display: inline-block;
            animation: bob 2s ease-in-out infinite;
          }
          
          .animal-hop { animation: hop 1.8s ease-in-out infinite; }
          .animal-swoop { animation: swoop 2.2s ease-in-out infinite; }
          .animal-slither { animation: slither 1.6s ease-in-out infinite; }
          .animal-gallop { animation: gallop 2s ease-in-out infinite; }
          .animal-lumber { animation: lumber 2.4s ease-in-out infinite; }
          
          .marine-group { position: relative; display: flex; align-items: flex-end; }
          .whale { font-size: 3.6rem; }
          .fish { font-size: 1.8rem; position: absolute; right: -2.8rem; bottom: .4rem; animation: swim 4s linear infinite; }
          
          .jungle-group { display: flex; align-items: flex-end; gap: .4rem; }
          .jaguar { font-size: 2.8rem; }
          .parrot { font-size: 1.6rem; animation: swoop 1.8s ease-in-out infinite; }
          
          .savanna-group { display: flex; align-items: flex-end; gap: .6rem; }
          .giraffe { font-size: 3.2rem; }
          .zebra { font-size: 2.6rem; animation: gallop 2s ease-in-out infinite; }
          
          .prehistoric-group { display: flex; align-items: flex-end; gap: .4rem; }
          .trex { font-size: 3.4rem; }
          .raptor { font-size: 2.0rem; animation: hop 1.6s ease-in-out infinite; }
          
          .lion-group { display: flex; align-items: flex-end; gap: .4rem; }
          .lion { font-size: 2.8rem; }
          .cub { font-size: 1.4rem; animation: play 1.4s ease-in-out infinite alternate; }
          
          .size-32 { font-size: 3.2rem; }
          .size-31 { font-size: 3.1rem; }
          .size-30 { font-size: 3.0rem; }
          .size-29 { font-size: 2.9rem; }
          .size-28 { font-size: 2.8rem; }
          .size-27 { font-size: 2.7rem; }
          .size-26 { font-size: 2.6rem; }
          .size-25 { font-size: 2.5rem; }
          .size-24 { font-size: 2.4rem; }
          .size-23 { font-size: 2.3rem; }
          .size-22 { font-size: 2.2rem; }
          .size-21 { font-size: 2.1rem; }

          .cookie-banner {
            animation: slideUp 0.5s ease-out;
          }

          /* Chatbox Styles */
          .chat-container {
            width: min(92vw, 500px);
            margin-top: 0.75rem;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
          }
          
          .chat-messages {
            height: 200px;
            overflow-y: auto;
            padding: 0.75rem;
            font-family: monospace;
            font-size: 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .chat-message {
            padding: 0.4rem 0.7rem;
            border-radius: 0.5rem;
            max-width: 85%;
          }
          
          .chat-message-user {
            background: rgba(250, 204, 21, 0.2);
            border-left: 3px solid #facc15;
            align-self: flex-end;
          }
          
          .chat-message-grok {
            background: rgba(96, 165, 250, 0.2);
            border-left: 3px solid #60a5fa;
            align-self: flex-start;
          }
          
          .chat-message strong {
            font-weight: bold;
            margin-right: 0.5rem;
          }
          
          .chat-input-container {
            display: flex;
            gap: 0.5rem;
            padding: 0.75rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .chat-input {
            flex: 1;
            padding: 0.5rem 0.75rem;
            border-radius: 0.6rem;
            border: 2px solid #facc15;
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-family: monospace;
            outline: none;
            font-size: 0.85rem;
          }
          
          .chat-input:focus {
            border-color: #60a5fa;
          }
          
          .chat-send-button {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #facc15, #f59e0b);
            border: none;
            border-radius: 0.6rem;
            font-weight: bold;
            cursor: pointer;
            color: black;
            transition: transform 0.2s;
            font-size: 0.85rem;
          }
          
          .chat-send-button:hover:not(:disabled) {
            transform: scale(1.05);
          }
          
          .chat-send-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          /* Scrollbar styling */
          .chat-messages::-webkit-scrollbar {
            width: 6px;
          }
          
          .chat-messages::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          
          .chat-messages::-webkit-scrollbar-thumb {
            background: #facc15;
            border-radius: 3px;
          }
        `}
      </style>

      <div className="text-center flex flex-col items-center max-w-4xl px-4">
        {/* Logo */}
        <h1 className="logo-text">
          {'CritterAffinity'.split('').map((c, i) => (
            <span key={i} className={`logo-char delay-${i}`}>
              {c}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="tagline-text">
          Every Color · Every Creature · Connecting animals & Humans through Critter Affinity
        </p>

        {/* Animal Parade */}
        <div className="parade-wrapper">
          <div className="parade-track">{doubledParade}</div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="px-8 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-2xl"
        >
          Get Started 🐾
        </button>

        {/* Search Engine / Chatbox */}
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`chat-message ${msg.from === 'You' ? 'chat-message-user' : 'chat-message-grok'}`}
              >
                <strong>{msg.from}:</strong> {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-grok">
                <strong>Grok:</strong> <span className="animate-pulse">Thinking... 🤔</span>
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about animals... 🦁"
              className="chat-input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              className="chat-send-button"
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="cookie-banner fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-yellow-400/50 p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-md mb-1 text-yellow-400">🍪 Cookie & Privacy Notice</h3>
              <p className="text-xs text-gray-300">
                We use cookies to enhance your experience and collect device information for security and analytics. 
                By accepting, you agree to our data collection practices.
              </p>
            </div>
            <button
              onClick={handleAcceptCookies}
              className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors whitespace-nowrap text-sm"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center text-xs p-1 text-gray-500 bg-black/50">
        © {new Date().getFullYear()} CritterAffinity LLC.
      </footer>
    </div>
  );
}