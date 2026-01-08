import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../constants';
import { MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(el.querySelectorAll('.review-card'),
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className="py-16 w-full max-w-5xl mx-auto px-4 relative z-10 overflow-hidden">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-700 pb-4">
            <MessageSquare className="text-neonYellow w-8 h-8" />
            <h3 className="font-arcade text-2xl text-white">USER REVIEWS</h3>
            <span className="font-terminal text-gray-500 ml-auto">Total Rating: 5.0/5.0</span>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="review-card bg-gray-800 p-6 border border-gray-600 rounded-br-3xl relative">
                    <div className="flex justify-between items-start mb-4">
                        <span className="font-arcade text-xs text-neonCyan">{t.user}</span>
                        <span className="text-yellow-400 tracking-widest">{t.rating}</span>
                    </div>
                    <p className="font-terminal text-xl text-gray-200">"{t.comment}"</p>
                    <div className="absolute top-0 left-0 w-2 h-full bg-neonMagenta opacity-50"></div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Testimonials;