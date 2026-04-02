import { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ICONS ---
const ArrowUpIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const CopyIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

// --- MAGNETIC WRAPPER ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    position.x.set((clientX - (left + width / 2)) * 0.35);
    position.y.set((clientY - (top + height / 2)) * 0.35);
  };

  const reset = () => { position.x.set(0); position.y.set(0); };
  const springX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div style={{ x: springX, y: springY }} ref={ref} onMouseMove={handleMouse} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="connect" className="relative pt-32 pb-10 px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%)' }}>
      
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f130 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Accent orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. CALL TO ACTION SECTION */}
        <div className="flex flex-col items-center text-center mb-32">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-bold mb-6">
              Available for new projects
            </span>
            <h2 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-violet-600">Talk.</span>
            </h2>
            
            {/* EMAIL BUTTON */}
            <div className="flex justify-center">
              <Magnetic>
                <button 
                  onClick={handleCopy}
                  className="group relative flex items-center gap-3 px-7 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-base transition-all hover:shadow-[0_8px_30px_-6px_rgba(99,102,241,0.65)] hover:-translate-y-0.5 active:translate-y-0 overflow-hidden shadow-md shadow-indigo-200"
                >
                  <div className="absolute inset-0 bg-violet-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copied!" : data.contact.email}
                  </span>
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* SOCIAL LINKS ROW */}
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
                <GithubIcon /> <span>GitHub</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* 2. PROFESSIONAL FOOTER */}
        <div className="border-t border-slate-200 pt-16 flex flex-col md:flex-row justify-between gap-10">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <a href="#home" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-slate-900">
              <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold text-sm">SK</span>
              <span>Shruthi Kannapiran</span>
            </a>
            <p className="text-slate-600 leading-relaxed">
              I design and build scalable data pipelines and analytics systems. Passionate about transforming raw data into actionable insights, and actively exploring applied AI, machine learning, and intelligent data platforms.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-900 font-bold">Sitemap</h4>
              <a href="#home" className="text-slate-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#projects" className="text-slate-600 hover:text-indigo-600 transition-colors">Work</a>
              <a href="#experience" className="text-slate-600 hover:text-indigo-600 transition-colors">Experience</a>
              <a href="#skills" className="text-slate-600 hover:text-indigo-600 transition-colors">Skills</a>
              <a href="#education" className="text-slate-600 hover:text-indigo-600 transition-colors">Education</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-900 font-bold">Socials</h4>
              <a href={data.contact.linkedin} className="text-slate-600 hover:text-indigo-600 transition-colors">LinkedIn</a>
              <a href={data.contact.github} className="text-slate-600 hover:text-indigo-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT & BACK TO TOP */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            Back to Top
            <motion.span 
              animate={{ y: [0, -3, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowUpIcon />
            </motion.span>
          </button>
        </div>

      </div>
    </section>
  );
};