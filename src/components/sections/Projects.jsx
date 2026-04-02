import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../../data/projectData.json';

// ── PROJECT BENTO CARD ────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, isLarge, isFullWidth }) => {
  const [hovered, setHovered] = useState(false);

  // Distinct accent colors per project
  const accents = [
    { from: '#6366f1', to: '#8b5cf6', light: '#eef2ff', tag: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { from: '#0ea5e9', to: '#6366f1', light: '#f0f9ff', tag: 'bg-sky-50 text-sky-600 border-sky-200' },
    { from: '#8b5cf6', to: '#a21caf', light: '#faf5ff', tag: 'bg-violet-50 text-violet-600 border-violet-200' },
    { from: '#059669', to: '#0ea5e9', light: '#ecfdf5', tag: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { from: '#f59e0b', to: '#ef4444', light: '#fffbeb', tag: 'bg-amber-50 text-amber-600 border-amber-200' },
  ];
  const accent = accents[index % accents.length];

  // Full-width card renders as a side-by-side horizontal card
  if (isFullWidth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-6%' }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative col-span-1 md:col-span-3 rounded-3xl overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
        style={{
          boxShadow: hovered ? `0 20px 60px -15px ${accent.from}30, 0 0 0 1px ${accent.from}20` : undefined,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* TEXT SIDE */}
          <div className="flex flex-col justify-between p-7 md:w-[45%]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Selected Work</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech, i) => (
                  <span key={i} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${accent.tag} tracking-wide`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <a href="#" className={`inline-flex items-center gap-2 text-sm font-bold transition-colors`}
                style={{ color: accent.from }}>
                View on GitHub →
              </a>
            </div>
          </div>
          {/* IMAGE SIDE */}
          <div className="relative md:w-[55%] h-52 md:h-auto overflow-hidden">
            <motion.img
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, white 0%, transparent 30%, ${accent.from}11 100%)` }} />
          </div>
        </div>
        {/* Bottom accent */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
          style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
        />
      </motion.div>
    );
  }

  // Standard card
  return (

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.33, 1, 0.68, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
        isLarge ? 'md:col-span-2' : ''
      }`}
      style={{
        boxShadow: hovered
          ? `0 20px 60px -15px ${accent.from}30, 0 0 0 1px ${accent.from}20`
          : undefined,
      }}
    >
      {/* IMAGE AREA */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-56 md:h-64' : 'h-44'}`}>
        <motion.img
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, ${accent.from}22 100%)`,
            opacity: hovered ? 1 : 0.5,
          }}
        />
        {/* Index badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {/* Arrow icon */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent.from} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, isLarge ? 5 : 3).map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + i * 0.04 }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${accent.tag} tracking-wide`}
            >
              {tech}
            </motion.span>
          ))}
          {project.tech.length > (isLarge ? 5 : 3) && (
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-200 text-slate-400 bg-slate-50">
              +{project.tech.length - (isLarge ? 5 : 3)} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
      />
    </motion.div>
  );
};

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export const Projects = () => {
  const projects = data.projects;

  return (
    <section id="projects" className="relative bg-transparent py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-4"
          >
            Selected Work
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Projects<span className="text-slate-300">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 max-w-xs text-sm leading-relaxed font-medium"
            >
              A collection of data engineering, ML, and AI systems I've built.
            </motion.p>
          </div>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="mt-8 h-px origin-left"
            style={{ background: 'linear-gradient(to right, #6366f1, #a78bfa, transparent)' }}
          />
        </div>

        {/* BENTO GRID
            Row 1: [large card (col-span-2)] [small card]
            Row 2: [small card] [large card (col-span-2)]
            Row 3: [small card] ...etc
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const total = projects.length;
            const cols = 3;
            const isLarge = (i % 3 === 0);
            const itemsInLastRow = total % cols;
            const isLastAlone = (i === total - 1) && (itemsInLastRow === 1);

            if (isLastAlone) {
              return <ProjectCard key={i} project={project} index={i} isFullWidth />;
            }
            return (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                isLarge={isLarge}
              />
            );
          })}
        </div>

        {/* GITHUB CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <a
            href={data.contact.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/60 hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View All Projects on GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};