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
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">My Journey</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A brief timeline of milestones that shaped my path.
          </p>
        </motion.div>

        {/* Intro Paragraph */}
        <motion.div
          className="max-w-4xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ amount: 0.2 }}
        >
          <Card className="glass p-5 sm:p-7 leading-relaxed text-muted-foreground">
            <p className="mb-4">
              My journey in computer science began with a simple curiosity — how technology can solve real problems,
              reveal patterns, and build meaningful experiences. That curiosity quickly grew into a passion for
              engineering, driving me to explore data, programming, and the logic behind well‑structured systems.
            </p>
            <p className="mb-4">
              Through countless hours of coding and problem‑solving on platforms like LeetCode and HackerRank,
              I’ve built a strong foundation in algorithms, data structures, and clean code practices.
              I love designing efficient solutions that balance performance with clarity.
            </p>
            <p>
              Beyond coding, I enjoy exploring emerging technologies and experimenting with creative ideas.
              I’m eager to take on new challenges and keep growing through every experience.
            </p>
          </Card>
        </motion.div>

        {/* Education Timeline Only */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border/50 hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {/* College */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ amount: 0.2 }}
            >
              <div className="sm:text-right sm:pr-8">
                <span className="text-xs sm:text-sm text-muted-foreground">2022 – Present</span>
                <h3 className="text-xl sm:text-2xl font-semibold">B.Tech in Information Technology</h3>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Dr. N.G.P. Institute of Technology</div>
              </div>
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-primary transition-all duration-300">
                <div className="text-sm sm:text-base text-muted-foreground">
                  CGPA: <span className="font-semibold">8.59</span>
                </div>
              </Card>
            </motion.div>

            {/* 12th */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ amount: 0.2 }}
            >
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-secondary transition-all duration-300 order-2 sm:order-1">
                <div className="text-sm sm:text-base text-muted-foreground">
                  Percentage : <span className="font-semibold">88.3 % </span>
                </div>
              </Card>
              <div className="sm:pl-8 order-1 sm:order-2">
                <span className="text-xs sm:text-sm text-muted-foreground">2021 - 2022</span>
                <h3 className="text-xl sm:text-2xl font-semibold">Higher Secondary (12th)</h3>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">R.J. Matriculation Higher Secondary School</div>
              </div>
            </motion.div>

            {/* 10th */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-stretch"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ amount: 0.2 }}
            >
              <div className="sm:text-right sm:pr-8">
                <span className="text-xs sm:text-sm text-muted-foreground">2020 - 2021</span>
                <h3 className="text-xl sm:text-2xl font-semibold">Secondary (10th)</h3>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">R.J. Matriculation Higher Secondary School</div>
              </div>
              <Card className="glass p-5 sm:p-6 hover:shadow-glow-accent transition-all duration-300">
                <div className="text-sm sm:text-base text-muted-foreground">
                  Percentage : <span className="font-semibold">94.2 % </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyJourneySection;
