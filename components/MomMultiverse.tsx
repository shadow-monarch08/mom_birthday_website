import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MULTIVERSE_VARIANTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const MomMultiverse: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(el.querySelectorAll('.variant-card'), 
      { y: 50, opacity: 0, rotateY: 90 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 w-full max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-arcade text-white mb-2 comic-shadow">INTO THE MOM-VERSE</h2>
        <p className="font-terminal text-neonCyan text-xl">CHOOSE YOUR HERO (ALL VERSIONS ARE LEGENDARY)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MULTIVERSE_VARIANTS.map((variant, idx) => (
          <div key={idx} className="variant-card relative group perspective-1000 h-[600px] cursor-pointer">
             <div className="bg-gray-900 border-4 border-gray-700 h-full transition-all duration-300 group-hover:border-white group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] relative overflow-hidden rounded-lg">
                
                {/* Full Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src={variant.image} 
                        alt={variant.role}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100" 
                    />
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%] pointer-events-none opacity-50"></div>
                </div>

                {/* Header Badge (Universe Name) */}
                <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start">
                    <div className="bg-black/80 border border-white px-3 py-1 shadow-[2px_2px_0_#000]">
                        <span className={`font-arcade text-xs ${variant.color}`}>{variant.universe}</span>
                    </div>
                    {/* Rarity Stars */}
                    <div className="flex gap-1 text-neonYellow drop-shadow-md">
                        {'★'.repeat(idx + 3)}
                    </div>
                </div>

                {/* Content Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-24 pb-6 px-6 z-20 flex flex-col justify-end h-1/2">
                    
                    <h3 className={`font-arcade text-2xl mb-1 text-white comic-shadow uppercase leading-tight`}>
                        {variant.role}
                    </h3>
                    
                    <div className={`w-12 h-1 ${variant.color.replace('text-', 'bg-')} mb-3 group-hover:w-full transition-all duration-500`}></div>
                    
                    <p className="font-terminal text-gray-300 leading-tight text-lg mb-4 opacity-90 group-hover:opacity-100">
                        {variant.desc}
                    </p>

                    {/* Stats HUD */}
                    <div className="bg-gray-800/80 border border-gray-600 p-3 relative backdrop-blur-sm">
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-neonGreen animate-pulse"></div>
                        <p className="font-terminal text-neonGreen text-xs md:text-sm uppercase tracking-wider font-bold">
                           {variant.stats}
                        </p>
                    </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MomMultiverse;