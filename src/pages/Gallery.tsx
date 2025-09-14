import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import { useDeviceDetection, getPerformanceConfig } from '@/hooks/useDeviceDetection';

const Photo = ({ url, position }: { url: string; position: [number, number, number] }) => {
  return (
    <Float rotationIntensity={0.4} floatIntensity={0.6} speed={1.2}>
      <mesh position={position}>
        <planeGeometry args={[2.2, 1.4, 1, 1]} />
        <meshBasicMaterial map={undefined} color={'#ffffff'} />
      </mesh>
    </Float>
  );
};

const Gallery3D = ({ photos }: { photos: string[] }) => {
  const device = useDeviceDetection();
  const perf = getPerformanceConfig(device);

  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    const radius = device.isMobile ? 5 : 7;
    const rows = device.isMobile ? 2 : 3;
    const perRow = Math.ceil(photos.length / rows);
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < perRow && idx < photos.length; c++, idx++) {
        arr.push([c * 2.6 - perRow, r * -2.2 + 2.2, Math.sin((idx / photos.length) * Math.PI * 2) * 0.5]);
      }
    }
    return arr;
  }, [photos, device.isMobile]);

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] rounded-2xl overflow-hidden border border-white/10">
      <Canvas
        camera={{ position: [0, 0, device.isMobile ? 10 : 12], fov: device.isMobile ? 60 : 50 }}
        dpr={perf.dpr as [number, number]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        {photos.map((p, i) => (
          <Photo key={i} url={p} position={positions[i] || [0, 0, 0]} />
        ))}
        <OrbitControls enablePan={false} enableZoom={!device.isMobile} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

const Gallery = () => {
  const [techPhotos] = useState<string[]>([
    '/encryption.jpeg',
    '/brainimage.jpeg',
    '/cowrie.png',
  ]);
  const [nonTechPhotos] = useState<string[]>([
    '/balaji_image.jpg', // replace with karate and other non-technical photos as you add them
  ]);
  const device = useDeviceDetection();

  const Grid = ({ photos }: { photos: string[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {photos.map((p, i) => (
        <img key={i} src={p} alt={`gallery-${i}`} className="w-full aspect-[4/3] object-cover rounded-xl glass border" />
      ))}
    </div>
  );

  return (
    <section id="gallery" className="relative min-h-screen py-20">
      <ParticleBackground id="galleryParticles" config="default" />
      <div className="container mx-auto px-4 sm:px-6 z-10 space-y-16">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Gallery</h2>
          <p className="text-lg text-gray-700 dark:text-muted-foreground">Moments & milestones</p>
        </div>

        {/* Technical Photos */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">Technical Photos</h3>
          {device.isLowEnd ? <Grid photos={techPhotos} /> : <Gallery3D photos={techPhotos} />}
        </div>

        {/* Non-Technical Photos */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">Non-Technical Photos</h3>
          {device.isLowEnd ? <Grid photos={nonTechPhotos} /> : <Gallery3D photos={nonTechPhotos} />}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
