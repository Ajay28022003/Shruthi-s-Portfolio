import { motion } from 'framer-motion';

// ── FLOATING GEOMETRIC SVG SHAPES ────────────────────────────────────────────
const FloatingGeom = ({ top, left, size, rotate, delay, opacity, shape }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: rotate - 30 }}
    whileInView={{ opacity, scale: 1, rotate }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 1.2, delay, ease: [0.33, 1, 0.68, 1] }}
    animate={{
      y: [0, -18, 0],
      rotate: [rotate, rotate + 8, rotate],
    }}
    style={{
      top,
      left,
      width: size,
      height: size,
      position: 'absolute',
      opacity,
    }}
  >
    {shape === 'hex' && (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="#6366f1" strokeWidth="1.5" fill="rgba(99,102,241,0.04)" />
      </svg>
    )}
    {shape === 'tri' && (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <polygon points="50,5 95,90 5,90"
          stroke="#8b5cf6" strokeWidth="1.5" fill="rgba(139,92,246,0.04)" />
      </svg>
    )}
    {shape === 'sq' && (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect x="10" y="10" width="80" height="80" rx="6"
          stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.04)"
          transform="rotate(45 50 50)" />
      </svg>
    )}
    {shape === 'circle' && (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <circle cx="50" cy="50" r="44"
          stroke="#a78bfa" strokeWidth="1.5" fill="rgba(167,139,250,0.04)" />
        <circle cx="50" cy="50" r="30"
          stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
      </svg>
    )}
  </motion.div>
);

// ── MAIN BACKGROUND COMPONENT ────────────────────────────────────────────────
export const Background = () => {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #eef2ff 0%, #f5f3ff 35%, #eff6ff 65%, #f0fdf4 100%)' }}
    >
      {/* 1. SUBTLE DOT GRID */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            radial-gradient(circle, #6366f118 1.5px, transparent 1.5px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. FLOWING GRADIENT ORBS */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-15%] w-[900px] h-[900px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)' }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 65%)' }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute top-[30%] right-[20%] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)' }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        className="absolute top-[55%] left-[15%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)' }}
      />

      {/* 3. FLOATING GEOMETRIC WIREFRAMES (3D-feel decoratives) */}
      <FloatingGeom top="8%"  left="4%"   size={120} rotate={15}  delay={0.2} opacity={0.7}  shape="hex"    />
      <FloatingGeom top="18%" left="80%"  size={90}  rotate={-20} delay={0.4} opacity={0.6}  shape="tri"    />
      <FloatingGeom top="42%" left="92%"  size={140} rotate={30}  delay={0.6} opacity={0.55} shape="sq"     />
      <FloatingGeom top="65%" left="2%"   size={100} rotate={-10} delay={0.3} opacity={0.6}  shape="circle" />
      <FloatingGeom top="78%" left="75%"  size={80}  rotate={45}  delay={0.5} opacity={0.5}  shape="hex"    />
      <FloatingGeom top="30%" left="48%"  size={70}  rotate={-30} delay={0.8} opacity={0.4}  shape="tri"    />
      <FloatingGeom top="88%" left="35%"  size={110} rotate={20}  delay={0.7} opacity={0.5}  shape="sq"     />
      <FloatingGeom top="5%"  left="55%"  size={90}  rotate={60}  delay={0.9} opacity={0.45} shape="circle" />

      {/* 4. TOP & BOTTOM SOFT FADES */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #eef2ff, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #eff6ff, transparent)' }} />

      {/* 5. DIAGONAL GRADIENT BAND */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(99,102,241,0.06) 60%, transparent 80%)' }}
      />
    </div>
  );
};