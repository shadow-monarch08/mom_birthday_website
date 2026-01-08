import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeHeart from './ThreeHeart';

gsap.registerPlugin(ScrollTrigger);

const MarvelSurprise: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    
    gsap.fromTo(textRef.current,
        { scale: 0, rotation: -10 },
        { 
            scale: 1, 
            rotation: 0,
            duration: 1, 
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: el,
                start: "center center",
            }
        }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden my-20">
      
      {/* 3D Heart in background */}
      <div className="absolute inset-0 z-0">
         <ThreeHeart />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <div ref={textRef} className="bg-black/80 border-4 border-neonYellow p-8 md:p-12 shadow-[0_0_50px_rgba(255,242,32,0.3)] backdrop-blur-sm transform rotate-2">
            <div className="text-neonYellow font-arcade text-sm md:text-xl mb-4 animate-pulse">
                ★ ACHIEVEMENT UNLOCKED ★
            </div>
            <h2 className="text-4xl md:text-6xl font-arcade text-white comic-shadow mb-6">
                BEST MOM <br/><span className="text-neonCyan">EVER</span>
            </h2>
            <p className="font-terminal text-2xl text-gray-300">
                Awarded for: Infinite patience, super-strength hugs, and saving the day (every day).
            </p>
        </div>
      </div>
    </section>
  );
};

export default MarvelSurprise;