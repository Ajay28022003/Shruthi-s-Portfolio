import { HeroScene } from '../canvas/HeroScene';
import { motion } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ICON COMPONENTS (No extra install needed) ---
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      
      {/* 1. BACKGROUND: THE AI BRAIN */}
      <HeroScene />
      
      {/* 2. HERO CONTENT */}
      <div className="relative z-10 max-w-5xl ">
        
        {/* A. Role Badge (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-300 text-sm font-medium tracking-wide mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          {data.hero.role}
        </motion.div>

        {/* B. Name (Massive & Clean) */}
        <motion.h1 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-7xl md:text-[rem] font-extrabold tracking-tighter text-white mb-6 leading-[0.9]"
        >
          {data.hero.name}
          <span className="text-cyan-500">.</span>
        </motion.h1>

        {/* C. Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
        >
          {data.hero.description}
        </motion.p>

        {/* D. ACTION BAR (Resume + Socials) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pointer-events-auto"
        >
          {/* 1. Primary Button: Resume */}
          <a 
            href={data.hero.socials.resume} 
            download
            className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
          >
            <span className="relative z-10">Download Resume</span>
            <DownloadIcon />
            {/* Hover Swipe Effect */}
            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </a>

          {/* 2. Social Divider (Visual Only) */}
          <div className="hidden sm:block w-px h-12 bg-white/20 mx-2"></div>

          {/* 3. Social Icons (Glass Bar) */}
          <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            
            <a href={data.hero.socials.github} target="_blank" rel="noreferrer" className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-110">
              <GithubIcon />
            </a>
            
            <a href={data.hero.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all hover:scale-110">
              <LinkedinIcon />
            </a>
            
            {/* <a href={data.hero.socials.instagram} target="_blank" rel="noreferrer" className="p-2 text-slate-300 hover:text-pink-500 hover:bg-white/10 rounded-full transition-all hover:scale-110">
              <InstagramIcon />
            </a> */}

          </div>
        </motion.div>

      </div>
    </section>
  );
};