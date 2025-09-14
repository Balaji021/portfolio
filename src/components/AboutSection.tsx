import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen py-20 flex items-center">
      <ParticleBackground id="aboutParticles" config="minimal" />
      
      {/* 3D Floating Shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 opacity-30">
        <FloatingShape />
      </div>
      <div className="absolute bottom-20 left-20 w-20 h-20 opacity-20">
        <FloatingShape />
      </div>
      <div className="absolute top-1/2 right-10 w-16 h-16 opacity-25">
        <FloatingShape />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">About Me</h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-muted-foreground max-w-3xl mx-auto px-4">
            Passionate developer with a love for creating innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="relative order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-hero rounded-full opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden glass border-4 border-primary/30 hover:border-primary/60 transition-all duration-300">
                <img
                  src="/balaji_image.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl sm:text-6xl';
                    fallback.innerHTML = '👨‍💻';
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              <div className="absolute -inset-2 bg-gradient-hero rounded-full opacity-30 blur-xl -z-10 animate-glow-pulse" />
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            className="space-y-6 order-2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-6 sm:p-8 hover:shadow-glow-primary transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-primary">Hello! I'm Balaji</h3>
                <p className="text-base sm:text-lg text-gray-700 dark:text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer currently pursuing my Bachelor of Technology 
                  in Information Technology at Dr. N.G.P. Institute of Technology. I love working 
                  with Java, C, and web technologies to create innovative solutions and solve real-world problems.
                </p>
                <p className="text-base sm:text-lg text-gray-700 dark:text-muted-foreground leading-relaxed">
                  With strong problem-solving skills and a commitment to continuous learning, I aim to 
                  contribute positively to forward-thinking organizations through dedication, creativity, 
                  and a proactive mindset.
                </p>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                className="glass p-4 sm:p-6 text-center rounded-lg hover:shadow-glow-secondary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">8.59</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">CGPA (6th Sem)</div>
              </motion.div>
              <motion.div
                className="glass p-4 sm:p-6 text-center rounded-lg hover:shadow-glow-accent transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">2022</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">Graduation Year</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;