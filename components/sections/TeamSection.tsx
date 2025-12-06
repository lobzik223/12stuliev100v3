'use client';

import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundImage from '../ui/BackgroundImage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamSection() {
  const commandSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commandSectionRef.current) {
      const commandCards = commandSectionRef.current.querySelectorAll('[data-animate="command"]');
      
      commandCards.forEach((el, index) => {
        gsap.set(el, {
          opacity: 0,
          y: 80,
          scale: 0.9
        });
        
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.05
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={commandSectionRef}
      className="relative w-full"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-4.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vh, 6rem) 4%'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        <p 
          className="text-center mb-10 uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          Команда
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex justify-center" data-animate="command">
              <BackgroundImage
                imagePath="/backgrounds/sections/command.png"
                style={{ 
                  width: '100%',
                  maxWidth: 'clamp(26.25rem, 32vw, 38.75rem)',
                  aspectRatio: 'auto'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

