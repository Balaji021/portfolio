import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';

import * as THREE from 'three';
import ParticleBackground from './ParticleBackground';
import { useDeviceDetection, getPerformanceConfig } from '@/hooks/useDeviceDetection';

const AnimatedSkillIndicator = ({ skill, position }: { skill: any; position: [number, number, number] }) => {
  const indicatorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (indicatorRef.current) {
      indicatorRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={indicatorRef} position={[position[0], position[1] - 1.7, position[2]]}>
      {/* Skill level progress bars in hexagon pattern */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.2;
        const barPosition: [number, number, number] = [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ];
        const isActive = i < (skill.level / 16.67); // 6 bars for 100%
        
        return (
          <mesh key={i} position={barPosition} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.05]} />
            <meshStandardMaterial
              color={isActive ? skill.color : "#333333"}
              emissive={isActive ? skill.color : "#000000"}
              emissiveIntensity={isActive ? 0.5 : 0}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Central energy core */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

const FloatingParticles = ({ skill, position }: { skill: any; position: [number, number, number] }) => {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        const particlePosition: [number, number, number] = [
          position[0] + Math.cos(angle) * radius,
          position[1] + Math.sin(angle * 0.5) * 0.5,
          position[2] + Math.sin(angle) * radius,
        ];
        return (
          <Float
            key={i}
            speed={2 + Math.random()}
            rotationIntensity={0.5}
            floatIntensity={0.3}
            floatingRange={[0, 0.2]}
          >
            <mesh position={particlePosition}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

const SkillIcon = (
  { skill, position, delay }: { skill: { name: string; color: string; level: number }; position: [number, number, number]; delay: number }
) => {
  // Map level [0-100] to size and glow
  const size = 0.8 + Math.min(Math.max(skill.level, 0), 100) * 0.003; // 0.8..1.1
  const glow = 0.2 + Math.min(Math.max(skill.level, 0), 100) * 0.006; // 0.2..0.8

  // Choose geometry variant for visual variety
  const idx = Math.abs(skill.name.charCodeAt(0) + skill.name.length) % 3;

  return (
    <Float speed={1.2 + Math.random()} rotationIntensity={0.8} floatIntensity={0.7} floatingRange={[0, 0.5]}>
      {/* Main 3D shape (varied) */}
      <group position={position}>
        {idx === 0 && (
          <mesh>
            <icosahedronGeometry args={[size, 1]} />
            <meshStandardMaterial color={skill.color} roughness={0.15} metalness={0.9} emissive={skill.color} emissiveIntensity={glow} />
          </mesh>
        )}
        {idx === 1 && (
          <mesh>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={skill.color} roughness={0.15} metalness={0.9} emissive={skill.color} emissiveIntensity={glow} />
          </mesh>
        )}
        {idx === 2 && (
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusKnotGeometry args={[size * 0.6, size * 0.18, 100, 12]} />
            <meshStandardMaterial color={skill.color} roughness={0.2} metalness={0.8} emissive={skill.color} emissiveIntensity={glow} />
          </mesh>
        )}

        {/* Decorative orbit ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}> 
          <torusGeometry args={[size * 1.4, 0.03, 16, 64]} />
          <meshStandardMaterial color={skill.color} transparent opacity={0.35} emissive={skill.color} emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Skill name */}
      <Text
        position={[position[0], position[1] + 2.2, position[2]]}
        fontSize={0.9}
        color={skill.color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.08}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </Float>
  );
};

const Skills3D = () => {
  const deviceInfo = useDeviceDetection();
  const performanceConfig = getPerformanceConfig(deviceInfo);
  const [webGLError, setWebGLError] = useState(false);
  const [ready, setReady] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mount only when visible in viewport; unmount when offscreen to avoid context contention
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        const t = setTimeout(() => setShowCanvas(true), deviceInfo.isMobile ? 150 : 250);
        return () => clearTimeout(t);
      } else {
        setShowCanvas(false);
        setReady(false);
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [deviceInfo.isMobile]);

  // Global mobile 3D lock while Skills 3D is visible
  useEffect(() => {
    if (!deviceInfo.isMobile) return;
    if (!showCanvas) return;
    (window as any).__MOBILE_3D_LOCK = 'skills';
    window.dispatchEvent(new CustomEvent('mobile3d:lock', { detail: 'skills' }));
    return () => {
      if ((window as any).__MOBILE_3D_LOCK === 'skills') {
        delete (window as any).__MOBILE_3D_LOCK;
        window.dispatchEvent(new CustomEvent('mobile3d:unlock', { detail: 'skills' }));
      }
    };
  }, [showCanvas, deviceInfo.isMobile]);

  const skills = [
    { name: 'Java',        color: '#F89820', level: 90 },   // Oracle Java Orange
    { name: 'Spring Boot', color: '#6DB33F', level: 85 },   // Spring Green
    { name: 'DSA',         color: '#8B5CF6', level: 88 },   // Violet (algorithms)
    { name: 'HTML',        color: '#E34F26', level: 92 },   // HTML5 Orange
    { name: 'CSS',         color: '#1572B6', level: 88 },   // CSS3 Blue
    { name: 'MySQL',       color: '#00758F', level: 84 },   // MySQL Teal
    { name: 'PostgreSQL',  color: '#336791', level: 80 },   // PostgreSQL Blue
    { name: 'Postman',     color: '#FF6C37', level: 78 },   // Postman Orange
  ];

  // Fallback for low-end devices or no WebGL support
  if (!performanceConfig.enable3D || webGLError) {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white p-8">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-lg mb-2">Interactive Skills View</p>
            <p className="text-sm text-gray-300 mb-6">3D visualization not available on this device</p>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: skill.color }}
                  >
                    {skill.name.charAt(0)}
                  </div>
                  <p className="text-xs">{skill.name}</p>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div 
                      className="h-1 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${skill.level}%`, 
                        backgroundColor: skill.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 pointer-events-none select-none">
      {!showCanvas && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
        </div>
      )}
      {showCanvas && (
      <Canvas 
        camera={{ 
          position: [0, 0, deviceInfo.isMobile ? 12 : 15], 
          fov: deviceInfo.isMobile ? 60 : 50 
        }}
        gl={{ 
          antialias: performanceConfig.antialias, 
          alpha: true,
          powerPreference: performanceConfig.powerPreference,
          preserveDrawingBuffer: false
        }}
        dpr={performanceConfig.dpr as [number, number]}
        onCreated={(state) => {
          setReady(true);
          const canvas = state.gl.domElement;
          const onLost = (e: Event) => {
            e.preventDefault();
            setReady(false);
            setShowCanvas(false);
            setTimeout(() => setShowCanvas(true), 400);
          };
          const onRestored = () => setReady(true);
          canvas.addEventListener('webglcontextlost', onLost as EventListener, { passive: false });
          canvas.addEventListener('webglcontextrestored', onRestored as EventListener);
        }}
        onError={(error) => {
          console.error('Three.js Canvas Error:', error);
          setWebGLError(true);
        }}
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <div className="text-2xl mb-4">⚠️</div>
              <p className="text-lg mb-2">3D View Unavailable</p>
              <p className="text-sm text-gray-300">WebGL context limit reached</p>
            </div>
          </div>
        }
        className={ready ? 'opacity-90 transition-opacity duration-700' : 'opacity-0'}
      >
        <ambientLight intensity={deviceInfo.isMobile ? 0.5 : 0.8} />
        <pointLight position={[20, 20, 20]} intensity={deviceInfo.isMobile ? 0.8 : 1.5} />
        <pointLight position={[-20, -20, -20]} intensity={deviceInfo.isMobile ? 0.5 : 1} color="#8b5cf6" />
        <pointLight position={[0, 0, 15]} intensity={deviceInfo.isMobile ? 0.4 : 0.8} color="#06b6d4" />
        <directionalLight position={[0, 10, 0]} intensity={deviceInfo.isMobile ? 0.3 : 0.5} />
        
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = deviceInfo.isMobile ? 3 : 4;
          const height = Math.sin(angle * 2) * (deviceInfo.isMobile ? 1 : 2);
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ];
          return (
            <SkillIcon
              key={skill.name}
              skill={skill}
              position={position}
              delay={index * 0.1}
            />
          );
        })}

        {/* Add subtle floating particles around each skill */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = deviceInfo.isMobile ? 3 : 4;
          const height = Math.sin(angle * 2) * (deviceInfo.isMobile ? 1 : 2);
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius,
          ];
          return <FloatingParticles key={`p-${skill.name}`} skill={skill} position={position} />;
        })}

        {/* Ground grid helper for spatial depth */}
        <gridHelper args={[40, 40, '#1f2937', '#111827']} position={[0, -3, 0]} rotation={[0, 0, 0]} />
        
        <OrbitControls
          enableZoom={!deviceInfo.isMobile}
          enablePan={false}
          autoRotate
          autoRotateSpeed={deviceInfo.isMobile ? 0.8 : 1.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          maxDistance={deviceInfo.isMobile ? 15 : 20}
          minDistance={deviceInfo.isMobile ? 6 : 8}
        />
      </Canvas>
      )}
      
      {/* Overlay with instructions - hidden on mobile */}
      {!deviceInfo.isMobile && (
        <div className="absolute top-4 left-4 glass backdrop-blur-xl rounded-lg px-3 py-2 text-white text-sm border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Drag to rotate • Scroll to zoom</span>
          </div>
        </div>
      )}
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: any; index: number }) => {
  return (
    <motion.div
      className="glass p-6 rounded-xl hover:shadow-glow-primary transition-all duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [view3D, setView3D] = useState(true);
  const [is3DLoading, setIs3DLoading] = useState(false);
  const [webGLError, setWebGLError] = useState(false);
  
  const skills = [
    {
      name: 'Java',
      level: 90,
      description: 'Object-oriented programming and Spring framework development',
      color: '#F89820'
    },
    {
      name: 'Spring Boot',
      level: 85,
      description: 'System programming and algorithm implementation',
      color: '#00599C'
    },
    {
      name: 'HTML & CSS',
      level: 80,
      description: 'HTML, CSS, JavaScript for frontend development',
      color: '#F7DF1E'
    },
    {
      name: 'DSA - Java',
      level: 78,
      color: '#8B5CF6'
    },
    {
      name: 'MySQL',
      level: 75,
      description: 'Building enterprise applications with Spring ecosystem',
      color: '#6DB33F'
    },
    {
      name: 'Methodology - SDLC',
      level: 70,
      color: '#47A248'
    },
    {
      name: 'C Programming',
      level: 65,
      description: 'C programming for system programming',
      color: '#3DDC84'
    },
    {
      name: 'PostgreSQL',
      level: 70,
      color: '#336791'
    },
    {
      name: 'Postman',
      level: 65,
      color: '#FF6C37'
    },
  ];

  return (
    <section id="skills" className="relative min-h-screen py-20">
      <ParticleBackground id="skillsParticles" config="default" />
      
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">Skills & Expertise</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Core technical competencies
          </p>
          
          <div className="flex justify-center space-x-3 sm:space-x-4 px-4">
            <button
              onClick={() => {
                setView3D(true);
                setIs3DLoading(false);
              }}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                view3D ? 'bg-primary text-primary-foreground shadow-glow-primary' : 'glass text-foreground hover:bg-white/10'
              }`}
            >
              3D View
            </button>
            <button
              onClick={() => {
                setView3D(false);
                setIs3DLoading(false);
              }}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                !view3D ? 'bg-primary text-primary-foreground shadow-glow-primary' : 'glass text-foreground hover:bg-white/10'
              }`}
            >
              Grid View
            </button>
          </div>
        </motion.div>

        {view3D ? (
          <motion.div
            className="h-[400px] sm:h-[500px] w-full max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            viewport={{ amount: 0.25 }}
          >
            {webGLError ? (
              <div className="h-full w-full glass rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-xl">
                <div className="text-center text-white p-4">
                  <div className="text-3xl sm:text-4xl mb-4">🎨</div>
                  <p className="text-base sm:text-lg mb-2">3D View Temporarily Unavailable</p>
                  <p className="text-xs sm:text-sm text-gray-300 mb-4">Too many 3D elements active</p>
                  <button
                    onClick={() => setView3D(false)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors text-sm"
                  >
                    Switch to Grid View
                  </button>
                </div>
              </div>
            ) : (
              <Skills3D />
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;