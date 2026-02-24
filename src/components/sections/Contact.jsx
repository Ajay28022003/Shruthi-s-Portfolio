import { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import data from '../../data/projectData.json';

// --- ICONS ---
const ArrowUpIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const CopyIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

// Brand Icons
const GithubIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

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
    <section id="connect" className="relative bg-slate-950 pt-32 pb-10 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. CALL TO ACTION SECTION */}
        <div className="flex flex-col items-center text-center mb-32">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6">
              Available for new projects
            </span>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">Talk.</span>
            </h2>
            
            {/* COMPACT MAGNETIC EMAIL BUTTON */}
            <div className="flex justify-center">
              <Magnetic>
                <button 
                  onClick={handleCopy}
                  // ADDED 'overflow-hidden' HERE TO FIX THE BLUE RECTANGLE ISSUE
                  className="group relative flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 overflow-hidden"
                >
                  {/* Fill Effect (Now hidden until hover) */}
                  <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  
                  <span className="relative z-10 flex items-center gap-2">
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
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all">
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all">
                <GithubIcon /> <span>GitHub</span>
              </a>
            </Magnetic>
            {/* <Magnetic>
              <a href={data.contact.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all">
                <InstagramIcon /> <span>Instagram</span>
              </a>
            </Magnetic> */}
          </div>
        </div>

        {/* 2. PROFESSIONAL FOOTER */}
        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between gap-10">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <a href="#home" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
              <span className="flex items-center justify-center w-10 h-10 bg-cyan-500 text-black rounded-full">SK</span>
              <span>Shruthi Kannapiran</span>
            </a>
            <p className="text-slate-500 leading-relaxed">
I design and build scalable data pipelines and analytics systems. Passionate about transforming raw data into actionable insights, and actively exploring applied AI, machine learning, and intelligent data platforms.            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold">Sitemap</h4>
              <a href="#home" className="text-slate-500 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#projects" className="text-slate-500 hover:text-cyan-400 transition-colors">Work</a>
              <a href="#experience" className="text-slate-500 hover:text-cyan-400 transition-colors">Experience</a>
              <a href="#skills" className="text-slate-500 hover:text-cyan-400 transition-colors">Skills</a>                            <a href="#education" className="text-slate-500 hover:text-cyan-400 transition-colors">Education</a> {/* ADDED HERE */}

            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold">Socials</h4>
              <a href={data.contact.linkedin} className="text-slate-500 hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href={data.contact.github} className="text-slate-500 hover:text-cyan-400 transition-colors">GitHub</a>
              {/* <a href={data.contact.instagram} className="text-slate-500 hover:text-cyan-400 transition-colors">Instagram</a> */}
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT & BACK TO TOP */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors group"
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