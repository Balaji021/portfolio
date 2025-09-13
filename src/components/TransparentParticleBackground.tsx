import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TransparentParticles from './TransparentParticles';
import AdvancedTransparentParticles from './AdvancedTransparentParticles';

interface TransparentParticleBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  type?: 'points' | 'shapes' | 'mixed';
  color?: string;
  opacity?: number;
  speed?: number;
}

const TransparentParticleBackground = ({
  intensity = 'medium',
  type = 'points',
  color = '#7877C6',
  opacity = 0.3,
  speed = 0.5
}: TransparentParticleBackgroundProps) => {
  const getParticleConfig = () => {
    switch (intensity) {
      case 'low':
        return { count: 200, size: 0.3, speed: speed * 0.5 };
      case 'medium':
        return { count: 500, size: 0.5, speed: speed };
      case 'high':
        return { count: 1000, size: 0.8, speed: speed * 1.5 };
      default:
        return { count: 500, size: 0.5, speed: speed };
    }
  };

  const config = getParticleConfig();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ 
          antialias: false, 
          alpha: true, 
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
          dpr: [0.5, 1]
        }}
        onError={(error) => console.log('Canvas error:', error)}
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <div className="text-4xl opacity-30">✨</div>
          </div>
        }
      >
        <Suspense fallback={null}>
          {/* Ambient lighting for subtle illumination */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.3} />
          
          {/* Main particle system */}
          {type === 'points' && (
            <TransparentParticles
              count={config.count}
              speed={config.speed}
              size={config.size}
              color={color}
              opacity={opacity}
            />
          )}
          
          {type === 'shapes' && (
            <AdvancedTransparentParticles
              count={Math.floor(config.count / 2)}
              speed={config.speed}
              size={config.size}
              opacity={opacity}
              type="mixed"
            />
          )}
          
          {type === 'mixed' && (
            <>
              <TransparentParticles
                count={Math.floor(config.count * 0.7)}
                speed={config.speed}
                size={config.size * 0.8}
                color={color}
                opacity={opacity * 0.8}
              />
              <AdvancedTransparentParticles
                count={Math.floor(config.count * 0.3)}
                speed={config.speed * 1.2}
                size={config.size * 1.2}
                opacity={opacity * 1.2}
                type="mixed"
              />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TransparentParticleBackground;
