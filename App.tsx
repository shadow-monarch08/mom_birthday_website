import React, { useState, useEffect, useLayoutEffect } from 'react';
import Hero from './components/Hero';
import StoryCard from './components/StoryCard';
import MarvelSurprise from './components/MarvelSurprise';
import Celebration from './components/Celebration';
import MusicPlayer from './components/MusicPlayer';
import FloatingWords from './components/FloatingWords';
import CRTOverlay from './components/CRTOverlay';
import RetroHUD from './components/RetroHUD';
import Superpowers from './components/Superpowers';
import AchievementPopup from './components/AchievementPopup';
import KonamiCode from './components/KonamiCode';
import LoadingScreen from './components/LoadingScreen';
import Inventory from './components/Inventory';
import ClickEffects from './components/ClickEffects';
import MomMultiverse from './components/MomMultiverse';
import BossBattleLog from './components/BossBattleLog';
import HeartfeltTerminal from './components/HeartfeltTerminal';
import Testimonials from './components/Testimonials';
import PostCredits from './components/PostCredits';
import { STORIES } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Console Easter Egg
  useEffect(() => {
    console.log("%c STOP! ", "font-size: 40px; color: red; font-weight: bold; background-color: black; padding: 10px;");
    console.log("%c If you are Mom, you don't need to look at the code. You already have the cheat codes to life.", "font-size: 16px; color: #00E5FF; background: #000; padding: 5px;");
    console.log("%c WARNING: Infinite Love Detected.", "color: #FF2ECC; font-family: monospace;");
  }, []);

  // Force scroll to top when loading finishes
  useLayoutEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
      // Disable browser auto-scroll restoration for this session
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="relative w-full min-h-screen bg-arcadeBlack selection:bg-neonMagenta selection:text-white cursor-crosshair">
      <CRTOverlay />
      <RetroHUD />
      <AchievementPopup />
      <KonamiCode />
      <MusicPlayer />
      <ClickEffects />
      
      <Hero />
      
      <div className="relative w-full overflow-hidden">
        {/* Parallax Words Background */}
        <FloatingWords />

        <div className="relative z-10 py-12 md:py-24 space-y-20 md:space-y-32">
          
          <MomMultiverse />

          {STORIES.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}

          <BossBattleLog />
        </div>
      </div>

      <Inventory />

      <Superpowers />
      
      <HeartfeltTerminal />

      <MarvelSurprise />
      
      <Testimonials />

      <Celebration />
      
      <PostCredits />

      <footer className="w-full py-8 text-center text-gray-600 text-xs font-arcade bg-black border-t border-gray-800">
        <p>COIN OPERATED • FREE PLAY ENABLED • v19.X.X (PATCH: LOVE)</p>
      </footer>
    </main>
  );
};

export default App;