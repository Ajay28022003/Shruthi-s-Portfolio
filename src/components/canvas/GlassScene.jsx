import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const AnimatedBlob = () => {
  const meshRef = useRef();
  
  // State to track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Normalizing scroll for smoother rotation math
      setScrollY(window.scrollY * 0.001); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. BASE ANIMATION (Idling)
    // It wobbles and floats gently
    
    // 2. SCROLL ANIMATION
    // We add 'scrollY' to the rotation to make it spin when user scrolls
    meshRef.current.rotation.x = t * 0.2 + scrollY * 2; 
    meshRef.current.rotation.y = t * 0.3 + scrollY * 4; // Y spins faster

    // Optional: Move it slightly up/down based on scroll
    // meshRef.current.position.y = scrollY * -1; 
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      {/* 1. Position: Moved to x=3 (Right side) so it doesn't block text. 
         2. Scale: Reduced to 1.8 (Small & Elegant).
      */}
      <mesh ref={meshRef} position={[3, 0, 0]} scale={1.8}>
        
        {/* Sphere with high detail */}
        <icosahedronGeometry args={[1, 15]} />
        
        {/* NEW MATERIAL: HOLOGRAPHIC PEARL */}
        <MeshDistortMaterial
          color="#ffffff"        // White base for brightness
          attach="material"
          distort={0.4}          // Wobbly liquid effect
          speed={4}              // Fast wobble
          roughness={0}          // Shiny like chrome
          metalness={0.9}        // Very metallic
          bumpScale={0.005}
          clearcoat={1}          // Extra shiny layer
          clearcoatRoughness={0.1}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

export const GlassScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-50">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        
        {/* Bright Studio Lighting for the Pearl effect */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#4f46e5" /> {/* Indigo tint light */}
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#ec4899" /> {/* Pink tint light */}
        
        <AnimatedBlob />
        
        {/* City environment gives nice reflections on the metal */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};