import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import { useState, useRef } from 'react';
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
      {Array.from({ length: 8 }).map((_, i) => {
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

const SkillIcon = ({ skill, position, delay }: { skill: any; position: [number, number, number]; delay: number }) => {
  return (
    <Float
      speed={1.5 + Math.random()}
      rotationIntensity={1}
      floatIntensity={0.8}
      floatingRange={[0, 0.5]}
    >
      {/* Main 3D shape */}
      <mesh position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={skill.color}
          roughness={0.1}
          metalness={0.9}
          emissive={skill.color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Skill name text */}
      <Text
        position={[position[0], position[1] + 2.5, position[2]]}
        fontSize={1}
        color={skill.color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.1}
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

  const skills = [
    { name: 'React', color: '#61DAFB', level: 95 },
    { name: 'Node.js', color: '#339933', level: 90 },
    { name: 'TypeScript', color: '#3178C6', level: 88 },
    { name: 'Python', color: '#3776AB', level: 85 },
    { name: 'MongoDB', color: '#47A248', level: 82 },
    { name: 'AWS', color: '#FF9900', level: 80 },
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
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{skill.name}</h3>
        <span className="text-sm text-primary font-medium">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <motion.div
          className="bg-gradient-hero h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          viewport={{ once: true }}
        />
      </div>
      
      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {skill.description}
      </p>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [view3D, setView3D] = useState(true);
  const [is3DLoading, setIs3DLoading] = useState(false);
  const [webGLError, setWebGLError] = useState(false);
  
  const skills = [
    {
      name: 'React & Next.js',
      level: 95,
      description: 'Building modern, scalable web applications with React ecosystem',
      color: '#61DAFB'
    },
    {
      name: 'Node.js & Express',
      level: 90,
      description: 'Developing robust backend APIs and server-side applications',
      color: '#339933'
    },
    {
      name: 'TypeScript',
      level: 88,
      description: 'Type-safe development for better code quality and maintainability',
      color: '#3178C6'
    },
    {
      name: 'Python & Django',
      level: 85,
      description: 'Backend development and data processing with Python',
      color: '#3776AB'
    },
    {
      name: 'Database Design',
      level: 82,
      description: 'MongoDB, PostgreSQL, and database optimization',
      color: '#47A248'
    },
    {
      name: 'Cloud & DevOps',
      level: 80,
      description: 'AWS, Docker, CI/CD pipelines and deployment strategies',
      color: '#FF9900'
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
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">Skills & Expertise</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Technologies and tools I work with to bring ideas to life
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
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
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