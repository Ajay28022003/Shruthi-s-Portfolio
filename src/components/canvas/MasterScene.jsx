import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// 1. SIMPLE PARTICLE RING (No external deps)
const ParticleRing = ({ count = 2000, radius = 5, color = "#4f46e5", speed = 0.1 }) => {
  const points = useRef();

  // Generate particles using basic Math
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 2;
      
      // Spiral shape
      p[i * 3] = Math.cos(angle) * r;     // X
      p[i * 3 + 1] = (Math.random() - 0.5) * 2; // Y (Spread height)
      p[i * 3 + 2] = Math.sin(angle) * r;     // Z
    }
    return p;
  }, [count, radius]);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * speed;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 2. MONOLITHS (Simple Boxes)
const Monoliths = () => {
  return (
    <group>
      {/* Create a few floating blocks manually to guarantee visibility */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, -5]} rotation={[Math.random(), Math.random(), 0]}>
          <boxGeometry args={[1, 3, 0.2]} />
          <meshStandardMaterial color="#333" wireframe />
        </mesh>
      ))}
    </group>
  );
};

// 3. SCENE LOGIC
const SceneContent = () => {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Safe scroll calculation
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollY(window.scrollY / total);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // Camera Fly-Through Logic
    // Start at Z=15, fly to Z=5 based on scroll
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15 - (scrollY * 10), 0.1);
  });

  return (
    <>
      {/* 3 Different Rings for "Vortex" Look */}
      <ParticleRing count={2000} radius={8} color="#4f46e5" speed={0.1} />
      <ParticleRing count={1500} radius={12} color="#ec4899" speed={-0.05} />
      <ParticleRing count={1000} radius={16} color="#ffffff" speed={0.02} />
      
      {/* Background Objects */}
      <Monoliths />
      <Stars radius={50} count={5000} factor={4} fade speed={1} />
    </>
  );
};

// 4. MAIN EXPORT
export const MasterScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50"> {/* Ensure it is behind everything */}
      <Canvas>
        {/* THIS IS THE FIX: The Color is inside the Canvas */}
        <color attach="background" args={['#000000']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        
        {/* Bright Lights to ensure we see things */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#ffffff" />
        
        <SceneContent />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};