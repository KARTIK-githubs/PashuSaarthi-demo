import { useState, useEffect } from "react";
import { Home, Camera, Mic, Phone, Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { OfflineBanner } from "./components/OfflineBanner";
import { LanguageSelector } from "./components/LanguageSelector";
import { Dashboard } from "./components/Dashboard";
import { DiseaseDetection } from "./components/DiseaseDetection";
import { VoiceAssistant } from "./components/VoiceAssistant";
import { Helpline } from "./components/Helpline";

type Tab = 'dashboard' | 'detection' | 'voice' | 'helpline';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [language, setLanguage] = useState<string>('en');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} />;
      case 'detection':
        return <DiseaseDetection language={language} />;
      case 'voice':
        return <VoiceAssistant language={language} />;
      case 'helpline':
        return <Helpline language={language} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  const getTabTitle = (tab: Tab) => {
    const titles = {
      en: {
        dashboard: 'Dashboard',
        detection: 'AI Detection',
        voice: 'Voice Helper',
        helpline: 'Helpline'
      },
      hi: {
        dashboard: 'डैशबोर्ड',
        detection: 'AI पहचान',
        voice: 'वॉयस हेल्पर',
        helpline: 'हेल्पलाइन'
      }
    };
    
    return titles[language as keyof typeof titles]?.[tab] || titles.en[tab];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-yellow-50 to-orange-50">
      {/* Offline Banner */}
      <OfflineBanner isOffline={isOffline} />

      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 border-b border-green-800 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: 'serif' }}>
                पशुSaarthi
              </h1>
              <p className="text-sm text-green-100 font-medium">
                {getTabTitle(activeTab)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSelector 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderActiveTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-green-200 z-50 shadow-lg">
        <div className="grid grid-cols-4">
          {[
            { id: 'dashboard' as Tab, icon: Home, label: getTabTitle('dashboard') },
            { id: 'detection' as Tab, icon: Camera, label: getTabTitle('detection') },
            { id: 'voice' as Tab, icon: Mic, label: getTabTitle('voice') },
            { id: 'helpline' as Tab, icon: Phone, label: getTabTitle('helpline') }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-3 px-2 h-auto rounded-none relative transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-green-700 bg-gradient-to-t from-green-50 to-transparent transform scale-105' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'drop-shadow-sm' : ''}`} />
              <span className={`text-xs leading-none font-medium ${activeTab === tab.id ? 'font-semibold' : ''}`}>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-green-600 to-yellow-500 rounded-b-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* PWA Install Prompt (hidden by default, shown by browser when PWA criteria met) */}
      <style>{`
        @media (display-mode: standalone) {
          body {
            -webkit-user-select: none;
            -webkit-touch-callout: none;
          }
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        /* Ensure proper touch targets */
        button, [role="button"] {
          min-height: 44px;
          min-width: 44px;
        }

        /* High contrast mode adjustments */
        @media (prefers-contrast: high) {
          .text-gray-600 {
            color: #374151 !important;
          }
          .border-gray-200 {
            border-color: #6b7280 !important;
          }
        }

        /* Reduced motion adjustments */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}