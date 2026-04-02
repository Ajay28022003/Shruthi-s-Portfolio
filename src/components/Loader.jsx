import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techMessages = [
  "Initializing Portfolio...",
  "Loading 3D Environment...",
  "Calibrating Animations...",
  "Brewing Some Magic...",
  "Establishing Connection...",
  "Ready!"
];

export const Loader = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        const jump = Math.floor(Math.random() * 10) + 1; 
        return Math.min(prev + jump, 100);
      });
    }, 150);

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
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%)' }}
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      
      {/* 1. THE COUNTER */}
      <div className="relative mb-4">
        <span className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter">
          {progress}%
        </span>
        {/* Indigo dot */}
        <span className="absolute -top-2 -right-4 w-3 h-3 bg-indigo-500 rounded-full animate-ping" />
      </div>

      {/* 2. THE PROGRESS BAR */}
      <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* 3. STATUS MESSAGES */}
      <div className="h-6 overflow-hidden">
        <p className="text-sm font-mono text-slate-500">
          <span className="text-indigo-500 mr-2">{">"}</span>
          {techMessages[messageIndex]}
        </p>
      </div>

    </motion.div>
  );
};