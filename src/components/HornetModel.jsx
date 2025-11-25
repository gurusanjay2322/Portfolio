import { Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

function HornetSTL() {
  const meshRef = useRef();
  
  // Load the STL file
  const geometry = useLoader(STLLoader, '/src/assets/model/4_Hornet_Kc_v4_Full_.stl');

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, 0]} scale={0.015}>
      <meshStandardMaterial 
        color="#ed213a" 
        metalness={0.3} 
        roughness={0.4}
        emissive="#ed213a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ed213a" wireframe />
    </mesh>
  );
}

export default function HornetModel() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#f8b500" />
        
        <Suspense fallback={<Loader />}>
          <HornetSTL />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
