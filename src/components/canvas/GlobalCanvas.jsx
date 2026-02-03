import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// 1. NEURAL NODES (The Brain)
const NeuralNetwork = ({ count = 3000, radius = 6 }) => {
  const points = useRef();

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
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00f3ff" transparent opacity={0.6} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// 2. DATA PACKETS (Floating Cubes)
const DataStream = () => {
  const group = useRef();
  
  const blocks = useMemo(() => {
    return new Array(50).fill().map(() => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.5 + 0.2
    }));
  }, []);

  useFrame((state) => {
    group.current.rotation.z = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={group}>
      {blocks.map((data, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={data.position} rotation={data.rotation} scale={data.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// 3. CORE PROCESSOR
const AICore = () => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshPhysicalMaterial 
        color="#000000" 
        roughness={0} 
        metalness={1} 
        emissive="#00f3ff"
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  );
};

// 4. SCENE CONTROLLER (The Animation Logic)
const SceneContent = () => {
  const { camera, mouse } = useThree();
  const groupRef = useRef();
  
  // Use a ref for scroll to avoid re-renders, but state for listeners if needed
  // Here we use simple state to track value
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      // Normalized scroll 0 to 1
      setScrollY(window.scrollY / total);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    // A. MOUSE LOOK (Tilt)
    const targetRotX = mouse.y * 0.3; 
    const targetRotY = mouse.x * 0.3;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);

    // B. SCROLL FLY-THROUGH (Camera movement)
    // Moves from Z=12 to Z=6
    const targetZ = 12 - (scrollY * 6);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);

    // C. SHRINK & EXPAND LOGIC (The Pulse)
    // Math.sin(scrollY * Frequency) * Amplitude
    // * 10 = Frequency (How many times it pumps per page scroll)
    // * 0.3 = Amplitude (How big/small it gets)
    const pulse = Math.sin(scrollY * 10) * 0.3;
    
    // Base scale is 1. We add the pulse.
    // Result: Scales between 0.7 (Shrink) and 1.3 (Expand)
    const targetScale = 1 + pulse;

    // Apply smooth Lerp so it doesn't snap
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
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
export const GlobalCanvas = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 bg-black">
      <Canvas>
        <color attach="background" args={['#050505']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <fog attach="fog" args={['#050505', 5, 25]} />
        
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#00f3ff" />
        
        <SceneContent />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};