import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RetroHUD: React.FC = () => {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setXp(Math.round(self.progress * 100));
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 font-arcade text-xs md:text-sm pointer-events-none mix-blend-screen opacity-80">
      <div className="bg-black/80 border-2 border-green-500 p-2 text-green-400 shadow-[0_0_10px_rgba(0,255,0,0.3)]">
        <div className="flex justify-between items-center mb-1 gap-4">
            <span>LVL</span>
            <span className="text-white">MAX</span>
        </div>
        <div className="flex justify-between items-center mb-1 gap-4">
            <span>HP</span>
            <div className="flex gap-[2px]">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-3 bg-red-500 animate-pulse"></div>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <span>XP</span>
                <span>{xp}%</span>
            </div>
            <div className="w-24 h-2 bg-gray-800 border border-green-900">
                <div 
                    className="h-full bg-green-500 transition-all duration-100 ease-linear"
                    style={{ width: `${xp}%` }}
                ></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RetroHUD;