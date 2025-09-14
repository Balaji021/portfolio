import { useState, useEffect, useCallback } from 'react';

export const useLoading = (minLoadingTime: number = 2500) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const finishLoading = useCallback(() => {
    setLoadingProgress(100);
    // Shorter delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    // Reset progress when loading starts
    setLoadingProgress(0);

    // More efficient progress simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smoother progress increments
        const increment = prev < 30 ? 4 + Math.random() * 3 : 
                         prev < 70 ? 2 + Math.random() * 2 : 
                         1 + Math.random() * 1;
        return Math.min(prev + increment, 100);
      });
    }, 100); // Slightly faster updates for smoother progress

    // Minimum loading time
    const minTimeTimer = setTimeout(() => {
      finishLoading();
    }, minLoadingTime);

    // Check if all critical resources are loaded
    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        finishLoading();
      }
    };

    // Listen for page load events
    window.addEventListener('load', checkResourcesLoaded);
    document.addEventListener('DOMContentLoaded', checkResourcesLoaded);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimer);
      window.removeEventListener('load', checkResourcesLoaded);
      document.removeEventListener('DOMContentLoaded', checkResourcesLoaded);
    };
  }, [minLoadingTime, finishLoading]);

  return { isLoading, loadingProgress };
};
