import { motion } from 'framer-motion';
import data from '../../data/projectData.json';

const GradIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const FlipCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.92 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
    className="group h-80 w-full perspective-1000"
  >
    <div className="relative h-full w-full transition-all duration-700 ease-in-out transform-style-3d group-hover:rotate-y-180">

      {/* ── FRONT FACE ── */}
      <div className="absolute inset-0 h-full w-full rounded-3xl bg-white/80 border border-slate-200/80 p-7 backdrop-blur-sm backface-hidden flex flex-col justify-between shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-100/60 hover:border-indigo-200 transition-all">
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer transition-opacity" />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-11 h-11 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center mb-6 text-indigo-600 shadow-sm">
            <GradIcon />
          </div>

          {/* Degree */}
          <h3 className="text-base font-bold text-slate-900 mb-1 leading-tight">{edu.degree}</h3>
          <p className="text-sm text-indigo-600 font-semibold mb-2">{edu.school}</p>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">{edu.year}</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
            <span>Flip for details</span>
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
          </div>
        </div>
      </div>

      {/* ── BACK FACE ── */}
      <div className="absolute inset-0 h-full w-full rounded-3xl p-7 backface-hidden rotate-y-180 flex flex-col justify-center text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #a21caf 100%)' }}
      >
        {/* Background decor circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-white/10" />
        <div className="absolute top-6 left-6 w-20 h-20 rounded-full border border-white/5" />

        <div className="relative z-10">
          <h4 className="text-lg font-black text-white mb-3 tracking-tight">Course Highlights</h4>
          <p className="text-indigo-50 text-sm leading-relaxed mb-6">{edu.desc}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {edu.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="px-3 py-1 text-xs font-bold bg-white/15 border border-white/25 rounded-full text-white backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const Education = () => (
  <section id="education" className="relative py-32 px-6 bg-transparent">
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-4"
        >
          Academic Background
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="text-[10vw] md:text-6xl font-black text-slate-900 mb-4 tracking-tighter"
        >
          Academic <span className="text-indigo-200">Database.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-md mx-auto text-sm font-medium"
        >
          Hover over each card to see what I studied inside.
        </motion.p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.education.map((edu, i) => (
          <FlipCard key={i} edu={edu} index={i} />
        ))}
      </div>
    </div>
  </section>
);