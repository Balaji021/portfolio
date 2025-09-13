import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  devicePixelRatio: number;
  screenWidth: number;
  screenHeight: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEnd: false,
    supportsWebGL: true,
    devicePixelRatio: 1,
    screenWidth: 1920,
    screenHeight: 1080,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      // Device type detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Low-end device detection based on various factors
      const isLowEnd = 
        isMobile || 
        dpr > 2 || 
        navigator.hardwareConcurrency < 4 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // WebGL support detection
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const supportsWebGL = !!gl;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowEnd,
        supportsWebGL,
        devicePixelRatio: dpr,
        screenWidth: width,
        screenHeight: height,
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    
    return () => window.removeEventListener('resize', updateDeviceInfo);
  }, []);

  return deviceInfo;
};

export const getPerformanceConfig = (deviceInfo: DeviceInfo) => {
  if (deviceInfo.isLowEnd || !deviceInfo.supportsWebGL) {
    return {
      enable3D: false,
      particleCount: 0,
      quality: 'low',
      dpr: [0.5, 1],
      antialias: false,
      powerPreference: 'low-power' as const,
    };
  }
  
  if (deviceInfo.isMobile) {
    return {
      enable3D: true,
      particleCount: 100,
      quality: 'medium',
      dpr: [0.5, 1.5],
      antialias: false,
      powerPreference: 'low-power' as const,
    };
  }
  
  if (deviceInfo.isTablet) {
    return {
      enable3D: true,
      particleCount: 300,
      quality: 'medium',
      dpr: [0.5, 2],
      antialias: true,
      powerPreference: 'high-performance' as const,
    };
  }
  
  // Desktop
  return {
    enable3D: true,
    particleCount: 500,
    quality: 'high',
    dpr: [1, 2],
    antialias: true,
    powerPreference: 'high-performance' as const,
  };
};
