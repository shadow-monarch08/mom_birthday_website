import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Story } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { x: isEven ? -100 : 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
        }
      }
    );
  }, [isEven]);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 my-24 w-full max-w-6xl mx-auto px-6 relative z-10`}
    >
      {/* CARD FLIP CONTAINER */}
      <div className="group w-full md:w-1/2 h-[500px] perspective-1000 cursor-pointer">
        <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180 transform-style-3d">
            
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full relative border-4 border-neonCyan bg-arcadeBlack p-2 shadow-[8px_8px_0px_0px_#00E5FF]">
                    <div className="absolute top-2 left-2 z-20 bg-neonMagenta text-white font-arcade text-xs px-2 py-1">
                        HERO CARD #{story.id}
                    </div>
                    <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                    
                    {/* COMIC SPEECH BUBBLE (Revealed on hover) */}
                    {story.quote && (
                      <div className="absolute top-1/4 -right-8 max-w-[180px] bg-white text-black p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none transform -rotate-3 scale-90 group-hover:scale-100 origin-bottom-left">
                        <div className="absolute bottom-4 -left-3 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white border-b-[5px] border-b-transparent"></div>
                        <p className="font-arcade text-xs leading-relaxed uppercase">{story.quote}</p>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12">
                         <h3 className="text-neonYellow font-arcade text-lg comic-shadow">{story.title}</h3>
                    </div>
                </div>
            </div>

            {/* BACK OF CARD (STATS) */}
            <div className="absolute inset-0 w-full h-full bg-retroBlue border-4 border-neonMagenta rotate-y-180 backface-hidden p-6 flex flex-col justify-center items-center shadow-[8px_8px_0px_0px_#FF2ECC]">
                <h3 className="font-arcade text-xl text-neonYellow mb-8 text-center comic-shadow">POWER STATS</h3>
                
                <div className="w-full space-y-6 font-terminal text-xl">
                    {story.stats.map((stat, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-1">
                                <span className={stat.color}>{stat.label}</span>
                                <span className="text-white">{stat.value}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-4 border border-gray-600">
                                <div 
                                    className={`h-full ${stat.color.replace('text-', 'bg-')}`} 
                                    style={{ width: `${Math.min(stat.value, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center border-t-2 border-dashed border-gray-500 pt-4 w-full">
                     <p className="font-terminal text-gray-400 text-sm">"Even superheroes need a break... sometimes."</p>
                </div>
            </div>
        </div>
      </div>

      {/* TEXT DESCRIPTION SIDE */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="inline-block bg-neonYellow/20 border border-neonYellow text-neonYellow px-3 py-1 font-terminal text-lg mb-4 rounded">
            {story.date}
        </div>
        <h2 className="text-3xl md:text-4xl font-arcade text-white mb-6 leading-relaxed">
            {story.title}
        </h2>
        <div className="bg-gray-900/50 p-6 border-l-4 border-neonMagenta hover:bg-gray-900/80 transition-colors duration-300">
            <p className="text-xl text-gray-300 font-terminal leading-relaxed">
            {story.description}
            </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;