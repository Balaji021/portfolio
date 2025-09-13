import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TransparentParticlesProps {
  count?: number;
  speed?: number;
  size?: number;
  color?: string;
  opacity?: number;
}

const TransparentParticles = ({ 
  count = 1000, 
  speed = 0.5, 
  size = 0.5, 
  color = '#7877C6',
  opacity = 0.6 
}: TransparentParticlesProps) => {
  const meshRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color variations
      const colorVariation = Math.random() * 0.3 + 0.7;
      colors[i * 3] = 0.47 * colorVariation;     // R
      colors[i * 3 + 1] = 0.47 * colorVariation; // G
      colors[i * 3 + 2] = 0.78 * colorVariation; // B
    }
    
    return { positions, colors };
  }, [count]);

  const particlesSize = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * size + 0.1;
    }
    return sizes;
  }, [count, size]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire particle system
      meshRef.current.rotation.x = time * speed * 0.1;
      meshRef.current.rotation.y = time * speed * 0.2;
      meshRef.current.rotation.z = time * speed * 0.05;
      
      // Animate individual particles
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      const colors = meshRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Gentle floating motion
        positions[i3 + 1] += Math.sin(time + i * 0.01) * 0.001;
        positions[i3] += Math.cos(time + i * 0.01) * 0.0005;
        
        // Color pulsing
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.1 + 0.9;
        colors[i3] *= pulse;
        colors[i3 + 1] *= pulse;
        colors[i3 + 2] *= pulse;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particlesSize}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent={true}
        opacity={opacity}
        vertexColors={true}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default TransparentParticles;
