import { useRef } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import data from '../../data/projectData.json';

// ── SECTION HEADER ────────────────────────────────────────────────────────────
const SectionHeader = ({ label, title, accent }) => (
  <div className="mb-20 pl-8 md:pl-16">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-4"
    >
      {label}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="text-[10vw] md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
    >
      {title} <span className="text-indigo-200">{accent}</span>
    </motion.h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-0.5 w-24 bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent origin-left"
    />
  </div>
);

// ── EXPERIENCE CARD ───────────────────────────────────────────────────────────
const ExperienceCard = ({ job, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative pl-8 md:pl-16 py-5 group">

      {/* TIMELINE NODE */}
      <div className="absolute left-[-5px] top-8 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.1 }}
          className="relative w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-500 group-hover:bg-indigo-500 transition-all duration-500 shadow-sm"
        >
          <div className="absolute inset-[-4px] rounded-full border border-indigo-300/0 group-hover:border-indigo-300/60 group-hover:scale-[2] transition-all duration-500 scale-100" />
        </motion.div>
      </div>

      {/* DATE (Desktop) */}
      <div className="absolute left-[-175px] top-[26px] hidden md:block text-right w-[155px]">
        <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-500 transition-colors duration-300 tracking-wide uppercase">
          {job.date}
        </span>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
        onMouseMove={handleMouseMove}
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 md:p-8 transition-all duration-300 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/60 hover:-translate-y-1 backdrop-blur-sm"
      >
        {/* SPOTLIGHT */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.07), transparent 80%)`,
          }}
        />

        <div className="relative z-10">
          {/* MOBILE DATE */}
          <span className="md:hidden text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-3 block">
            {job.date}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-tight">
                {job.role}
              </h3>
              <span className="text-sm font-semibold text-indigo-600 mt-1 block">{job.company}</span>
            </div>
            {/* Type badge */}
            <span className="self-start text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap">
              Full-time
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-6 max-w-2xl">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section id="experience" className="relative bg-transparent py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <SectionHeader label="Career Journey" title="Experience" accent="." />

        {/* TIMELINE */}
        <div ref={containerRef} className="relative">

          {/* SPINE */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-200">
            <motion.div
              className="absolute top-0 inset-x-0 origin-top"
              style={{
                scaleY: smoothProgress,
                background: 'linear-gradient(to bottom, #6366f1, #a78bfa, transparent)',
                width: '100%',
                position: 'absolute',
                top: 0,
                bottom: 0,
                transformOrigin: 'top',
                boxShadow: '0 0 10px rgba(99,102,241,0.4)',
              }}
            />
          </div>

          <div className="space-y-10">
            {data.experience.map((job, i) => (
              <ExperienceCard key={i} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};