import React, { useRef, useEffect } from 'react';
import { ShoppingBag, Eye, Coffee, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Inventory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      name: "Bag of Holding",
      icon: ShoppingBag,
      rarity: "Legendary",
      desc: "Contains infinite tissues, snacks, and everything lost by the family.",
      stats: "Capacity: ∞"
    },
    {
      name: "The Look™",
      icon: Eye,
      rarity: "Epic",
      desc: "Instantly stops any misbehavior within a 50ft radius. No cooldown.",
      stats: "Fear: 100"
    },
    {
      name: "Elixir of Life",
      icon: Coffee,
      rarity: "Rare",
      desc: "Morning coffee. Grants 'Functionality' buff for 4 hours.",
      stats: "Energy: +50"
    },
    {
      name: "Mama Bear Shield",
      icon: ShieldCheck,
      rarity: "Mythic",
      desc: "Auto-activates when family is threatened. Impenetrable.",
      stats: "Defense: MAX"
    }
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section className="py-24 px-4 w-full max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-arcade text-white mb-4">INVENTORY</h2>
        <p className="font-terminal text-neonCyan text-xl">CURRENTLY EQUIPPED ITEMS</p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="group bg-gray-900 border-4 border-gray-700 p-4 hover:border-neonYellow hover:bg-gray-800 transition-all duration-300 relative overflow-hidden">
            {/* Rarity Glow */}
            <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-arcade text-black
              ${item.rarity === 'Legendary' ? 'bg-orange-500' : 
                item.rarity === 'Mythic' ? 'bg-retroPurple text-white' :
                item.rarity === 'Epic' ? 'bg-neonMagenta' : 'bg-blue-400'}
            `}>
              {item.rarity}
            </div>

            <div className="flex flex-col items-center text-center pt-6">
              <div className="w-16 h-16 mb-4 text-white group-hover:scale-110 transition-transform duration-300 group-hover:text-neonYellow">
                <item.icon className="w-full h-full" />
              </div>
              
              <h3 className="font-arcade text-sm text-neonCyan mb-2">{item.name}</h3>
              <div className="h-[1px] w-full bg-gray-700 my-2 group-hover:bg-neonYellow transition-colors"></div>
              <p className="font-terminal text-gray-300 text-lg leading-tight mb-4 min-h-[3em]">
                {item.desc}
              </p>
              
              <div className="w-full bg-black/50 p-2 border border-gray-600 font-terminal text-green-400 text-sm">
                {item.stats}
              </div>
            </div>

            {/* Corner Bracket visuals */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-500 group-hover:border-white transition-colors"></div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-500 group-hover:border-white transition-colors"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Inventory;