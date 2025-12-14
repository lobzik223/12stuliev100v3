'use client';

import { useState, useEffect } from "react";
import { isProbablyMobile } from "../utils/device";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  // ВАЖНО: по умолчанию (до гидрации) контент ДОЛЖЕН быть видимым,
  // иначе на iOS при сбое/лаг-рендере секции “навсегда” останутся скрытыми.
  const [isVisible, setIsVisible] = useState(true);
  const [hasBeenVisible, setHasBeenVisible] = useState(true);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref) return;

    // Mobile-only: не прячем контент (на iOS/Android IntersectionObserver иногда не срабатывает на реальных устройствах).
    // Важно: это выполняется только после гидрации (useEffect), поэтому hydration mismatch не возникает.
    if (typeof window !== 'undefined' && isProbablyMobile()) {
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    // Десктоп: если элемент не в зоне видимости — прячем после mount и ждём observer.
    // Если уже в зоне видимости — оставляем видимым (без мигания).
    try {
      const rect = ref.getBoundingClientRect();
      const inViewport = rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
      if (!inViewport) {
        setIsVisible(false);
        setHasBeenVisible(false);
      }
    } catch (e) {}

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
      className={[
        'scroll-reveal',
        className,
        // До mounted НЕ добавляем “hidden” класс — это и есть защита от “чёрного экрана” без JS.
        mounted ? (isVisible ? 'scroll-reveal--visible' : 'scroll-reveal--hidden') : '',
      ].filter(Boolean).join(' ')}
      data-scroll-reveal="true"
    >
      {children}
    </div>
  );
}

