import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
     { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
   
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' }, // ADDED THIS
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "circOut" }}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto"
    >
      {/* 1. LOGO (The "Core") */}
      <a href="#home" className="flex items-center gap-3 group">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-white/10 overflow-hidden shadow-lg shadow-cyan-900/20">
          <div className="absolute inset-0 bg-cyan-500/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative font-bold text-white text-lg">SK</span>
        </div>
        <span className="font-bold text-lg text-white tracking-tight hidden sm:block opacity-90 group-hover:opacity-100 transition-opacity">
          Shruthi<span className="text-cyan-400">.</span>
        </span>
      </a>

      {/* 2. CENTER NAV (The "Holographic Console") - Desktop Only */}
      <div className="hidden md:flex items-center p-1.5 rounded-full bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-2xl">
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-5 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            {/* The Sliding Glow Pill */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="navbar-glow"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </a>
        ))}
      </div>

      {/* 3. RIGHT ACTION (Connect) */}
      <div className="flex items-center gap-4">
        <a
          href="#connect"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] transition-all"
        >
          Let's Talk
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="10" x2="10" y2="2"></line><polyline points="2 2 10 2 10 10"></polyline></svg>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU (Holographic Card) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 p-6 bg-slate-900/95 border border-white/10 backdrop-blur-2xl rounded-2xl md:hidden z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-cyan-400 pl-2 border-l-2 border-transparent hover:border-cyan-400 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <a
                href="#connect"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl flex justify-center items-center gap-2"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};