import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

// 1. BACKGROUND DEBRIS
const GeometricDebris = ({ count = 30 }) => {
  const debris = useMemo(() => {
    return new Array(count).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.5 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3)
    }));
  }, [count]);

  return (
    <group>
      {debris.map((data, i) => (
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
          <mesh position={data.position} rotation={data.rotation} scale={data.scale}>
            {data.type === 0 && <boxGeometry />}
            {data.type === 1 && <tetrahedronGeometry />}
            {data.type === 2 && <octahedronGeometry />}
            <meshStandardMaterial color="#333333" wireframe transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// 2. THE ULTRA-INTERACTIVE BUBBLE
const LiquidChrome = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport, mouse } = useThree(); // Get direct access to mouse & screen size
  
  const [scrollData, setScrollData] = useState({ current: 0, target: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollData(prev => ({ 
        ...prev, 
        target: window.scrollY / window.innerHeight 
      }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    // 1. SMOOTH SCROLL PHYSICS
    scrollData.current = THREE.MathUtils.lerp(scrollData.current, scrollData.target, delta * 2);

    // 2. MOUSE PHYSICS CALCS
    // Convert mouse range (-1 to 1) to rotation angles
    const mouseX = mouse.x * viewport.width / 2;
    const mouseY = mouse.y * viewport.height / 2;
    
    // Calculate distance from mouse to the bubble's center (approx X=3)
    const dist = Math.sqrt(Math.pow(mouseX - 3, 2) + Math.pow(mouseY, 2));
    
    // "Intensity" factor: 0 = far away, 1 = touching
    // The closer the mouse, the higher the value
    const proximity = Math.max(0, 1 - (dist / 6)); 

    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // POSITION: 
      // Base Parallax + Subtle Mouse Drag (Magnetic feel)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, scrollData.current * 1.5 + (mouse.y * 0.5), 0.1);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3 - (scrollData.current * 0.5) + (mouse.x * 0.5), 0.1);

      // ROTATION: 
      // Constant Spin + Scroll Spin + Mouse LookAt
      meshRef.current.rotation.x = t * 0.2 + scrollData.current + (mouse.y * 0.5);
      meshRef.current.rotation.y = t * 0.3 + scrollData.current * 2 + (mouse.x * 0.5);
    }

    if (materialRef.current) {
      // REACTION:
      // If mouse is close (proximity high), increase distortion speed and amount
      const targetDistort = 0.4 + (proximity * 0.4) + (scrollData.current * 0.2);
      const targetSpeed = 2 + (proximity * 5); // Speed up significantly on hover

      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1);
      
      // CHROMATIC ABERRATION (Glitch Effect):
      // When interacting, split the colors (RGB shift)
      // Base 0.05 + High intensity on proximity
      materialRef.current.chromaticAberration = 0.05 + (proximity * 0.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, 0, 0]} scale={2.5}>
        <icosahedronGeometry args={[1, 30]} /> {/* Higher detail for smoother liquid */}
        <MeshDistortMaterial
          ref={materialRef}
          color="#111111"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={0}
          radius={1}
          chromaticAberration={0.05} // Adds the rainbow edges
        />
      </mesh>
    </Float>
  );
};

// 3. MAIN SCENE
export const DarkGlassScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        
        <fog attach="fog" args={['#000000', 5, 20]} />
        <Stars radius={50} count={2000} factor={3} fade speed={1} />
        <GeometricDebris />

        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={30} color="#6366f1" />
        <spotLight position={[-10, -10, -10]} angle={0.5} penumbra={1} intensity={20} color="#ec4899" />
        <ambientLight intensity={0.5} />

        <LiquidChrome />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};