import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Trophy, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Celebration: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null); // Ref for the overlay
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Fireworks logic inspired by the provided example
  const triggerMassiveCelebration = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 200000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Fireworks left
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#00E5FF', '#FF2ECC', '#FFF220'],
        shapes: ['square', 'circle']
      });
      
      // Fireworks right
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#00E5FF', '#FF2ECC', '#FFF220'],
        shapes: ['square', 'circle']
      });
    }, 250);
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isCelebrating) return;
      setIsCelebrating(true);

      // Show overlay with GSAP (handles visibility: hidden/visible automatically via autoAlpha)
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.5 });

      // Play Win Sound
      const audio = new Audio('https://assets.codepen.io/21542/win.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {});

      // Instant burst from button center
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x, y },
        zIndex: 200001,
        colors: ['#FFFFFF', '#FF2ECC', '#00E5FF'],
        startVelocity: 60,
        scalar: 1.5,
      });

      // Trigger the sustained fireworks
      triggerMassiveCelebration();

      // Hide overlay and reset state after 5 seconds
      setTimeout(() => {
        gsap.to(overlayRef.current, { 
            autoAlpha: 0, 
            duration: 0.8, 
            onComplete: () => setIsCelebrating(false) 
        });
      }, 5000);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Ensure overlay is hidden initially by GSAP to be safe
    if (overlayRef.current) {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
    }

    // Small initial burst when scrolling into view
    ScrollTrigger.create({
      trigger: el,
      start: "center bottom",
      onEnter: () => {
         confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.9 },
            zIndex: 100,
            colors: ['#FFF220', '#00E5FF'] 
         });
      }, 
    });

    gsap.fromTo(scoreRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.5, ease: "steps(5)", scrollTrigger: { trigger: el, start: "top 70%" } }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col items-center justify-center bg-arcadeBlack text-center px-4 py-20 overflow-hidden"
    >
      {/* Full Screen Celebration Overlay 
          Using opacity-0 and invisible utility classes as initial state.
          GSAP autoAlpha will toggle visibility and opacity.
      */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 pointer-events-none opacity-0 invisible"
      >
        <div className="relative z-10 flex flex-col items-center animate-bounce p-4">
            <h1 className="font-arcade text-5xl md:text-8xl text-neonYellow comic-shadow mb-4 text-center leading-tight">
            LEVEL COMPLETE!<br/>
            <span className="text-3xl md:text-5xl text-white block mt-6">HAPPY BIRTHDAY!</span>
            </h1>
            <div className="flex gap-8 mt-8">
                <Star className="w-12 h-12 text-neonCyan animate-spin" />
                <Trophy className="w-16 h-16 text-neonMagenta animate-pulse" />
                <Star className="w-12 h-12 text-neonCyan animate-spin" />
            </div>
        </div>
        
        {/* Background glow in overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.2)_0%,transparent_70%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto z-10 space-y-12 relative">
        <h2 className="text-4xl md:text-6xl font-arcade text-white mb-6 leading-tight">
          GAME OVER?<br/>
          <span className="text-neonCyan text-2xl md:text-4xl">NO WAY. CONTINUING FOREVER.</span>
        </h2>

        {/* Improved Scoreboard inspired by example */}
        <div ref={scoreRef} className="bg-gray-900 border-4 border-white p-8 md:p-12 w-full mx-auto shadow-[0_0_40px_rgba(0,229,255,0.3)] relative transform hover:scale-[1.02] transition-transform duration-300">
            {/* "High Score" Badge */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-retroBlue px-6 py-2 border-2 border-neonMagenta shadow-[4px_4px_0px_0px_#FF2ECC]">
                 <span className="font-arcade text-neonYellow text-lg md:text-xl">FINAL STATS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 font-terminal text-2xl md:text-3xl text-left">
                <div className="flex flex-col items-center text-center">
                    <span className="text-gray-400 text-xl uppercase mb-2">Years Loved</span>
                    <span className="text-neonCyan text-4xl md:text-5xl">999999</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <span className="text-gray-400 text-xl uppercase mb-2">Memories</span>
                    <span className="text-neonMagenta text-4xl md:text-5xl">∞</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <span className="text-gray-400 text-xl uppercase mb-2">Smiles</span>
                    <span className="text-neonYellow text-4xl md:text-5xl">MAX</span>
                </div>
            </div>
            
            <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-700 text-center">
                <p className="text-white font-arcade text-sm animate-pulse">RANK: LEGENDARY MOM</p>
            </div>
        </div>

        <div className="pt-10">
          <button 
            onClick={handleButtonClick}
            disabled={isCelebrating}
            className={`group relative inline-flex items-center justify-center px-10 py-6 font-arcade text-xl transition-all duration-200 border-4 border-white shadow-[8px_8px_0px_0px_#FFF] active:translate-y-1 active:shadow-none
                ${isCelebrating 
                    ? 'bg-white text-black scale-105 cursor-default' 
                    : 'bg-neonCyan text-black hover:bg-neonMagenta hover:text-white hover:border-neonYellow'
                }
            `}
          >
            {isCelebrating ? (
                 <span className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 animate-spin" /> CELEBRATING... <Sparkles className="w-6 h-6 animate-spin" />
                 </span>
            ) : (
                <span className="flex items-center gap-3">
                    ▶ PRESS START TO CELEBRATE
                </span>
            )}
            
            {!isCelebrating && (
                 <div className="absolute inset-0 w-full h-full border-2 border-white blur opacity-40 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>
        </div>

        <p className="font-terminal text-xl text-gray-400 max-w-lg mx-auto mt-12">
            Made with <Heart className="inline w-5 h-5 text-red-500 fill-red-500 mx-1 animate-pulse" /> for the best player in the game.
        </p>
      </div>

      {/* Grid Floor */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(transparent_0%,rgba(0,229,255,0.1)_100%)] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(255,46,204,0.1)_1px,transparent_1px),linear-gradient(rgba(255,46,204,0.1)_1px,transparent_1px)] bg-[length:40px_40px] perspective-1000 transform-gpu rotate-x-60 origin-bottom"></div>
      </div>
    </section>
  );
};

export default Celebration;