import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useState } from 'react';
import ParticleBackground from './ParticleBackground';
import FloatingShape from './FloatingShape';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="glass overflow-hidden h-full hover:shadow-glow-primary transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl';
              fallback.innerHTML = '🚀';
              target.parentNode?.appendChild(fallback);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating Action Buttons */}
          <motion.div
            className="absolute top-4 right-4 flex space-x-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button size="icon" variant="glass" className="w-8 h-8">
              <Github size={16} />
            </Button>
            <Button size="icon" variant="glass" className="w-8 h-8">
              <ExternalLink size={16} />
            </Button>
          </motion.div>

          {project.featured && (
            <div className="absolute top-4 left-4 bg-gradient-hero text-black px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full glass border border-primary/30 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="neon" size="sm" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              View Live
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      tech: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application with geolocation, forecasts, and interactive maps. Built with modern web technologies.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
      tech: ["Vue.js", "OpenWeather API", "Chart.js", "PWA"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description: "An intelligent chat interface powered by AI with natural language processing, context awareness, and custom responses.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      tech: ["React", "Python", "OpenAI API", "WebSocket"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "A stunning portfolio website with 3D animations, particle effects, and smooth transitions. Built with modern frameworks.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      tech: ["React", "Three.js", "Framer Motion", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      id: 6,
      title: "Data Visualization Tool",
      description: "Interactive data visualization platform with multiple chart types, real-time updates, and export capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tech: ["D3.js", "React", "Node.js", "Excel Export"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20">
      <ParticleBackground id="projectsParticles" config="default" />
      
      {/* 3D Floating Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <FloatingShape />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-25">
        <FloatingShape />
      </div>
      <div className="absolute top-1/2 left-10 w-20 h-20 opacity-15">
        <FloatingShape />
      </div>
      <div className="absolute bottom-1/4 right-10 w-28 h-28 opacity-30">
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">Featured Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Button variant="hero" size="lg" className="group">
            <Github className="mr-2 group-hover:animate-spin" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;