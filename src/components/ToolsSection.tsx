import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';
import { Code, GitBranch, Braces, Smartphone, BookOpen, Cloud, Rocket } from 'lucide-react';

const tools = [
  { name: 'Eclipse (Java Eclipse)', icon: Braces, color: '#2C3E50', url: 'https://www.eclipse.org/ide/' },
  { name: 'Visual Studio Code', icon: Code, color: '#007ACC', url: 'https://code.visualstudio.com/' },
  { name: 'Git', icon: GitBranch, color: '#F34F29', url: 'https://git-scm.com/' },
  { name: 'IntelliJ IDEA', icon: Rocket, color: '#000000', url: 'https://www.jetbrains.com/idea/' },
  { name: 'Android Studio', icon: Smartphone, color: '#3DDC84', url: 'https://developer.android.com/studio' },
  { name: 'Notion', icon: BookOpen, color: '#000000', url: 'https://www.notion.so/' },
  { name: 'Netlify', icon: Cloud, color: '#00AD9F', url: 'https://www.netlify.com/' },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="relative py-20">
      <ParticleBackground id="toolsParticles" config="minimal" />

      {/* Subtle 3D shapes */}
      <div className="absolute top-14 left-10 w-16 h-16 opacity-25"><FloatingShape /></div>
      <div className="absolute bottom-16 right-12 w-20 h-20 opacity-20"><FloatingShape /></div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4 sm:mb-6">Tools I Use</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ amount: 0.15 }}
              >
                <Card className="glass p-5 sm:p-6 hover:shadow-glow-primary transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white/10" style={{ color: tool.color }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-medium text-sm sm:text-base truncate">{tool.name}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
