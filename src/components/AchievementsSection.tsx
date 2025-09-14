import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Award, Medal, Camera } from 'lucide-react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { useNavigate } from 'react-router-dom';
import FloatingShape from './FloatingShape';

const techAchievements = [
  { title: 'Paper Presentation', subtitle: 'Smart Parking System using Greedy Algorithm', icon: Award },
  { title: 'Open Source Contribution', subtitle: 'Contibuted Dataset to the public Repository', icon: Medal },
  { title: 'Academic Rank', subtitle: 'Rank 5 in B.Tech program', icon: Trophy },
];

const nonTechAchievements = [
  { title: 'Karate', subtitle: 'National and State Level Champion', icon: Trophy },
  { title: 'Other Achievements', subtitle: 'Multiple Certifications and Awards from schooling and extracurricular activities ', icon: Award },
];

const ListCard = ({ title, subtitle, Icon }: { title: string; subtitle: string; Icon: any }) => {
  return (
    <motion.div
      className="group relative glass p-4 sm:p-5 rounded-xl hover:shadow-glow-primary transition-all duration-300 [perspective:800px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      onMouseMove={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -10; // tilt up/down
        const ry = (px - 0.5) * 10;  // tilt left/right
        card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.setProperty('--rx', `0deg`);
        card.style.setProperty('--ry', `0deg`);
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative will-change-transform"
        style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transformStyle: 'preserve-3d', transition: 'transform 200ms ease' }}
      >
        <div className="flex items-start space-x-3" style={{ transform: 'translateZ(16px)' }}>
          <div className="p-2 rounded-lg bg-white/10 text-primary shadow" style={{ transform: 'translateZ(14px)' }}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-foreground">{title}</div>
            <div className="text-sm text-gray-700 dark:text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(18px)' }}>
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
        </div>
      </div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const device = useDeviceDetection();
  const navigate = useNavigate();
  return (
    <section id="achievements" className="relative py-20">
      <ParticleBackground id="achievementsParticles" config="default" />
      {/* Subtle floating accents */}
      <div className="absolute top-24 right-16 w-16 h-16 opacity-25 pointer-events-none"><FloatingShape /></div>
      <div className="absolute bottom-24 left-12 w-14 h-14 opacity-20 pointer-events-none"><FloatingShape /></div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Achievements</h2>
          <p className="text-lg text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto px-4">
            A snapshot of my technical and non-technical milestones
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="glass p-5 sm:p-6">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mb-4">Technical</h3>
              <div className="grid gap-3">
                {techAchievements.map((a) => (
                  <ListCard key={a.title} title={a.title} subtitle={a.subtitle} Icon={a.icon} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass p-5 sm:p-6">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mb-4">Non-Technical</h3>
              <div className="grid gap-3">
                {nonTechAchievements.map((a) => (
                  <ListCard key={a.title} title={a.title} subtitle={a.subtitle} Icon={a.icon} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/gallery')}
            className="glass border px-5 py-2.5 rounded-full hover:shadow-glow-primary transition-colors inline-flex items-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Open Gallery</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
