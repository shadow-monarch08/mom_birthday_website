import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const KonamiCode: React.FC = () => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          activateCheat();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activateCheat = () => {
    setActive(true);
    
    // Massive Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00E5FF', '#FF2ECC']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFF220', '#FF2ECC']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => setActive(false), 5000);
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm">
        <div className="bg-arcadeBlack border-4 border-neonCyan p-8 transform rotate-3 animate-bounce shadow-[0_0_50px_#00E5FF]">
            <h1 className="text-4xl md:text-6xl font-arcade text-neonYellow text-center comic-shadow">
                CHEAT CODE ACTIVATED
            </h1>
            <p className="font-terminal text-2xl text-white text-center mt-4 uppercase">
                God Mode: Infinite Love Enabled
            </p>
        </div>
    </div>
  );
};

export default KonamiCode;