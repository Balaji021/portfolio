import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

const applyTheme = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

type Props = { inline?: boolean };

const ThemeToggle = ({ inline = false }: Props) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keep in sync with system changes if user hasn't explicitly chosen
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return; // user preference takes precedence
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      const next = e.matches ? 'dark' : 'light';
      setTheme(next);
      applyTheme(next);
    };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const base = "inline-flex items-center justify-center rounded-full transition-colors";
  const fixedPos = "fixed top-4 right-16 md:right-4 z-[60] pointer-events-auto w-10 h-10 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20 dark:bg-black/20 bg-white/60 text-foreground hover:bg-white/70 dark:hover:bg-white/10";
  const inlinePos = "w-9 h-9 border border-white/10 backdrop-blur-xl bg-black/15 dark:bg-black/20 text-foreground hover:bg-white/10";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className={`${base} ${inline ? inlinePos : fixedPos}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
