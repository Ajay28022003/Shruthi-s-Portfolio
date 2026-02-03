import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useScroll, useTransform } from 'framer-motion';

const NeuralCore = () => {
  const meshRef = useRef();
  const { scrollYProgress } = useScroll();

  // Scroll-based 3D animations
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 2.2, 1.8]);
  const color = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.7, 1], 
    ["#06b6d4", "#8b5cf6", "#3b82f6", "#06b6d4"] // Cyan -> Purple -> Blue
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    // Apply Framer Motion transforms to Three.js mesh
    meshRef.current.rotation.y = rotateY.get();
    meshRef.current.scale.setScalar(scale.get());
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color.get()}
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

export const ModelBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <NeuralCore />
      </Canvas>
    </div>
  );
};