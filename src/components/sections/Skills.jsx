import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ICON HELPERS ---
const Icons = {
  layout: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
  server: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  cpu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ category, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(yPct * -20); 
    y.set(xPct * 20);  
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = Icons[category.icon];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: "circOut" }}
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative w-full h-full rounded-3xl bg-slate-900/40 border border-white/5 p-8 backdrop-blur-md group overflow-hidden"
    >
      {/* GLOWING BORDER & HOVER LIGHT EFFECT */}
      <div 
        style={{ transform: "translateZ(75px)" }} 
        className="absolute inset-4 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 group-hover:border-cyan-500/30 transition-all duration-500" 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-700 ease-in-out" />


      {/* CONTENT LAYER (Pops out in 3D) */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        
        {/* Header with Floating Icon */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Icon />
          </motion.div>
          <h3 className="text-2xl font-bold text-white tracking-wide">{category.title}</h3>
        </div>

        {/* Skills Grid with Staggered Entry */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {category.skills.map((skill, i) => (
            <motion.span 
              key={i}
              variants={pillVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.25)", borderColor: "rgba(6, 182, 212, 0.4)" }}
              className="px-3 py-1.5 text-sm font-bold text-slate-300 bg-white/5 rounded-lg border border-white/10 transition-colors duration-200 cursor-default shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
export const Skills = () => {
  return (
    // REMOVED 'bg-slate-950' AND REMOVED THE LOCAL GRID DIVS
    <section id="skills" className="relative bg-transparent py-32 px-6 overflow-hidden">
      
      {/* I have DELETED the local grid <div>s here.
        Now it is completely transparent, so the Global Nebula from Background.jsx will show through perfectly.
      */}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. HEADER */}
        <div className="text-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10vw] md:text-7xl font-extrabold text-white mb-6 tracking-tighter"
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Arsenal.</span>
          </motion.h2>
          
          {/* THE SYSTEM SCAN BEAM */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-full max-w-lg h-px bg-slate-800 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              whileInView={{ x: '200%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm"
            />
          </div>
        </div>

        {/* 2. THE HOLOGRAPHIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 perspective-1000">
          <TiltCard category={data.skills.frontend} delay={0.1} />
          <TiltCard category={data.skills.backend} delay={0.2} />
          <TiltCard category={data.skills.tools} delay={0.3} />
        </div>
      </div>
    </section>
  );
};