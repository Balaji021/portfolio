import { useState, useEffect } from 'react';

export const useLoading = (minLoadingTime: number = 3000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Reset progress when loading starts
    setLoadingProgress(0);

    // Simulate loading progress with better timing
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // More consistent progress increments
        return Math.min(prev + Math.random() * 8 + 3, 100);
      });
    }, 120);

    // Minimum loading time
    const minTimeTimer = setTimeout(() => {
      setLoadingProgress(100);
      // Small delay to show 100% before hiding
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, minLoadingTime);

    // Check if all critical resources are loaded
    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        // Ensure we show 100% before hiding
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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
  }, [minLoadingTime]);

  return { isLoading, loadingProgress };
};
