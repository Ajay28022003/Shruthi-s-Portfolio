import { motion } from 'framer-motion';

export const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      
      {/* 1. THE CYBER GRID */}
      {/* A CSS pattern that creates a subtle engineering grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. THE FLOATING NEBULA (Animated Orbs) */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Orb 1: Cyan (Top Left) */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] opacity-50 mix-blend-screen"
        />

        {/* Orb 2: Purple (Bottom Right) */}
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] opacity-50 mix-blend-screen"
        />
        
        {/* Orb 3: Center Pulse */}
        <motion.div
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px]"
        />
      </div>

      {/* 3. NOISE TEXTURE (High-End Finish) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      
      {/* 4. VIGNETTE FADE */}
      {/* Softens the edges so it blends nicely */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
};