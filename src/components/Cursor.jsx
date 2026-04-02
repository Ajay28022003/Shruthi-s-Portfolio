import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // 1. Motion Values for smooth tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Spring Physics (The "Trail" Effect)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 3. Track Mouse Position
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // 4. Detect Hoverable Elements (Links, Buttons)
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    // 5. Detect Clicks
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      
      {/* INNER DOT (Follows instantly) */}
      <motion.div
        style={{
          translateX: mouseX,
          translateY: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        className="absolute w-2 h-2 bg-indigo-600 rounded-full"
      />

      {/* OUTER RING (Follows with spring physics) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: hovered ? 60 : 32,
          height: hovered ? 60 : 32,
          opacity: hovered ? 0.6 : 0.4,
          backgroundColor: clicked ? "rgba(99, 102, 241, 0.15)" : "transparent",
          border: clicked ? "2px solid #6366f1" : "2px solid #6366f1",
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute rounded-full pointer-events-none"
      />
    </div>
  );
};