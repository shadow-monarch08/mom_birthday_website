import React, { useEffect, useState, useRef } from 'react';
import { Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Achievement {
  id: string;
  title: string;
  icon: string;
}

const AchievementPopup: React.FC = () => {
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use a ref to track unlocked IDs to avoid re-triggering in strict mode or re-renders
  const unlockedRef = useRef<Set<string>>(new Set());

  const showAchievement = (ach: Achievement) => {
    if (unlockedRef.current.has(ach.id)) return;
    unlockedRef.current.add(ach.id);

    setActiveAchievement(ach);
    
    // Play sound (short beep)
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        // Catch playback errors (e.g. if user hasn't interacted with page yet)
        audioRef.current.play().catch(e => console.log("Audio play blocked (user interaction required):", e));
    }

    // Animation in
    gsap.fromTo(popupRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
    );

    // Hide after 4 seconds
    setTimeout(() => {
        gsap.to(popupRef.current, {
            y: 100, 
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => setActiveAchievement(null)
        });
    }, 4000);
  };

  useEffect(() => {
    // Sound effect - Reliable Coin SFX
    audioRef.current = new Audio('https://assets.codepen.io/21542/coin.mp3'); 
    audioRef.current.volume = 0.4;

    // Trigger 1: Scroll Start
    ScrollTrigger.create({
        start: "top top+=100",
        onEnter: () => showAchievement({ id: 'start', title: 'GAME STARTED', icon: '🎮' }),
        once: true
    });

    // Trigger 2: Halfway
    ScrollTrigger.create({
        start: "center center",
        trigger: "body",
        onEnter: () => showAchievement({ id: 'halfway', title: 'MEMORY LANE', icon: '📸' }),
        once: true
    });

    // Trigger 3: Bottom
    ScrollTrigger.create({
        start: "bottom bottom-=100",
        onEnter: () => showAchievement({ id: 'finish', title: 'LEVEL COMPLETE', icon: '🏆' }),
        once: true
    });

  }, []);

  if (!activeAchievement) return null;

  return (
    <div 
        ref={popupRef}
        className="fixed bottom-8 right-8 z-[100] flex items-center gap-4 bg-[#202020] border-2 border-gray-500 rounded-full pr-6 pl-2 py-2 shadow-[0_0_20px_rgba(0,0,0,0.8)] max-w-xs"
    >
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center border-2 border-white text-2xl animate-pulse">
            {activeAchievement.icon}
        </div>
        <div>
            <div className="text-[10px] text-gray-400 font-arcade uppercase tracking-wider">Achievement Unlocked</div>
            <div className="text-sm font-bold text-white font-terminal tracking-wide">{activeAchievement.title}</div>
        </div>
    </div>
  );
};

export default AchievementPopup;