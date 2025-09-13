import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AdvancedTransparentParticlesProps {
  count?: number;
  speed?: number;
  size?: number;
  opacity?: number;
  type?: 'spheres' | 'cubes' | 'stars' | 'mixed';
}

const AdvancedTransparentParticles = ({ 
  count = 500, 
  speed = 0.3, 
  size = 0.8, 
  opacity = 0.4,
  type = 'mixed'
}: AdvancedTransparentParticlesProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const [hovered, setHovered] = useState<number | null>(null);

  const { positions, rotations, scales, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rot = new Float32Array(count * 3);
    const scl = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a larger sphere
      const radius = Math.random() * 30 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      
      // Random rotations
      rot[i3] = Math.random() * Math.PI * 2;
      rot[i3 + 1] = Math.random() * Math.PI * 2;
      rot[i3 + 2] = Math.random() * Math.PI * 2;
      
      // Random scales
      const scale = Math.random() * size + 0.2;
      scl[i3] = scale;
      scl[i3 + 1] = scale;
      scl[i3 + 2] = scale;
      
      // Color variations based on position
      const distance = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
      const normalizedDistance = distance / 40;
      
      // Gradient from primary to secondary colors
      col[i3] = 0.47 + (0.59 - 0.47) * normalizedDistance;     // R
      col[i3 + 1] = 0.47 + (0.13 - 0.47) * normalizedDistance; // G
      col[i3 + 2] = 0.78 + (0.13 - 0.78) * normalizedDistance; // B
    }
    
    return { positions: pos, rotations: rot, scales: scl, colors: col };
  }, [count, size]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire system
      meshRef.current.rotation.x = time * speed * 0.1;
      meshRef.current.rotation.y = time * speed * 0.15;
      
      // Animate individual instances
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const rotation = new THREE.Euler();
      const scale = new THREE.Vector3();
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update position with floating motion
        position.set(
          positions[i3] + Math.sin(time + i * 0.01) * 0.5,
          positions[i3 + 1] + Math.cos(time + i * 0.015) * 0.3,
          positions[i3 + 2] + Math.sin(time * 0.5 + i * 0.02) * 0.2
        );
        
        // Update rotation
        rotation.set(
          rotations[i3] + time * speed * 0.1,
          rotations[i3 + 1] + time * speed * 0.15,
          rotations[i3 + 2] + time * speed * 0.05
        );
        
        // Update scale with pulsing effect
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.1 + 1;
        scale.set(
          scales[i3] * pulse,
          scales[i3 + 1] * pulse,
          scales[i3 + 2] * pulse
        );
        
        // Apply transformations
        matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
        meshRef.current.setMatrixAt(i, matrix);
      }
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Create different geometries based on type
  const geometry = useMemo(() => {
    switch (type) {
      case 'spheres':
        return new THREE.SphereGeometry(1, 8, 6);
      case 'cubes':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'stars':
        return new THREE.OctahedronGeometry(1, 0);
      case 'mixed':
      default:
        // Random mix of shapes
        const shapes = [
          new THREE.SphereGeometry(1, 8, 6),
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.OctahedronGeometry(1, 0),
          new THREE.TetrahedronGeometry(1, 0)
        ];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }
  }, [type]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(e.instanceId);
      }}
      onPointerOut={() => setHovered(null)}
    >
      <meshBasicMaterial
        transparent={true}
        opacity={opacity}
        color={new THREE.Color(0.47, 0.47, 0.78)}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default AdvancedTransparentParticles;
