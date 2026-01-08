import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

const PHRASES = [
  { text: "POW!", color: "#FF2ECC" },
  { text: "BAM!", color: "#00E5FF" },
  { text: "CRIT!", color: "#FFF220" },
  { text: "+100 XP", color: "#00FF00" },
  { text: "NICE!", color: "#FFFFFF" },
  { text: "WOW!", color: "#FF0055" },
  { text: "LEVEL UP?", color: "#00E5FF" },
  { text: "♥", color: "#FF2ECC" },
];

const ClickEffects: React.FC = () => {
  const [effects, setEffects] = useState<FloatingText[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn if clicking a button (buttons usually have their own feedback)
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) return;

      // Play retro sound with random pitch for variety
      const audio = new Audio('https://assets.codepen.io/21542/hit.mp3');
      audio.volume = 0.15; // Low volume to not be annoying
      audio.playbackRate = 0.8 + Math.random() * 0.4; // Randomize pitch (0.8x to 1.2x)
      audio.play().catch(() => {});

      const id = Date.now();
      const randomPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      
      const newEffect = {
        id,
        x: e.clientX,
        y: e.clientY,
        text: randomPhrase.text,
        color: randomPhrase.color
      };

      setEffects(prev => [...prev, newEffect]);

      // Cleanup after animation
      setTimeout(() => {
        setEffects(prev => prev.filter(item => item.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {effects.map(effect => (
        <div
          key={effect.id}
          className="absolute font-arcade text-xl md:text-3xl comic-shadow select-none animate-float-up"
          style={{
            left: effect.x,
            top: effect.y,
            color: effect.color,
            textShadow: '2px 2px 0px #000',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {effect.text}
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
          50% { transform: translate(-50%, -100%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(1); }
        }
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default ClickEffects;