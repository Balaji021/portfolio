import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface AnimatedMeshProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

const AnimatedMesh = ({ position, color, speed }: AnimatedMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[0, 0.5]}
    >
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

interface FloatingShapeProps {
  className?: string;
}

const FloatingShape = ({ className = "" }: FloatingShapeProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: false, 
          alpha: false,
          powerPreference: "low-power",
          preserveDrawingBuffer: false
        }}
        dpr={[1, 1]}
        onError={(error) => {
          console.error('FloatingShape Canvas Error:', error);
        }}
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse flex items-center justify-center text-white text-xs">
              ✨
            </div>
          </div>
        }
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <AnimatedMesh position={[0, 0, 0]} color="#8b5cf6" speed={0.5} />
        <AnimatedMesh position={[2, 1, -1]} color="#06b6d4" speed={0.3} />
        <AnimatedMesh position={[-2, -1, -1]} color="#10b981" speed={0.7} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default FloatingShape;