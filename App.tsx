
import React, { useState, useMemo } from 'react';
import { AgeGroup, Profile, View } from './types';
import { MOCK_PROFILES, DAILY_CONTENT } from './data/mockContent';
import { Navigation } from './components/Navigation';
import { AIChatOverlay } from './components/AIChatOverlay';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('today');
  const [activeProfile, setActiveProfile] = useState<Profile>(MOCK_PROFILES[0]);
  const [selectedCardContext, setSelectedCardContext] = useState<string | null>(null);

  // Filter content based on active profile's age group
  const filteredContent = useMemo(() => {
    return DAILY_CONTENT.filter(c => c.ageGroups.includes(activeProfile.ageGroup));
  }, [activeProfile]);

  const handleProfileSwitch = (profile: Profile) => {
    setActiveProfile(profile);
    setCurrentView('today'); // Auto-navigate back after switching
  };

  const openAIChat = (context: string) => {
    setSelectedCardContext(context);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-xl relative pb-24">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {currentView === 'today' ? `Hi, ${activeProfile.name}!` : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </h1>
          {currentView === 'today' && (
            <p className="text-gray-500 text-sm font-medium">Ready for your daily moments?</p>
          )}
        </div>
        <button 
          onClick={() => setCurrentView('profiles')}
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden"
          style={{ backgroundColor: activeProfile.color }}
        >
          <img src={activeProfile.avatar} alt={activeProfile.name} className="w-full h-full object-cover" />
        </button>
      </header>

      <main className="flex-1 px-6 pt-4">
        {currentView === 'today' && (
          <div className="space-y-6">
            {filteredContent.map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${card.accentColor}20` }}>
                    {card.emoji}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full text-gray-500">
                    {card.type}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
                <button 
                  onClick={() => openAIChat(`${card.title}: ${card.description}`)}
                  className="w-full py-4 bg-gray-50 rounded-2xl text-gray-900 text-sm font-bold flex items-center justify-center space-x-2 border border-gray-100"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">
                    AI
                  </div>
                  <span>Ask ChatGPT for help</span>
                </button>
              </div>
            ))}
            {filteredContent.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400">All caught up for today!</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'profiles' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Who's using the app?</h2>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleProfileSwitch(profile)}
                  className={`p-4 rounded-[2rem] border-2 transition-all flex flex-col items-center space-y-3 ${
                    activeProfile.id === profile.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-sm" style={{ backgroundColor: profile.color }}>
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{profile.name}</p>
                    <p className="text-xs text-gray-500">{profile.ageGroup}</p>
                  </div>
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-bold text-sm flex items-center justify-center space-x-2">
              <span>+ Add New Profile</span>
            </button>
          </div>
        )}

        {currentView === 'library' && (
          <div className="space-y-4">
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[2rem] text-white">
                <h2 className="text-xl font-bold mb-2">Moments Vault</h2>
                <p className="text-white/80 text-sm">Review your past activities and AI conversations here.</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center space-x-4">
                   <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">📁</div>
                   <div>
                     <p className="font-bold text-gray-900">Historical Card #{i}</p>
                     <p className="text-xs text-gray-500">Completed 2 days ago</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </main>

      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      <AIChatOverlay 
        isOpen={!!selectedCardContext} 
        onClose={() => setSelectedCardContext(null)} 
        ageGroup={activeProfile.ageGroup}
        cardContext={selectedCardContext || ''}
      />
    </div>
  );
};

export default App;
