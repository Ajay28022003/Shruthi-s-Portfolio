import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Background } from './components/Background';

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <div className="relative w-full min-h-screen bg-[#eef2ff] text-slate-900">

      <AnimatePresence mode="wait">
        {isLoading && <Loader setIsLoading={handleLoadingComplete} />}
      </AnimatePresence>

      <Cursor />
      <Navbar />

      <main>
        {/* HERO — has its own 3D canvas */}
        <Hero />

        {/* CONTENT SECTIONS — shared gradient background */}
        <div className="relative">
          <Background />
          <div className="relative z-10">
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </div>
        </div>
      </main>

    </div>
  );
}