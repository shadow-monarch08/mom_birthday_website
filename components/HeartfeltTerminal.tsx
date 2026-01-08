import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Lock, Unlock } from 'lucide-react';
import { HEARTFELT_MESSAGES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeartfeltTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleDecrypt = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Play typing sound or beep? kept simple for now
    let delay = 0;
    HEARTFELT_MESSAGES.forEach((line, index) => {
        delay += 800 + Math.random() * 500;
        setTimeout(() => {
            setDisplayedLines(prev => [...prev, line]);
        }, delay);
    });
  };

  useEffect(() => {
      // Auto-trigger on view if desired, or keep manual. 
      // Let's keep manual for interaction, but animate the container in.
      if (sectionRef.current) {
          gsap.fromTo(sectionRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }});
      }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 w-full max-w-3xl mx-auto px-4 relative z-10">
       <div className="bg-black border-2 border-neonMagenta shadow-[0_0_30px_rgba(255,46,204,0.2)] rounded-lg overflow-hidden">
           {/* Terminal Header */}
           <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-terminal text-gray-500 text-sm">SECURE_CHANNEL_v9.0</div>
           </div>

           {/* Terminal Body */}
           <div className="p-6 md:p-10 font-terminal text-lg md:text-xl min-h-[300px] flex flex-col items-start justify-center">
                {!isOpen ? (
                    <div className="w-full text-center space-y-6">
                        <Lock className="w-16 h-16 text-neonMagenta mx-auto mb-4" />
                        <h3 className="text-white text-2xl">ENCRYPTED EMOTIONAL DATA FOUND</h3>
                        <p className="text-gray-400">Password not required. Access granted to: MOM</p>
                        <button 
                            onClick={handleDecrypt}
                            className="bg-neonMagenta/20 text-neonMagenta border border-neonMagenta px-6 py-2 hover:bg-neonMagenta hover:text-white transition-all uppercase tracking-widest animate-pulse"
                        >
                            [ DECRYPT MESSAGE ]
                        </button>
                    </div>
                ) : (
                    <div className="w-full space-y-2 text-left">
                        {displayedLines.map((line, i) => (
                            <div key={i} className="typing-effect text-neonCyan">
                                {line.startsWith('>') ? <span className="text-white ml-4 block my-2 border-l-2 border-neonMagenta pl-3 italic">{line.substring(2)}</span> : line}
                            </div>
                        ))}
                        <div className="animate-pulse text-neonMagenta">_</div>
                    </div>
                )}
           </div>
       </div>
    </section>
  );
};

export default HeartfeltTerminal;