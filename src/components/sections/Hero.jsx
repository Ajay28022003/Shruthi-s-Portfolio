import { HeroScene } from '../canvas/HeroScene';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import data from '../../data/projectData.json';

// --- ICON COMPONENTS ---
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// ── ANIMATED WORD REVEAL ──────────────────────────────────────────────────────
const WordReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}>
          <motion.span
            display="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: 'inline-block' }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ── STAT COUNTER ─────────────────────────────────────────────────────────────
const StatBadge = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    className="flex flex-col items-center px-6 py-3 bg-white/60 border border-white/80 rounded-2xl backdrop-blur-md shadow-sm"
  >
    <span className="text-2xl font-black text-slate-900 tracking-tight">{value}</span>
    <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{label}</span>
  </motion.div>
);

// ── HERO SECTION ──────────────────────────────────────────────────────────────
export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      
      {/* 3D BACKGROUND */}
      <HeroScene />

      {/* GRADIENT OVERLAYS for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Left vignette — keeps text readable */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(238,242,255,0.85) 0%, rgba(238,242,255,0.4) 55%, transparent 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #f0f4ff, transparent)' }} />
      </div>

      {/* CONTENT with parallax */}
      <motion.div style={{ y: yText, opacity }} className="relative z-10 max-w-3xl">

        {/* A. ROLE BADGE */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 border border-indigo-200/80 rounded-full text-indigo-600 text-sm font-semibold tracking-wide mb-10 backdrop-blur-md shadow-md shadow-indigo-100"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {data.hero.role}
          <span className="ml-1 w-px h-4 bg-indigo-200" />
          <span className="text-indigo-400 text-xs font-medium">Open to work</span>
        </motion.div>

        {/* B. NAME — big staggered reveal */}
        <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-black tracking-tighter text-slate-900 leading-[0.88] mb-8">
          <WordReveal text={data.hero.name} delay={0.1} />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, type: 'spring', stiffness: 400, damping: 20 }}
            className="text-indigo-500"
          >
            .
          </motion.span>
        </h1>

        {/* C. DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="text-lg md:text-xl text-slate-700 max-w-xl font-medium leading-relaxed mb-10"
        >
          {data.hero.description}
        </motion.p>

        {/* D. CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          {/* Primary CTA */}
          <a
            href={data.hero.socials.resume}
            download
            className="group relative flex items-center gap-2.5 px-7 py-3.5 bg-indigo-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_8px_30px_-6px_rgba(99,102,241,0.65)] hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-indigo-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              <DownloadIcon />
              Download Resume
            </span>
            <div className="absolute inset-0 bg-violet-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#experience"
            className="group flex items-center gap-2 px-7 py-3.5 bg-white/80 text-slate-800 font-semibold rounded-xl border border-slate-200 backdrop-blur-sm hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/80 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            View My Work
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              <ArrowRightIcon />
            </span>
          </a>
        </motion.div>

        {/* E. STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <StatBadge value="3+" label="Years Exp." delay={0.9} />
          <StatBadge value="15+" label="Projects" delay={0.95} />
          <StatBadge value="8+" label="Tech Stack" delay={1.0} />

          <div className="ml-4 w-px h-10 bg-slate-200" />

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="flex items-center gap-2"
          >
            <a href={data.hero.socials.github} target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm">
              <GithubIcon />
            </a>
            <a href={data.hero.socials.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white/80 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm">
              <LinkedinIcon />
            </a>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500"
          />
        </div>
      </motion.div>
    </section>
  );
};