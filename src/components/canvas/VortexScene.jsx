import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// 1. THE PARTICLE VORTEX (Background Swirl)
const ParticleRing = ({ count = 2000, radius = 5, color = "#6366f1", speed = 0.1, spinDirection = 1 }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const r = (t * radius) + 1.5; // Leave empty space in center for the Core
      const spinAngle = r * 3 * spinDirection;
      const branchAngle = (i % 3) * ((2 * Math.PI) / 3);

      const randomX = (Math.random() - 0.5) * (t * 2);
      const randomY = (Math.random() - 0.5) * (t * 2);
      const randomZ = (Math.random() - 0.5) * (t * 2);

      const x = Math.cos(branchAngle + spinAngle) * r + randomX;
      const z = Math.sin(branchAngle + spinAngle) * r + randomZ;
      const y = randomY * (2 - t);

      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count, radius, spinDirection]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * speed * spinDirection;
  });

  return (
    <points ref={mesh}>
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
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
        transparent
      />
    </points>
  );
};

// 2. THE NEW "DATA CORE" (Replaces the Sphere)
const CyberCore = () => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Inner Diamond Pulse & Spin
    coreRef.current.rotation.y = t * 0.5;
    coreRef.current.rotation.x = t * 0.2;
    const pulse = 1 + Math.sin(t * 3) * 0.1;
    coreRef.current.scale.set(pulse, pulse, pulse);

    // 2. Gyroscopic Rings (Spinning wildly on different axes)
    ringRef1.current.rotation.x = t * 1.5;
    ringRef1.current.rotation.y = t * 0.5;
    
    ringRef2.current.rotation.y = t * 1.2;
    ringRef2.current.rotation.z = t * 0.3;

    ringRef3.current.rotation.x = t * -1;
    ringRef3.current.rotation.z = t * 0.8;
  });

  return (
    <group scale={0.8}>
      {/* A. The Inner Crystal (Solid Octahedron) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive="#4f46e5" 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={1} 
        />
      </mesh>

      {/* B. The Wireframe Cage (Around Crystal) */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.3} />
      </mesh>

      {/* C. Gyroscopic Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      <mesh ref={ringRef2}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ringRef3}>
        <torusGeometry args={[2.6, 0.05, 16, 100]} /> {/* Thicker outer ring */}
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>
      
      {/* D. Core Light Source */}
      <pointLight distance={10} intensity={10} color="#6366f1" />
    </group>
  );
};

// 3. SCROLL CAMERA LOGIC
const CameraController = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / document.body.scrollHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const targetZ = 14 - (scrollY * 10); // Fly closer
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
  });
  return null;
};

// 4. MOUSE TILT LOGIC
const InteractiveGroup = ({ children }) => {
  const groupRef = useRef();
  useFrame((state) => {
    const x = (state.mouse.y * 0.2);
    const y = (state.mouse.x * 0.2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, x, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, y, 0.1);
  });
  return <group ref={groupRef}>{children}</group>;
};

// 5. MAIN SCENE
export const VortexScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
        <CameraController />
        
        <fog attach="fog" args={['#000000', 5, 30]} />
        <ambientLight intensity={1} />
        
        <InteractiveGroup>
          {/* Background Spirals */}
          <ParticleRing count={3000} radius={6} speed={0.2} color="#4f46e5" spinDirection={1} />
          <ParticleRing count={2000} radius={10} speed={0.1} color="#ec4899" spinDirection={-1} />
          <ParticleRing count={1000} radius={14} speed={0.05} color="#ffffff" spinDirection={1} />
          
          {/* THE NEW CENTER PIECE */}
          <CyberCore />
        </InteractiveGroup>

        <Stars radius={50} count={3000} factor={4} fade speed={2} />
      </Canvas>
    </div>
  );
};