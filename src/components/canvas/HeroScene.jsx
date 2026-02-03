import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// 1. NEURAL NODES (The Brain)
const NeuralNetwork = ({ count = 2000, radius = 6 }) => {
  const points = useRef();

  // Create particles
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = radius + (Math.random() - 0.5) * 0.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count, radius]);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
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
      {/* Increased Size & Opacity to ensure visibility */}
      <pointsMaterial 
        size={0.05} 
        color="#00f3ff" 
        transparent 
        opacity={0.8} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
};

// 2. DATA CUBES
const DataStream = () => {
  const group = useRef();
  const blocks = useMemo(() => new Array(30).fill().map(() => ({
    pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
    rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    scale: Math.random() * 0.5 + 0.3
  })), []);

  useFrame((state) => {
    group.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      {blocks.map((data, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={data.pos} rotation={data.rot} scale={data.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// 3. AI CORE
const AICore = () => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 0]} />
      {/* High Emissive Intensity to glow in the dark */}
      <meshStandardMaterial 
        color="#000000" 
        roughness={0} 
        metalness={1} 
        emissive="#00f3ff" 
        emissiveIntensity={2} 
        wireframe 
      />
    </mesh>
  );
};

// 4. SCENE CONTENT
const SceneContent = () => {
  const { camera, mouse } = useThree();
  const groupRef = useRef();

  useFrame(() => {
    // Subtle Mouse Tilt
    const targetX = mouse.y * 0.2;
    const targetY = mouse.x * 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <AICore />
      <NeuralNetwork />
      <DataStream />
    </group>
  );
};

// 5. MAIN COMPONENT
export const HeroScene = () => {
  return (
    // FIX: Removed 'bg-black' (let Canvas handle it) and changed z-index to 0
    // We rely on Hero.jsx text being z-10 to sit on top.
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas>
        {/* FIX: Explicit background color inside Canvas to prove it's rendering */}
        <color attach="background" args={['#020617']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
        
        {/* FIX: Strong lights to guarantee visibility */}
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={10} color="#00f3ff" />
        
        <SceneContent />
        
        {/* FIX: Added Stars as a fallback layer */}
        <Stars radius={50} count={2000} factor={4} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};