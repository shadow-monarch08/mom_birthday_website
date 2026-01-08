import React, { useEffect, useRef } from 'react';
import { Zap, Heart, Brain, Shield, Smile } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const Superpowers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const powers = [
    { icon: Heart, label: "Infinite Love", color: "text-neonMagenta" },
    { icon: Brain, label: "Mom Logic", color: "text-neonCyan" },
    { icon: Shield, label: "Protector", color: "text-neonYellow" },
    { icon: Zap, label: "Energy Boost", color: "text-neonCyan" },
    { icon: Smile, label: "Joy Bringer", color: "text-neonMagenta" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    gsap.fromTo(el.children, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  }, []);

  const handlePowerClick = (e: React.MouseEvent, label: string) => {
    // Play Click Sound
    const audio = new Audio('https://assets.codepen.io/21542/select.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Calculate normalized coordinates (0-1) for canvas-confetti
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    let colors = ['#ffffff'];
    let shapes: ('circle' | 'square' | 'star')[] = ['circle'];
    let scalar = 1;
    let particleCount = 30;

    switch (label) {
      case "Infinite Love":
        colors = ['#FF2ECC', '#FF0055', '#FFC0CB']; 
        shapes = ['circle']; // Simulating love particles
        scalar = 1.2;
        break;
      case "Mom Logic":
        colors = ['#00E5FF', '#FFFFFF', '#0099CC']; 
        shapes = ['square']; // Structured logic
        particleCount = 40;
        break;
      case "Protector":
        colors = ['#FFF220', '#DAA520', '#FFD700']; 
        shapes = ['square']; // Shield plates
        scalar = 1.5;
        break;
      case "Energy Boost":
        colors = ['#FFF220', '#00E5FF'];
        shapes = ['star']; // Electric sparks
        particleCount = 50;
        break;
      case "Joy Bringer":
        colors = ['#FF2ECC', '#00E5FF', '#FFF220', '#FF0055'];
        shapes = ['circle', 'star', 'square']; // Confetti mix
        particleCount = 60;
        break;
    }

    confetti({
      origin: { x, y },
      colors,
      shapes,
      particleCount,
      spread: 60,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 100,
      scalar,
      zIndex: 9999,
      disableForReducedMotion: true
    });
  };

  return (
    <section className="py-20 relative z-10 w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
          <h3 className="font-arcade text-xl md:text-2xl text-white mb-2">LOADOUT: SUPERPOWERS</h3>
          <div className="h-1 w-24 bg-neonYellow mx-auto"></div>
          <p className="font-terminal text-gray-400 mt-2 text-sm">(Click icons to activate)</p>
      </div>
      
      <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
        {powers.map((power, idx) => (
            <div 
                key={idx} 
                className="flex flex-col items-center gap-3 group cursor-pointer active:scale-95 transition-transform duration-100"
                onClick={(e) => handlePowerClick(e, power.label)}
            >
                <div className={`w-16 h-16 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-100"></div>
                    <power.icon className={`w-8 h-8 ${power.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <span className="font-terminal text-lg text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">{power.label}</span>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Superpowers;