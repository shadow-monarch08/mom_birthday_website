import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOSS_LOG } from '../constants';
import { Skull, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BossBattleLog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el.children,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className="py-16 w-full max-w-4xl mx-auto px-6 relative z-10">
      <div className="bg-black/50 border-2 border-red-900 p-6 md:p-8 rounded-sm relative overflow-hidden">
         {/* Background Danger Stripes */}
         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.05)_10px,rgba(255,0,0,0.05)_20px)] pointer-events-none"></div>

         <h3 className="font-arcade text-2xl text-red-500 mb-6 flex items-center gap-3">
            <Skull className="w-6 h-6" /> MISSION LOG: THREATS NEUTRALIZED
         </h3>

         <div ref={containerRef} className="space-y-4">
            {BOSS_LOG.map((boss, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-900/80 border border-gray-700 p-4 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div>
                            <span className="font-arcade text-white text-sm md:text-base">{boss.name}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0 font-terminal">
                         <span className="text-green-500 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> {boss.status}
                         </span>
                         <span className="text-yellow-500 text-sm border-l border-gray-600 pl-4">
                            Reward: {boss.reward}
                         </span>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default BossBattleLog;