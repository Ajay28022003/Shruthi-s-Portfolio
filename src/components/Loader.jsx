import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techMessages = [
  "Initializing Neural Core...",
  "Loading 3D Environment...",
  "Calibrating Physics Engine...",
  "Injecting Creative Chaos...",
  "Establishing Secure Connection...",
  "System Ready."
];

export const Loader = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 1. SIMULATE LOADING PROGRESS
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800); // Wait a bit at 100% before lifting curtain
          return 100;
        }
        
        // Randomize speed to make it feel real
        const jump = Math.floor(Math.random() * 10) + 1; 
        return Math.min(prev + jump, 100);
      });
    }, 150);

    // 2. CYCLE MESSAGES
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % techMessages.length);
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [setIsLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }} // The "Curtain Lift" effect
    >
      
      {/* 1. THE COUNTER */}
      <div className="relative mb-4">
        <span className="text-6xl md:text-9xl font-black text-white tracking-tighter">
          {progress}%
        </span>
        {/* Glowing dot */}
        <span className="absolute -top-2 -right-4 w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
      </div>

      {/* 2. THE PROGRESS BAR */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* 3. TERMINAL MESSAGES */}
      <div className="h-6 overflow-hidden">
        <p className="text-sm font-mono text-slate-500">
          <span className="text-cyan-500 mr-2">{">"}</span>
          {techMessages[messageIndex]}
        </p>
      </div>

    </motion.div>
  );
};