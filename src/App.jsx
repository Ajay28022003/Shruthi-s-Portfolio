import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Background } from './components/Background'; // Import the new Background

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
    <div className="relative w-full min-h-screen bg-slate-950 text-white">
      
      <AnimatePresence mode="wait">
        {isLoading && <Loader setIsLoading={handleLoadingComplete} />}
      </AnimatePresence>

      <Cursor />
      <Navbar />
      
      <main>
        {/* 1. HERO SECTION (Untouched, has its own 3D background) */}
        <Hero />
        
        {/* 2. CONTENT CONTAINER */}
        {/* We make this relative so the Background sits inside it */}
        <div className="relative z-10">
          
          {/* THE NEW BACKGROUND ANIMATION */}
          {/* It will stretch to cover all sections below */}
          <Background />
          
          {/* THE SECTIONS */}
          {/* We remove 'bg-slate-950' from here so the background shows through */}
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