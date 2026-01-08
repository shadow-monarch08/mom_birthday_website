import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLOATING_WORDS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const FloatingWords: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.floating-word');

    words.forEach((word) => {
      // Random movement logic
      const speed = Math.random() * 0.5 + 0.2;
      
      gsap.to(word, {
        y: -200 * speed,
        rotation: Math.random() * 20 - 10,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-full">
      {FLOATING_WORDS.map((item, index) => (
        <span
          key={item.id}
          className={`floating-word absolute font-arcade text-4xl md:text-7xl opacity-10 select-none whitespace-nowrap
            ${index % 2 === 0 ? 'text-neonCyan' : 'text-neonMagenta'}
          `}
          style={{
            left: `${item.x}%`,
            top: `${15 + (index * 12)}%`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default FloatingWords;