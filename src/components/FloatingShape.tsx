import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useDeviceDetection, getPerformanceConfig } from '@/hooks/useDeviceDetection';

interface AnimatedMeshProps {
  position: [number, number, number];
  color: string;
  speed: number;
  isMobile?: boolean;
}

const AnimatedMesh = ({ position, color, speed, isMobile = false }: AnimatedMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * speed;
      meshRef.current.rotation.y = time * speed * 0.5;
      
      // Reduce animation intensity on mobile
      if (isMobile) {
        meshRef.current.rotation.x *= 0.5;
        meshRef.current.rotation.y *= 0.5;
      }
    }
  });

  return (
    <Float
      speed={isMobile ? 0.5 : 1}
      rotationIntensity={isMobile ? 0.5 : 1}
      floatIntensity={isMobile ? 1 : 2}
      floatingRange={isMobile ? [0, 0.2] : [0, 0.5]}
    >
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={isMobile ? [0.8, 0] : [1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isMobile ? 0.1 : 0.3}
          speed={isMobile ? 1 : 2}
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
  const deviceInfo = useDeviceDetection();
  const performanceConfig = getPerformanceConfig(deviceInfo);

  // Fallback for low-end devices or no WebGL support
  if (!performanceConfig.enable3D) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse flex items-center justify-center text-white text-2xl">
          ✨
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: deviceInfo.isMobile ? 60 : 75 }}
        gl={{ 
          antialias: performanceConfig.antialias, 
          alpha: true,
          powerPreference: performanceConfig.powerPreference,
          preserveDrawingBuffer: false
        }}
        dpr={performanceConfig.dpr as [number, number]}
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
        <ambientLight intensity={deviceInfo.isMobile ? 0.3 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={deviceInfo.isMobile ? 0.5 : 1} />
        <pointLight position={[-10, -10, -10]} intensity={deviceInfo.isMobile ? 0.3 : 0.5} color="#8b5cf6" />
        
        <AnimatedMesh 
          position={[0, 0, 0]} 
          color="#8b5cf6" 
          speed={0.5} 
          isMobile={deviceInfo.isMobile} 
        />
        <AnimatedMesh 
          position={[2, 1, -1]} 
          color="#06b6d4" 
          speed={0.3} 
          isMobile={deviceInfo.isMobile} 
        />
        <AnimatedMesh 
          position={[-2, -1, -1]} 
          color="#10b981" 
          speed={0.7} 
          isMobile={deviceInfo.isMobile} 
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={deviceInfo.isMobile ? 0.5 : 1}
        />
      </Canvas>
    </div>
  );
};

export default FloatingShape;