import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Activity, ShoppingBag, Users, Settings, Video, Gamepad2, Film, Newspaper, TreePine, Bell, Coins, UserCircle, Shield, Calendar, FileText, Globe } from 'lucide-react';
import { AnimatedLanding } from './components/landing/AnimatedLanding';
import { EnhancedAuth } from './components/auth/EnhancedAuth';
import { AuthScreen } from './components/auth/AuthScreen';
import { MainFeed } from './components/feed/MainFeed';
import { DatingScreen } from './components/dating/DatingScreen';
import { MarketplaceScreen } from './components/marketplace/MarketplaceScreen';
import { HealthTrackingScreen } from './components/health/HealthTrackingScreen';
import { MapScreen } from './components/maps/MapScreen';
import { ServicesScreen } from './components/services/ServicesScreen';
import { GamesScreen } from './components/games/GamesScreen';
import { MemorialScreen } from './components/memorial/MemorialScreen';
import { AdminConsole } from './components/admin/AdminConsole';
import { UserProfile } from './components/profile/UserProfile';
import { LiveStreamScreen } from './components/entertainment/LiveStreamScreen';
import { AnimalEncyclopedia } from './components/encyclopedia/AnimalEncyclopedia';
import { CreditsManager } from './components/credits/CreditsManager';
import { MultiProfileManager } from './components/profiles/MultiProfileManager';
import { ContentModerationSystem } from './components/moderation/ContentModerationSystem';
import { PetInsurance } from './components/insurance/PetInsurance';
import { PetCalendar } from './components/calendar/PetCalendar';
import { LanguageSelector } from './components/language/LanguageSelector';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsAndConditions } from './components/legal/TermsAndConditions';

// Main App Component for Critter Affinity
// Complete Pet Social Network & Health Tracking Platform
// © 2025 Critter Affinity LLC - All Rights Reserved
export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState('feed');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    // Check for language preference
    const hasLanguage = localStorage.getItem('userLanguage');
    if (!hasLanguage) {
      setShowLanguageSelector(true);
    }

    // Check if user has seen landing page
    const hasSeenLanding = localStorage.getItem('hasSeenLanding');
    if (hasSeenLanding) {
      setShowLanding(false);
    }

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setShowLanding(false);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenLanding', 'true');
    setShowLanding(false);
  };

  // Handle user login
  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleUpdateCredits = (newCredits: number) => {
    const updatedUser = { ...currentUser, credits: newCredits };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      setCurrentUser(null);
      setIsAuthenticated(false);
      setIsAdminMode(false);
      setActiveScreen('feed');
      setShowLanding(true);
      localStorage.removeItem('currentUser');
    }
  };

  // Show language selector on first visit
  if (showLanguageSelector && !showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <LanguageSelector 
          showOnStartup={true}
          onLanguageChange={() => setShowLanguageSelector(false)}
        />
      </div>
    );
  }

  // Show landing page
  if (showLanding) {
    return <AnimatedLanding onGetStarted={handleGetStarted} />;
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <EnhancedAuth onLogin={handleLogin} />;
  }

  // Show admin console if in admin mode
  if (isAdminMode) {
    return (
      <AdminConsole
        onClose={() => setIsAdminMode(false)}
        currentUser={currentUser}
      />
    );
  }

  // Main navigation items
  const navigationItems = [
    { id: 'feed', label: 'Feed', icon: Newspaper },
    { id: 'dating', label: 'Dating', icon: Heart },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'marketplace', label: 'Shop', icon: ShoppingBag },
    { id: 'services', label: 'Services', icon: Users },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'streams', label: 'Live', icon: Video },
    { id: 'memorial', label: 'Memorial', icon: TreePine },
    { id: 'encyclopedia', label: 'Animals', icon: Film },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'credits', label: 'Credits', icon: Coins },
    { id: 'profiles', label: 'Profiles', icon: UserCircle },
  ];

  // Render active screen
  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return <MainFeed currentUser={currentUser} />;
      case 'dating':
        return <DatingScreen currentUser={currentUser} />;
      case 'health':
        return <HealthTrackingScreen currentUser={currentUser} />;
      case 'map':
        return <MapScreen currentUser={currentUser} />;
      case 'marketplace':
        return <MarketplaceScreen currentUser={currentUser} />;
      case 'services':
        return <ServicesScreen currentUser={currentUser} />;
      case 'games':
        return <GamesScreen currentUser={currentUser} />;
      case 'streams':
        return <LiveStreamScreen currentUser={currentUser} />;
      case 'memorial':
        return <MemorialScreen currentUser={currentUser} />;
      case 'encyclopedia':
        return <AnimalEncyclopedia />;
      case 'insurance':
        return <PetInsurance currentUser={currentUser} />;
      case 'calendar':
        return <PetCalendar currentUser={currentUser} />;
      case 'credits':
        return <CreditsManager currentUser={currentUser} onUpdateCredits={handleUpdateCredits} />;
      case 'profiles':
        return <MultiProfileManager currentUser={currentUser} />;
      case 'moderation':
        return <ContentModerationSystem />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsAndConditions />;
      case 'profile':
        return <UserProfile currentUser={currentUser} onBack={() => setActiveScreen('feed')} />;
      default:
        return <MainFeed currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-blue-50">
      {/* Top Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🐾</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Critter Affinity
              </h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button type="button" className="relative p-2 hover:bg-green-100 rounded-full transition-colors" title="Notifications" aria-label="View notifications">
                <Bell className="w-5 h-5 text-green-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={() => setActiveScreen('profile')}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                  {currentUser?.name?.[0] || 'U'}
                </div>
                <span className="text-sm font-medium text-green-900">{currentUser?.name || 'User'}</span>
              </button>

              {currentUser?.isAdmin && (
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-md p-4 sticky top-24">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveScreen(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                          : 'hover:bg-green-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderActiveScreen()}
          </main>

          {/* Right Sidebar - Widgets */}
          <aside className="w-80 flex-shrink-0">
            <div className="space-y-4 sticky top-24">
              {/* Top Pets Widget */}
              <div className="bg-white rounded-2xl shadow-md p-4">
                <h3 className="font-bold text-lg mb-3 text-green-900">🏆 Top Pets Today</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-xl">
                        {i === 1 ? '🐕' : i === 2 ? '🐈' : '🐰'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Max the Golden</div>
                        <div className="text-xs text-gray-500">2.4k likes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Tip */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-md p-4 text-white">
                <div className="text-sm font-medium mb-2">💡 Daily Tip</div>
                <p className="text-sm opacity-90">
                  Regular walks improve your pet's mental health and strengthen your bond. Explore new routes today!
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-md p-4">
                <h3 className="font-bold text-lg mb-3 text-green-900">📊 Your Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Walks this week:</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts shared:</span>
                    <span className="font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New matches:</span>
                    <span className="font-bold text-pink-600">3</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>🌍 Critter Affinity - Connecting Pets, People & Planet Since 2026</p>
          <p className="mt-2 text-xs">
            Celebrating 4.1 billion years of life on Earth 🌱 | For pets, animals, nature & conservation
          </p>
        </div>
      </footer>
    </div>
  );
}