import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ANIMATION VARIANTS ---
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// --- INDIVIDUAL CARD COMPONENT ---
const ProjectCard = ({ project, index, range, targetScale, progress }) => {
  const container = useRef(null);
  
  // Local scroll for the image parallax (Entrance effect)
  const { scrollYProgress: localScroll } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });
  
  const imageScale = useTransform(localScroll, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Add Physics Smoothing to the scale so it feels heavy/premium
  const smoothScale = useSpring(scale, { stiffness: 50, damping: 15, mass: 0.5 });

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale: smoothScale, 
          top: `calc(-5vh + ${index * 25}px)` 
        }} 
        className="relative flex flex-col w-full max-w-6xl h-[70vh] rounded-3xl border border-white/10 overflow-hidden bg-slate-900 shadow-2xl origin-top group"
      >
        
        {/* A. CARD CONTENT */}
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Left: Text Info */}
          <motion.div 
            className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between relative z-10 bg-slate-900/95 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={containerVariants}
          >
            <div>
              <motion.div variants={textVariants} className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                  0{index + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Selected Work</span>
              </motion.div>
              
              <motion.h3 variants={textVariants} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </motion.h3>
              
              <motion.p variants={textVariants} className="text-lg text-slate-400 leading-relaxed mb-8">
                {project.description}
              </motion.p>

              <motion.div variants={textVariants} className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div variants={textVariants} className="mt-8 md:mt-0">
              <a href="#" className="inline-flex items-center gap-2 text-white font-bold hover:text-cyan-400 transition-colors group/btn">
                View Case Study
                <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Image Area */}
          <div className="relative w-full md:w-[60%] h-full overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/90" />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN SECTION COMPONENT ---
export const Projects = () => {
  const container = useRef(null);
  
  // Global Progress Tracker for the Stacking Effect
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="projects" className="relative bg-transparent px-4 md:px-0">
      
      {/* 1. ANIMATED HEADER */}
      <div className="max-w-7xl mx-auto py-32 px-6 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white mb-6"
        >
          Selected <span className="text-slate-800">Works.</span>
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-px bg-white/10 origin-left" 
        />
      </div>

      {/* 2. STACKING CARDS */}
      <div className="w-full flex flex-col items-center gap-10 pb-32">
        {data.projects.map((project, i) => {
          const targetScale = 1 - ((data.projects.length - i) * 0.05);
          return (
            <ProjectCard 
              key={i} 
              index={i} 
              project={project} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale}
              progress={scrollYProgress} 
            />
          );
        })}
      </div>

    </section>
  );
};