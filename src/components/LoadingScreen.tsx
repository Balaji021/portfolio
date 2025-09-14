import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [progress, setProgress] = useState(0);
  const deviceInfo = useDeviceDetection();

  const loadingMessages = useMemo(() => [
    'Initializing...',
    'Loading assets...',
    'Preparing...',
    'Almost ready...'
  ], []);

  // Reduce animation complexity for mobile/low-end devices
  const isLowEnd = deviceInfo.isLowEnd || deviceInfo.isMobile;

  useEffect(() => {
    if (!isLoading) return;

    // Reset progress when loading starts
    setProgress(0);

    // Slower message updates for better performance
    const messageInterval = setInterval(() => {
      setLoadingMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1100);

    // Less frequent progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 96) {
          return Math.min(prev + (Math.random() * 0.5 + 0.2), 100);
        } else if (prev >= 85) {
          return prev + (Math.random() * 0.8 + 0.3);
        } else if (prev >= 60) {
          return prev + (Math.random() * 1.2 + 0.6);
        } else {
          return prev + (Math.random() * 1.8 + 1.0);
        }
      });
    }, isLowEnd ? 180 : 110);

    // Ensure we reach 100% after a certain time
    const completionTimer = setTimeout(() => {
      setProgress(100);
    }, 3800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
    };
  }, [isLoading, loadingMessages, isLowEnd]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center loading-optimized"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Simplified Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_70%)]" />
          </div>

          <div className="text-center relative z-10">
            {/* Simplified Logo Container */}
            <motion.div
              className="relative mb-8 sm:mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              {/* Single Ring for better performance */}
              {!isLowEnd && (
                <motion.div
                  className="absolute inset-0 w-24 h-24 mx-auto border-2 border-primary/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              )}

              {/* Main Logo (Monogram) */}
              <motion.div
                className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotate: isLowEnd ? 0 : 360,
                  boxShadow: isLowEnd ? "0 0 20px rgba(120, 119, 198, 0.5)" : [
                    "0 0 20px rgba(120, 119, 198, 0.5)",
                    "0 0 30px rgba(120, 119, 198, 0.7)",
                    "0 0 20px rgba(120, 119, 198, 0.5)"
                  ]
                }}
                transition={{ 
                  rotate: isLowEnd ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "linear" },
                  boxShadow: isLowEnd ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.div
                  className="text-3xl sm:text-4xl font-extrabold text-black/80 dark:text-white"
                  animate={isLowEnd ? {} : { 
                    y: [0, -4, 0]
                  }}
                  transition={isLowEnd ? {} : { 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  B
                </motion.div>
              </motion.div>

              {/* Reduced floating particles for better performance */}
              {!isLowEnd && Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-primary rounded-full loading-particle"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    x: [0, Math.cos(i * 90 * Math.PI / 180) * 40],
                    y: [0, Math.sin(i * 90 * Math.PI / 180) * 40],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                Balaji S
              </motion.h1>
              <motion.p
                className="text-sm sm:text-base text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                Crafting warm, immersive web experiences
              </motion.p>
              
              <motion.h2
                className="text-base sm:text-lg text-gray-300 mb-4"
                animate={isLowEnd ? {} : { 
                  opacity: [0.6, 1, 0.6]
                }}
                transition={isLowEnd ? {} : { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {loadingMessage}
              </motion.h2>
              
              {/* Simplified animated dots */}
              <motion.div className="flex justify-center space-x-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                    animate={isLowEnd ? {} : {
                      y: [0, -10, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={isLowEnd ? {} : {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Simplified Progress Bar */}
            <motion.div
              className="mt-8 sm:mt-12 w-64 sm:w-80 mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <div className="w-full h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {!isLowEnd && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  )}
                </motion.div>
              </div>
              <motion.div
                className="mt-2 text-xs sm:text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>
          </div>

          {/* Reduced Background Elements for better performance */}
          {!isLowEnd && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full loading-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -150, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 50, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
