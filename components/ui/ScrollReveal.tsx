'use client';

import { useState, useEffect } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    // Mobile-only: не прячем контент (на iOS/Android IntersectionObserver иногда не срабатывает на реальных устройствах).
    // Важно: это выполняется только после гидрации (useEffect), поэтому hydration mismatch не возникает.
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasBeenVisible) {
              setTimeout(() => {
                setIsVisible(true);
                setHasBeenVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
          } else {
            if (!hasBeenVisible) {
              setIsVisible(false);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, delay, hasBeenVisible]);

  return (
    <div
      ref={setRef}
      className={className}
      data-scroll-reveal="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(9.375rem) scale(0.9)',
        filter: isVisible ? 'blur(0)' : 'blur(0.625rem)',
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
}

