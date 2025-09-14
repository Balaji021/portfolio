import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';
import TransparentParticleBackground from './TransparentParticleBackground';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const HeroSection = () => {
  const deviceInfo = useDeviceDetection();
  
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
      <ParticleBackground id="heroParticles" config="hero" />
      
      {/* 3D Floating Shapes - Responsive positioning */}
      {!deviceInfo.isMobile && (
        <>
          <div className="absolute top-20 right-20 w-32 h-32 opacity-60">
            <FloatingShape />
          </div>
          <div className="absolute bottom-20 left-20 w-24 h-24 opacity-40">
            <FloatingShape />
          </div>
        </>
      )}
      
      {/* Mobile-optimized floating shapes */}
      {deviceInfo.isMobile && (
        <div className="absolute top-10 right-10 w-16 h-16 opacity-40">
          <FloatingShape />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold mb-3 sm:mb-4 gradient-text leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Balaji S
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Software Developer
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Curious about how technology can solve real-world challenges in smarter ways. Familiar with Java, C, and full-stack development, and enjoy applying them to meaningful solutions. I value practical learning, teamwork, and constantly improving my skills.
            </motion.p>
          </motion.div>

          {/* Animated Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button variant="hero" size="lg" onClick={scrollToNext}>
              <ArrowDown className="mr-2" />
              View My Work
            </Button>
            <Button variant="neon" size="lg" asChild>
              <a href="Balaji_Resume.pdf" download>
                <Download className="mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Inspirational Quote */}
          <motion.div
            className="mx-4 sm:mx-auto max-w-2xl bg-gradient-to-r from-amber-50/60 to-transparent dark:from-amber-100/5 dark:to-transparent rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-amber-100/50 dark:border-amber-200/10 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
          >
            <p className="text-center italic text-base sm:text-lg md:text-xl text-foreground/90 mb-1">
              "When you become serious about your goals, not everyone will stay with you."
            </p>
            <p className="text-center text-sm sm:text-base md:text-lg font-semibold text-amber-600 dark:text-amber-400">
              That's why a bus has 50 seats, but a Lambo has only 2.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;