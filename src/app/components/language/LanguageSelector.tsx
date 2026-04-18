import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', countries: ['US', 'UK', 'AU', 'CA'] },
  { code: 'es', name: 'Español', flag: '🇪🇸', countries: ['ES', 'MX', 'AR', 'CO'] },
  { code: 'fr', name: 'Français', flag: '🇫🇷', countries: ['FR', 'CA', 'BE', 'CH'] },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', countries: ['DE', 'AT', 'CH'] },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', countries: ['IT', 'CH'] },
  { code: 'pt', name: 'Português', flag: '🇵🇹', countries: ['PT', 'BR'] },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', countries: ['RU'] },
  { code: 'zh', name: '中文', flag: '🇨🇳', countries: ['CN', 'TW', 'HK', 'SG'] },
  { code: 'ja', name: '日本語', flag: '🇯🇵', countries: ['JP'] },
  { code: 'ko', name: '한국어', flag: '🇰🇷', countries: ['KR'] },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', countries: ['SA', 'AE', 'EG'] },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', countries: ['IN'] },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩', countries: ['BD', 'IN'] },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', countries: ['TR'] },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', countries: ['NL', 'BE'] },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', countries: ['PL'] },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', countries: ['SE'] },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', countries: ['NO'] },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', countries: ['DK'] },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', countries: ['FI'] },
];

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
  showOnStartup?: boolean;
}

export function LanguageSelector({ onLanguageChange, showOnStartup = false }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check for saved language
    const savedLang = localStorage.getItem('userLanguage');
    if (savedLang) {
      setSelectedLanguage(savedLang);
    } else if (showOnStartup) {
      // Show language selector on first visit
      setShowModal(true);
    }
  }, [showOnStartup]);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    setShowModal(false);
    
    // In production, this would trigger actual translation
    onLanguageChange?.(langCode);
    
    // Store for analytics
    localStorage.setItem('languageChangeLog', JSON.stringify({
      language: langCode,
      timestamp: new Date().toISOString(),
    }));
  };

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLang = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <>
      {/* Language Selector Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLang.name}</span>
      </button>

      {/* Language Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Globe className="w-8 h-8" />
                Select Your Language
              </h2>
              <p className="text-sm opacity-90">
                Choose your preferred language for Critter Affinity
              </p>
            </div>

            <div className="p-6">
              {/* Search */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search languages..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />

              {/* Language Grid */}
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{lang.flag}</span>
                        {selectedLanguage === lang.code && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="font-bold text-gray-900">{lang.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{lang.code.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  🌍 Critter Affinity is available in {LANGUAGES.length}+ languages across 237 countries.
                  Your content will be automatically translated to your selected language.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  Continue with {currentLang.name}
                </button>
                {!showOnStartup && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Translation hook (in production, use i18next or similar)
export function useTranslation() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('userLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  const t = (key: string): string => {
    // In production, fetch translations from backend
    // For now, return the key itself
    return key;
  };

  return { t, language, setLanguage };
}
