import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  User,
  BookOpen,
  Code,
  Trophy,
  Briefcase,
  Mail,
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'journey', label: 'Journey', icon: BookOpen },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'coding-profiles', label: 'Coding', icon: Trophy },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      for (const item of navItems) {
        const sec = document.getElementById(item.id);
        if (sec) {
          const top = sec.offsetTop;
          const bottom = top + sec.offsetHeight;
          if (pos >= top && pos < bottom) {
            setActive(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="
          fixed w-full top-4 left-0 z-50
          hidden md:flex justify-center
          bg-transparent py-2 px-6
        "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-8">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="
                  relative flex items-center space-x-2
                  text-base font-medium text-gray-200 hover:text-white
                  transition-colors px-3 py-2
                "
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          {/* theme toggle moved to fixed top-right for desktop */}
        </div>
      </motion.nav>

      {/* Mobile Hamburger Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full p-2.5 md:hidden shadow-2xl text-white hover:bg-white/10 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Desktop fixed theme toggle (top-right) */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <ThemeToggle inline />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="absolute right-4 top-16 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 min-w-[260px] max-w-[calc(100vw-2rem)] shadow-2xl"
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-2">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActiveItem = active === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActiveItem
                          ? 'text-white bg-primary/30 shadow-lg shadow-primary/25 border border-primary/20'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
                {/* Mobile inline theme toggle removed to avoid duplication */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile floating theme toggle (bottom-right) */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <ThemeToggle inline />
      </div>
    </>
  );
}
