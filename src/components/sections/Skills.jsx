import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import data from '../../data/projectData.json';
import * as THREE from 'three';

// ── MINI 3D ICON CANVAS ───────────────────────────────────────────────────────
const SkillGem = ({ color }) => {
  const mesh = useRef();
  const c = new THREE.Color(color);

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Solid inner */}
        <mesh ref={mesh} scale={0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0} metalness={0.9} />
        </mesh>
        {/* Wireframe outer */}
        <mesh scale={0.72}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} wireframe transparent opacity={0.4} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        <pointLight color={color} intensity={2} distance={3} />
      </group>
    </Float>
  );
};

const SkillIcon3D = ({ color }) => (
  <div style={{ width: 80, height: 80 }}>
    <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} intensity={2} color="#c7d2fe" />
      <Suspense fallback={null}>
        <SkillGem color={color} />
      </Suspense>
    </Canvas>
  </div>
);

// ── ICON MAP ──────────────────────────────────────────────────────────────────
const categoryConfig = {
  layout:  { color: '#6366f1', label: 'Frontend'  },
  server:  { color: '#8b5cf6', label: 'Backend'   },
  cpu:     { color: '#38bdf8', label: 'Tools & AI' },
};

// ── 3D TILT CARD ──────────────────────────────────────────────────────────────
const TiltCard = ({ category, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 250, damping: 28 });
  const ySpring = useSpring(y, { stiffness: 250, damping: 28 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const conf = categoryConfig[category.icon] || categoryConfig.layout;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set((py / rect.height - 0.5) * -14);
    y.set((px / rect.width - 0.5) * 14);
    mouseX.set(px);
    mouseY.set(py);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}
      style={{ transformStyle: 'preserve-3d', transform }}
      className="group relative rounded-3xl bg-white/80 border border-slate-200/80 p-7 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/60 transition-shadow duration-500 cursor-default"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.07), transparent 80%)`,
        }}
      />

      {/* Inner glow ring */}
      <div
        style={{ transform: 'translateZ(40px)' }}
        className="absolute inset-3 rounded-2xl border border-transparent group-hover:border-indigo-200/60 transition-all duration-500"
      />

      <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">

        {/* 3D ICON */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <SkillIcon3D color={conf.color} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-0.5">{conf.label}</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{category.title}</h3>
          </div>
        </div>

        {/* SKILL PILLS */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.03 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Background accent gradient (bottom) */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom right, ${conf.color}18 0%, transparent 70%)` }}
      />
    </motion.div>
  );
};

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export const Skills = () => {
  return (
    <section id="skills" className="relative bg-transparent py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20 relative">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-4"
          >
            What I work with
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="text-[10vw] md:text-7xl font-black text-slate-900 mb-4 tracking-tighter"
          >
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600">
              Arsenal.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-lg mx-auto font-medium"
          >
            A curated stack of technologies I use to build fast, scalable, and intelligent systems.
          </motion.p>

          {/* SCAN BEAM */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-full max-w-md h-px bg-slate-200 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              whileInView={{ x: '200%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.4 }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-[1px]"
            />
          </div>
        </div>

        {/* 3D TILT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <TiltCard category={data.skills.frontend} delay={0.1} />
          <TiltCard category={data.skills.backend}  delay={0.2} />
          <TiltCard category={data.skills.tools}    delay={0.3} />
        </div>
      </div>
    </section>
  );
};