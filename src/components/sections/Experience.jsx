import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ANIMATION VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "circOut", staggerChildren: 0.1 } 
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// --- SPOTLIGHT CARD COMPONENT ---
const ExperienceCard = ({ job, index }) => {
  // Mouse tracking for the Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative pl-8 md:pl-16 py-6 group">
      
      {/* 1. TIMELINE NODE (With Pulse Animation) */}
      <div className="absolute left-[-5px] top-8 flex items-center justify-center z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-400 transition-colors duration-500"
        >
          {/* Ripple Effect on Hover */}
          <div className="absolute inset-0 -z-10 rounded-full bg-cyan-400/50 opacity-0 group-hover:animate-ping" />
        </motion.div>
      </div>

      {/* 2. DATE (Desktop) */}
      <div className="absolute left-[-150px] top-8 hidden md:block text-right w-[120px]">
        <span className="text-sm font-bold text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
          {job.date}
        </span>
      </div>

      {/* 3. THE SPOTLIGHT CARD */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-6 md:p-8 transition-colors hover:border-white/10"
      >
        
        {/* SPOTLIGHT GRADIENT OVERLAY */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* CONTENT (Relative z-10 to sit above spotlight) */}
        <div className="relative z-10">
          <motion.span variants={childVariants} className="md:hidden text-xs font-bold text-cyan-400 mb-2 block">
            {job.date}
          </motion.span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <motion.h3 variants={childVariants} className="text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors">
              {job.role}
            </motion.h3>
            <motion.span variants={childVariants} className="text-sm font-medium text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {job.company}
            </motion.span>
          </div>

          <motion.p variants={childVariants} className="text-slate-400 leading-relaxed mb-6 max-w-2xl">
            {job.description}
          </motion.p>

          <motion.div variants={childVariants} className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <motion.span 
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1 text-xs font-semibold text-slate-500 bg-transparent rounded border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default"
              >
                # {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

// --- MAIN SECTION ---
export const Experience = () => {
  const containerRef = useRef(null);
  
  // Create a smoother scroll progress for the laser line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="relative bg-transparent py-32 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 pl-8 md:pl-16">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10vw] md:text-6xl font-bold text-white mb-6 tracking-tighter"
          >
            Experience <span className="text-slate-700">.</span>
          </motion.h2>
          <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="h-px w-24 bg-cyan-500 mb-6 origin-left"
          />
        </div>

        {/* TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative">
          
          {/* THE SPINE */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 md:left-[0.5px]">
            {/* The Glowing Laser Beam */}
            <motion.div 
              style={{ scaleY: smoothProgress }} 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent origin-top shadow-[0_0_20px_2px_rgba(6,182,212,0.5)]"
            />
          </div>

          {/* CARDS */}
          <div className="space-y-12">
            {data.experience.map((job, i) => (
              <ExperienceCard key={i} job={job} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};