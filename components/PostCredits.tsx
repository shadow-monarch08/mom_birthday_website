import React from 'react';

const PostCredits: React.FC = () => {
  return (
    <div className="w-full bg-black py-20 flex flex-col items-center justify-center text-center z-10 relative">
        <p className="font-arcade text-gray-500 text-xs mb-4">mom_cinematic_universe_phase_5.exe</p>
        <h2 className="font-arcade text-2xl md:text-4xl text-white animate-pulse">
            MOM WILL RETURN
        </h2>
        <p className="font-terminal text-gray-400 mt-4 text-sm">
            (After a well deserved nap)
        </p>
    </div>
  );
};

export default PostCredits;