import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Mail } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';
import TransparentParticleBackground from './TransparentParticleBackground';

const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground id="heroParticles" config="hero" />
      
      {/* 3D Floating Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-60">
        <FloatingShape />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-40">
        <FloatingShape />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              John Doe
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Full Stack Developer
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Crafting beautiful, interactive web experiences with modern technologies
            </motion.p>
          </motion.div>

          {/* Animated Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button variant="hero" size="lg" className="group">
              <Mail className="mr-2 group-hover:animate-pulse" />
              Hire Me
            </Button>
            <Button variant="neon" size="lg" className="group">
              <Download className="mr-2 group-hover:animate-bounce" />
              View Projects
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <button
              onClick={scrollToNext}
              className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="group-hover:shadow-glow-primary rounded-full p-2"
              >
                <ArrowDown size={24} />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;