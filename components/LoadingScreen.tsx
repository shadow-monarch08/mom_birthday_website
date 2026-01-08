import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootSequence = [
    "INITIALIZING MOM_OS v19.90...",
    "CHECKING MEMORY... OVERFLOWING WITH LOVE",
    "LOADING ASSETS... HUGS_TEXTURE.PAK",
    "LOADING ASSETS... PATIENCE_MODULE.EXE",
    "CALIBRATING SASS LEVELS... [██████████] 110%",
    "DETECTING PLAYER... LEGENDARY STATUS CONFIRMED",
    "ESTABLISHING SECURE CONNECTION TO HEART_SERVER...",
    "EXECUTING BIRTHDAY_PROTOCOL... SUCCESS",
    "READY PLAYER ONE."
  ];

  useEffect(() => {
    let delay = 0;
    bootSequence.forEach((line, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
      }, delay);
    });

    setTimeout(() => {
      // Vital: Reset scroll to top before unmounting so the main app starts at the top
      window.scrollTo(0, 0);
      onComplete();
    }, delay + 800);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-500 font-terminal text-lg md:text-xl p-8 md:p-20 overflow-hidden flex flex-col justify-end pb-20 cursor-wait">
      <div className="max-w-3xl w-full mx-auto space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="typing-effect border-r-2 border-transparent">
            <span className="opacity-50 mr-4">
                {`00${i + 1}:${Math.floor(Math.random() * 99)}`}
            </span> 
            {line}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      
      <div className="absolute top-4 left-4 text-xs text-green-800">
        ROM CHECK: OK <br/>
        RAM CHECK: OK <br/>
        SOUND: STEREO
      </div>
    </div>
  );
};

export default LoadingScreen;