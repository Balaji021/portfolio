import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ParticleBackground from '@/components/ParticleBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background text-foreground overflow-hidden">
      <ParticleBackground id="notFoundParticles" config="subtle" />
      <div className="relative z-10 text-center px-6">
        <h1 className="mb-4 text-5xl font-extrabold gradient-text">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
