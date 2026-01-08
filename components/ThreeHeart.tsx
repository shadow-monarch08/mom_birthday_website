import React from 'react';

const ThreeHeart: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <div className="relative animate-float-slow">
         {/* Geometric Heart SVG replacement for WebGL to prevent context crashes */}
         <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(255,46,204,0.5)]">
            <g>
              {/* Back Glow */}
              <path d="M50 90L20 60C10 50 10 30 25 20C35 13 45 20 50 30C55 20 65 13 75 20C90 30 90 50 80 60L50 90Z" fill="#FF2ECC" fillOpacity="0.1" />
              
              {/* Wireframe Outline */}
              <path d="M50 88 L15 50 Q5 35 15 25 T40 25 L50 35 L60 25 Q75 10 85 25 T85 50 L50 88 Z" stroke="#FF2ECC" strokeWidth="1.5" fill="rgba(0,0,0,0.5)" />
              
              {/* Low Poly Facets */}
              <path d="M50 35 L40 25 L15 50 L50 88 Z" fill="url(#grad1)" opacity="0.9" />
              <path d="M50 35 L60 25 L85 50 L50 88 Z" fill="url(#grad2)" opacity="0.9" />
              
              {/* Top Facets */}
              <path d="M15 50 L25 25 L40 25 L50 35 Z" fill="#FF2ECC" opacity="0.4" />
              <path d="M85 50 L75 25 L60 25 L50 35 Z" fill="#00E5FF" opacity="0.4" />
              
              {/* Center Line */}
              <path d="M50 35 L50 88" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
            </g>
            <defs>
              <linearGradient id="grad1" x1="15" y1="25" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF2ECC"/>
                <stop offset="1" stopColor="#4B0082"/>
              </linearGradient>
              <linearGradient id="grad2" x1="85" y1="25" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                 <stop stopColor="#00E5FF"/>
                 <stop offset="1" stopColor="#0055AA"/>
              </linearGradient>
            </defs>
         </svg>
      </div>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ThreeHeart;