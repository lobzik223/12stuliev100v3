'use client';

import { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Swiper with no SSR
const Swiper = dynamic(
  () => import('swiper/react').then(mod => mod.Swiper),
  { ssr: false, loading: () => <div style={{ minHeight: '400px' }}>Loading...</div> }
);

const SwiperSlide = dynamic(
  () => import('swiper/react').then(mod => mod.SwiperSlide),
  { ssr: false }
);

interface SafeSwiperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  [key: string]: any; // Allow all Swiper props
}

/**
 * SafeSwiper - Wrapper around Swiper that ensures:
 * 1. Client-side only rendering
 * 2. Proper loading state
 * 3. Error boundary protection
 * 4. Mobile-safe initialization
 */
export default function SafeSwiper({ children, fallback, className, ...swiperProps }: SafeSwiperProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Ensure we're fully client-side
    if (typeof window !== 'undefined' && document.readyState === 'complete') {
      setIsClient(true);
    } else {
      const handleLoad = () => setIsClient(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Error boundary
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Swiper') || event.message.includes('swiper')) {
        console.error('Swiper error caught:', event.error);
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Show fallback during SSR or if error occurred
  if (!isClient || hasError) {
    return fallback || (
      <div className={className} style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {hasError ? '⚠️ Carousel temporarily unavailable' : 'Loading carousel...'}
      </div>
    );
  }

  try {
    return (
      <Swiper className={className} {...swiperProps}>
        {children}
      </Swiper>
    );
  } catch (error) {
    console.error('Swiper render error:', error);
    return fallback || <div>Carousel unavailable</div>;
  }
}

// Export SwiperSlide as well for convenience
export { SwiperSlide };
