// Interactive Portfolio Website with 3D Elements, Particles, and Smooth Animations

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MyJourneySection from '@/components/MyJourneySection';
import SkillsSection from '@/components/SkillsSection';
import CodingProfilesSection from '@/components/CodingProfilesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="relative">
      <ThemeToggle />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MyJourneySection />
      <SkillsSection />
      <CodingProfilesSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Background Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none -z-20" />
    </div>
  );
};

export default Index;
