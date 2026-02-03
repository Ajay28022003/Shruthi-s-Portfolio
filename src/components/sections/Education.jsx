import { motion } from 'framer-motion';
import data from '../../data/projectData.json';

const FlipCard = ({ edu }) => {
  return (
    <div className="group h-80 w-full perspective-1000">
      {/* CARD CONTAINER */}
      <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-900/50 border border-white/10 p-8 backdrop-blur-sm backface-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
            <p className="text-slate-400">{edu.school}</p>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-sm font-mono text-slate-500">{edu.year}</span>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest border border-cyan-500/20 px-3 py-1 rounded bg-cyan-950/30">
              Hover for details
            </span>
          </div>
        </div>

        {/* BACK SIDE (Rotated 180 initially) */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-8 backdrop-blur-xl backface-hidden rotate-y-180 flex flex-col justify-center text-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <h4 className="text-xl font-bold text-white mb-4">Course Highlights</h4>
          <p className="text-slate-300 leading-relaxed mb-6">
            {edu.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {edu.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold bg-cyan-950/50 border border-cyan-500/20 rounded text-cyan-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="relative py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[10vw] md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Academic <span className="text-slate-700">Database.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A verified record of my academic background and certifications.
          </p>
        </motion.div>
        
        {/* 3D GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.education.map((edu, i) => (
            <FlipCard key={i} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
};