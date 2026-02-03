import { Float, Environment } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const Monolith = ({ position, rotation, scale }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry />
        <meshPhysicalMaterial 
          color="#111111" 
          roughness={0.1} 
          metalness={0.8} 
          transmission={0.5} 
          thickness={2} 
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry()]} />
          <lineBasicMaterial color="#4f46e5" opacity={0.3} transparent />
        </lineSegments>
      </mesh>
    </Float>
  );
};

export const ProjectsScene = () => {
  const blocks = useMemo(() => {
    return new Array(15).fill().map(() => ({
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 5],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: [Math.random() * 0.5 + 0.5, Math.random() * 3 + 2, 0.2],
    }));
  }, []);

  return (
    <>
      <fog attach="fog" args={['#000000', 5, 20]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={10} color="#6366f1" />
      
      <group>
        {blocks.map((data, i) => (
           <Monolith key={i} {...data} />
        ))}
      </group>
      
      <Environment preset="city" />
    </>
  );
};