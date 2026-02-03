import { Float, Points, PointMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as random from 'maath/random/dist/maath-random.esm';

const Network = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const NetworkScene = () => {
  return (
    <>
      <fog attach="fog" args={['#000000', 1, 5]} />
      <Network />
    </>
  );
};