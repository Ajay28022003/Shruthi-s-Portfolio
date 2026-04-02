import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home',       href: '#home'       },
    { name: 'Experience', href: '#experience'  },
    { name: 'Projects',   href: '#projects'    },
    { name: 'Skills',     href: '#skills'      },
    { name: 'Education',  href: '#education'   },
  ];

  // Scroll-aware glass
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking — uses getBoundingClientRect for true document position
  // (offsetTop breaks when sections are inside a `relative` positioned wrapper)
  useEffect(() => {
    const NAVBAR_H = 80;
    const allIds = ['home', 'experience', 'projects', 'skills', 'education', 'connect'];

    const getActive = () => {
      const threshold = window.scrollY + NAVBAR_H + 60;
      let current = 'home';

      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        // getBoundingClientRect().top + scrollY = true distance from document top
        const docTop = el.getBoundingClientRect().top + window.scrollY;
        if (docTop <= threshold) {
          current = id;
        } else {
          break; // sections are in DOM order, safe to stop
        }
      }
      setActiveSection(current);
    };

    getActive();
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/80 border-b border-slate-200/80 backdrop-blur-xl shadow-sm shadow-slate-100'
          : 'py-7 bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 max-w-7xl mx-auto">

        {/* LOGO */}
        <a href="#home" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 shadow-md shadow-indigo-300/50 overflow-hidden"
          >
            <span className="font-black text-white text-xs tracking-tight">SK</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-black text-slate-900 tracking-tight leading-none">Shruthi</span>
            <span className="text-indigo-500 font-black">.</span>
          </div>
        </a>

        {/* PILL NAV — Desktop */}
        <div className={`hidden md:flex items-center p-1 rounded-2xl transition-all duration-300 ${
          scrolled ? 'bg-slate-100/80' : 'bg-white/70 border border-white/80 backdrop-blur-md shadow-sm'
        }`}>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                  isActive ? 'text-indigo-600' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-indigo-50 border border-indigo-200/80 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {/* Hover indicator */}
                {hoveredIndex === i && !isActive && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-slate-100 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#connect"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-300/50 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300/60 transition-all"
          >
            Let's Talk
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="10" x2="10" y2="2" /><polyline points="2 2 10 2 10 10" />
            </svg>
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-full mt-2 mx-4 left-0 right-0 p-5 bg-white/95 border border-slate-200 rounded-2xl backdrop-blur-xl shadow-xl shadow-slate-200/60 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-semibold rounded-xl border-l-2 transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-indigo-600 border-indigo-400 bg-indigo-50'
                      : 'text-slate-600 border-transparent hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/60'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <a
                href="#connect"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 bg-indigo-600 text-white font-bold rounded-xl text-center shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
              >
                Let's Talk →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};