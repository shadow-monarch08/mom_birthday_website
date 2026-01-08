import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  useEffect(() => {
    // Reliable 8-bit style track (Internet Archive)
    audioRef.current = new Audio('https://ia800504.us.archive.org/11/items/01_8-bit_Intro/01_8-bit_Intro.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-arcadeBlack border-2 border-neonCyan hover:bg-neonCyan/20 transition-all duration-300 shadow-[4px_4px_0px_0px_#FF2ECC] active:translate-y-1 active:shadow-none group"
      aria-label="Toggle music"
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-neonYellow animate-pulse" />
      ) : (
        <VolumeX className="w-6 h-6 text-gray-500" />
      )}
      
      {/* Tooltip */}
      <span className="absolute left-16 px-2 py-1 bg-retroPurple border border-neonMagenta text-neonCyan font-terminal text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isPlaying ? 'MUTE BGM' : 'PLAY BGM'}
      </span>
    </button>
  );
};

export default MusicPlayer;