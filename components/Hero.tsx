import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Glitch entry effect
    tl.fromTo(titleRef.current, 
      { scale: 0.5, opacity: 0, textShadow: "0px 0px 0px #000" },
      { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
    )
    .to(titleRef.current, {
        textShadow: "4px 4px 0px #FF2ECC, -4px -4px 0px #00E5FF",
        duration: 0.2,
        repeat: 3,
        yoyo: true
    })
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-arcadeBlack">
      
      {/* Animated Starfield Background (CSS Implementation for perf) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(white,rgba(255,255,255,.2)_2px,transparent_3px)] bg-[length:50px_50px] animate-[pulse_4s_infinite]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(white,rgba(255,255,255,.15)_1px,transparent_1px)] bg-[length:30px_30px] animate-[pulse_3s_infinite_reverse]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-4 inline-block px-4 py-1 border border-neonYellow bg-neonYellow/10 rounded text-neonYellow font-terminal text-lg tracking-widest uppercase animate-pulse">
            Player 1 Ready
        </div>
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-arcade text-white mb-8 leading-tight"
        >
          HAPPY BIRTHDAY<br />
          <span className="text-neonCyan">MOM</span>
        </h1>
        
        <div ref={subtitleRef} className="font-terminal text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto space-y-2">
            <p>Welcome to your special level.</p>
            <p className="text-neonMagenta">Mission: Celebrate You.</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-arcade text-xs text-neonCyan animate-pulse">SCROLL TO START</span>
        <ChevronDown className="w-8 h-8 text-neonCyan animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;