import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';
import { Card } from '@/components/ui/card';

const MyJourneySection = () => {
  return (
    <section id="journey" className="relative min-h-screen py-20 flex items-center">
      <ParticleBackground id="journeyParticles" config="minimal" />

      {/* 3D Floating Shapes */}
      <div className="absolute top-16 left-16 w-20 h-20 opacity-30">
        <FloatingShape />
      </div>
      <div className="absolute bottom-16 right-20 w-24 h-24 opacity-25">
        <FloatingShape />
      </div>
      <div className="absolute top-1/3 right-10 w-16 h-16 opacity-20">
        <FloatingShape />
      </div>
      <div className="absolute bottom-1/4 left-10 w-14 h-14 opacity-20">
        <FloatingShape />
      </div>
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-12 h-12 opacity-15">
        <FloatingShape />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">My Journey</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A brief timeline of milestones that shaped my path.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border/50 hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {/* Item 1 */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="sm:text-right sm:pr-8">
                <span className="text-xs sm:text-sm text-muted-foreground">2022 - Present</span>
                <h3 className="text-xl sm:text-2xl font-semibold">B.Tech in Information Technology</h3>
              </div>
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-primary transition-all duration-300">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Pursuing my degree at Dr. N.G.P. Institute of Technology, building strong fundamentals in programming,
                  data structures, web development, and computer science concepts.
                </p>
              </Card>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-secondary transition-all duration-300 order-2 sm:order-1">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Explored full‑stack development with JavaScript/TypeScript, React, and Node, and practiced problem‑solving
                  in Java and C through coding platforms.
                </p>
              </Card>
              <div className="sm:pl-8 order-1 sm:order-2">
                <span className="text-xs sm:text-sm text-muted-foreground">2023 - 2024</span>
                <h3 className="text-xl sm:text-2xl font-semibold">Full‑Stack Exploration</h3>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="sm:text-right sm:pr-8">
                <span className="text-xs sm:text-sm text-muted-foreground">2024 - Present</span>
                <h3 className="text-xl sm:text-2xl font-semibold">Projects & Collaboration</h3>
              </div>
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-accent transition-all duration-300">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Built real‑world projects, collaborated with peers, and focused on clean code, performance,
                  and user‑centric design.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyJourneySection;
