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
          {/* Aspect ratio wrapper for consistent thumbnails */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            {project.image ? (
              <img
                src={project.image.startsWith('http') || project.image.startsWith('/') ? project.image : `/${project.image}`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl';
                  fallback.innerHTML = '🚀';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl">🚀</div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Floating Action Button (GitHub only) */}
          <motion.div
            className="absolute top-4 right-4 flex"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="icon"
              variant="glass"
              className="w-8 h-8"
              aria-label="Open GitHub repository"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github size={16} />
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
          
          <div className="flex">
            <Button
              variant="neon"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
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
      title: "Course Registration System-Spring Boot",
      description: "Developed a simple and efficient Course Registration System that allows students to view available courses, check enrolled students, and register for courses seamlessly. The system leverages Spring Boot for backend services, connects to a MySQL database for data management, and provides a user-friendly frontend interface. Demonstrates CRUD operations, RESTful APIs, and basic authentication functionality.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop",
      tech: ["Java", "Spring", "Spring Boot", "MySQL", "Postman"],
      github: "https://github.com/Balaji021/Course-Registration-System",
      live: "https://example.com",
      featured: true
    },
    {
      id: 2,
      title: "File Encryption & Decryption using ECC with QKD",
      description: "Created a secure multi-layered authentication system using Quantum Key Distribution (QKD), facial recognition, and passwords for medical data. ECC + QKD enables quantum key exchange and encryption. At 35–40% CPU usage, a 10 MB file was encrypted in 3.2 seconds, ensuring high efficiency and compliance with healthcare regulations.",
      image: "encryption.jpeg",
      tech: ["React", "Node.js", "Firebase", "OpenCV", "ECC", "QKD"],
      github: "https://github.com/Balaji021/ecc_project",
      live: "https://example.com",
      featured: true
    },
    {
      id: 3,
      title: "Brain Tumor Classification - Machine Learning",
      description: "Developed an ensemble learning model combining VGG-16 and EfficientNet-B0 for brain tumor classification. Applied data augmentation to improve accuracy, achieving 93% accuracy, making it suitable for medical diagnostics research.",
      image: "brainimage.jpeg",
      tech: ["Python", "VGG-16", "EfficientNet-B0"],
      github: "https://github.com/Balaji021/brain-tumor-classification",
      live: "https://example.com",
      featured: false
    },
    {
      id: 4,
      title: "Cowrie Shell Dataset Creation for Classification Tasks - Multimodal classification",
      description: "Created a novel cowrie shell image dataset for classification tasks. Data augmentation was applied to enhance the dataset diversity, supporting research in machine learning classification tasks.",
      image: "cowrie.png",
      tech: ["Python", "Jupyter Notebook", "Camera"],
      github: "https://www.kaggle.com/datasets/oswaldc/cowrie-shells-toss-dataset-image-classification",
      live: "https://www.kaggle.com/datasets/oswaldc/cowrie-shells-toss-dataset-image-classification",
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4 sm:mb-6">My Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              A glimpse into my projects and the ideas behind them
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
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;