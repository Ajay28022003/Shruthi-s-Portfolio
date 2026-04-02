import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, MeshDistortMaterial, Torus, Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ── GIANT CENTRAL CRYSTAL GEM ────────────────────────────────────────────────
const CrystalGem = () => {
  const outerMesh = useRef();
  const innerMesh = useRef();
  const wireframe = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    outerMesh.current.rotation.y = t * 0.25;
    outerMesh.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    innerMesh.current.rotation.y = -t * 0.4;
    innerMesh.current.rotation.z = t * 0.2;
    wireframe.current.rotation.y = t * 0.18;
    wireframe.current.rotation.x = Math.cos(t * 0.12) * 0.15;
    // Breathing scale
    const scale = 1 + Math.sin(t * 0.8) * 0.03;
    outerMesh.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
      <group position={[3.2, 0.2, 0]}>
        {/* Outer transparent gem */}
        <mesh ref={outerMesh} scale={2.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#818cf8"
            transparent
            opacity={0.12}
            roughness={0}
            metalness={0.2}
            transmission={0.9}
            thickness={2}
          />
        </mesh>

        {/* Mid wireframe cage */}
        <mesh ref={wireframe} scale={2.0}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.55}
            emissive="#6366f1"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Inner solid glowing core */}
        <mesh ref={innerMesh} scale={1.1}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.85}
            roughness={0}
            metalness={0.9}
            emissive="#7c3aed"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Core glow point */}
        <pointLight color="#818cf8" intensity={8} distance={8} />
      </group>
    </Float>
  );
};

// ── ORBITAL RINGS ─────────────────────────────────────────────────────────────
const OrbitalRing = ({ radius, color, speed, tiltX, tiltZ, tubeRadius = 0.025 }) => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.z = state.clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={mesh} position={[3.2, 0.2, 0]} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tubeRadius, 24, 120]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.75}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
};

// ── ORBITING SATELLITE SPHERES ────────────────────────────────────────────────
const OrbitingSphere = ({ orbitRadius, speed, offset, color, size }) => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    mesh.current.position.x = 3.2 + Math.cos(t) * orbitRadius;
    mesh.current.position.y = 0.2 + Math.sin(t) * orbitRadius * 0.5;
    mesh.current.position.z = Math.sin(t) * orbitRadius * 0.3;
    mesh.current.rotation.y = t * 2;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0}
        metalness={0.8}
      />
    </mesh>
  );
};

// ── FLOATING GEOMETRIC ACCENT SHAPES ─────────────────────────────────────────
const FloatingShape = ({ position, color, size, speed, offset, type }) => {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.7;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.4;
  });

  const geo = type === 'octa'
    ? <octahedronGeometry args={[size, 0]} />
    : type === 'tetra'
    ? <tetrahedronGeometry args={[size, 0]} />
    : <boxGeometry args={[size, size, size]} />;

  return (
    <mesh ref={mesh} position={position}>
      {geo}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={type === 'box' ? 0.2 : 0.7}
        wireframe={type === 'box'}
        emissive={color}
        emissiveIntensity={type === 'box' ? 0 : 0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// ── GLOWING PARTICLE GALAXY ───────────────────────────────────────────────────
const ParticleGalaxy = ({ count = 1200 }) => {
  const points = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const palette = [
      new THREE.Color('#6366f1'), // indigo
      new THREE.Color('#8b5cf6'), // violet
      new THREE.Color('#a78bfa'), // light violet
      new THREE.Color('#38bdf8'), // sky
      new THREE.Color('#818cf8'), // indigo light
      new THREE.Color('#c4b5fd'), // very light violet
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a wide ellipsoid
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 8 + Math.random() * 12;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.7;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = Math.random() * 1.5 + 0.3;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
        <bufferAttribute attach="attributes-size"     count={count} array={sizes}     itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ── GRID PLANE ───────────────────────────────────────────────────────────────
const GridPlane = () => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.material.opacity = 0.12 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.04;
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[60, 60, 30, 30]} />
      <meshBasicMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
};

// ── CONNECTING LINES (Animated edges between shapes) ─────────────────────────
const GlowLine = ({ start, end, color }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.material.opacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
  });
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
};

// ── SCENE ASSEMBLY ────────────────────────────────────────────────────────────
const SceneContent = () => {
  const { mouse } = useThree();
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.12, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.12, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* === CENTERPIECE === */}
      <CrystalGem />

      {/* === ORBITAL RINGS === */}
      <OrbitalRing radius={3.2} color="#6366f1" speed={0.5}  tiltX={0.3}  tiltZ={0}    tubeRadius={0.022} />
      <OrbitalRing radius={4.0} color="#a78bfa" speed={-0.3} tiltX={1.1}  tiltZ={0.4}  tubeRadius={0.016} />
      <OrbitalRing radius={5.0} color="#818cf8" speed={0.2}  tiltX={0.5}  tiltZ={1.2}  tubeRadius={0.012} />

      {/* === ORBITING SATELLITES === */}
      <OrbitingSphere orbitRadius={3.5} speed={0.6}  offset={0}            color="#818cf8" size={0.12} />
      <OrbitingSphere orbitRadius={3.5} speed={0.6}  offset={Math.PI}      color="#38bdf8" size={0.10} />
      <OrbitingSphere orbitRadius={4.5} speed={-0.4} offset={Math.PI / 2}  color="#a78bfa" size={0.08} />
      <OrbitingSphere orbitRadius={4.5} speed={-0.4} offset={Math.PI * 1.5} color="#c4b5fd" size={0.06} />

      {/* === ACCENT FLOATING SHAPES === */}
      <FloatingShape position={[-6, 2, -2]}  color="#6366f1" size={0.5}  speed={0.5} offset={0}          type="octa"  />
      <FloatingShape position={[-4, -3, -1]} color="#a78bfa" size={0.35} speed={0.7} offset={2}          type="tetra" />
      <FloatingShape position={[8, -2, -4]}  color="#818cf8" size={0.4}  speed={0.4} offset={1}          type="octa"  />
      <FloatingShape position={[-2, 4, -5]}  color="#38bdf8" size={0.25} speed={0.9} offset={3}          type="tetra" />
      <FloatingShape position={[0, -4, -3]}  color="#6366f1" size={1.2}  speed={0.2} offset={1.5}        type="box"   />
      <FloatingShape position={[-8, 0, -6]}  color="#a78bfa" size={0.8}  speed={0.25} offset={4}         type="box"   />

      {/* === PARTICLE GALAXY === */}
      <ParticleGalaxy />

      {/* === CONNECTING LINES === */}
      <GlowLine start={[-6, 2, -2]} end={[3.2, 0.2, 0]}  color="#6366f1" />
      <GlowLine start={[-4, -3, -1]} end={[-6, 2, -2]}   color="#a78bfa" />

      {/* === PERSPECTIVE GRID === */}
      <GridPlane />
    </group>
  );
};

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#eef2ff']} />

        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={52} />

        {/* ── LIGHTING ── */}
        <ambientLight intensity={3} color="#f0f4ff" />
        <directionalLight position={[10, 10, 5]}   intensity={3}  color="#c7d2fe" />
        <directionalLight position={[-10, 5, 5]}   intensity={2}  color="#ddd6fe" />
        <directionalLight position={[0, -10, 2]}   intensity={1.5} color="#bae6fd" />
        <pointLight       position={[-5, 5, 5]}    intensity={3}  color="#818cf8" />
        <pointLight       position={[8, -3, -2]}   intensity={2}  color="#a78bfa" />
        <hemisphereLight skyColor="#f0f4ff" groundColor="#ddd6fe" intensity={1.5} />

        <SceneContent />
      </Canvas>
    </div>
  );
};