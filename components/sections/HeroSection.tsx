'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TypingText from '../ui/TypingText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onStartJourney?: () => void;
}

export default function HeroSection({ onStartJourney }: HeroSectionProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Анимация для логотипа
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Анимация для текста
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.1
        }
      );
    }

    // Анимация для кнопки
    if (buttonContainerRef.current) {
      gsap.fromTo(buttonContainerRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.2
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        willChange: 'auto' // Оптимизация для браузера
      }}
    >
      {/* Контент раздела */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start" style={{ padding: '0 4%', paddingTop: 'clamp(0.5rem, 1vh, 1rem)', pointerEvents: 'auto' }}>
        {/* Логотип по центру сверху */}
        <div ref={logoRef} className="flex justify-center w-full" style={{ marginTop: '0', marginBottom: '0' }}>
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/logo100let.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(12rem, 35vw, 30rem)',
              height: 'clamp(8rem, 25vw, 22rem)',
              maxWidth: '100%',
              filter: 'drop-shadow(0 0 1.25rem rgba(255,255,255,0.3))'
            }}
          />
        </div>

        {/* Текст под логотипом */}
        <div ref={textRef} className="text-center text-white w-full" style={{ marginTop: 'clamp(-7rem, -12vh, -6.5rem)' }}>
          <p 
            className="uppercase"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1.5vw, 1.5rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              padding: '0 clamp(1rem, 2vw, 2rem)',
              marginBottom: '0'
            }}
          >
            <TypingText 
              text="ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ ИЛЬФА И ПЕТРОВА"
              speed={50}
              delay={500}
            />
          </p>
          
          {/* Текст "СЛЕДУЙ ЗА БЕНДЕРОМ!" под текстом, под серединой */}
          <div 
            className="flex justify-center text-white w-full"
            style={{ 
              marginTop: '0',
              paddingLeft: 'clamp(1rem, 2vw, 2rem)',
              paddingRight: 'clamp(1rem, 2vw, 2rem)'
            }}
          >
            <p 
              className="uppercase"
              style={{ 
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.75rem, 1.125vw, 1.125rem)',
                textShadow: '0 0 0.625rem rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                textAlign: 'center',
                paddingLeft: 'clamp(8.5rem, 21vw, 30rem)'
              }}
            >
              <TypingText 
                text="СЛЕДУЙ ЗА БЕНДЕРОМ!"
                speed={50}
                delay={2500}
              />
            </p>
          </div>
        </div>

      </div>
      
      {/* Кнопка снизу слева - вынесена за пределы контейнера для гарантии кликабельности */}
      <div 
        ref={buttonContainerRef}
        className="flex w-full"
        style={{ 
          position: 'absolute',
          bottom: 'clamp(6rem, 15vh, 15rem)',
          left: '0',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
          paddingRight: 'clamp(1rem, 4vw, 4rem)',
          justifyContent: 'flex-start',
          zIndex: 9999,
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Кнопка НАЧАТЬ ПУТЬ нажата, onStartJourney:', onStartJourney);
            // Прямой вызов функции прокрутки
            if (onStartJourney) {
              try {
                onStartJourney();
              } catch (error) {
                console.error('Ошибка при вызове onStartJourney:', error);
              }
            } else {
              console.warn('onStartJourney не передан!');
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onStartJourney) {
              onStartJourney();
            }
          }}
          className="rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(0.875rem, 1.25vw, 1.25rem)',
            letterSpacing: '0.0625rem',
            color: '#FBC632',
            backgroundColor: 'transparent',
            borderColor: '#FBC632',
            padding: 'clamp(0.75rem, 1.25vw, 1.25rem) clamp(1.5rem, 2.5vw, 2.5rem)',
            boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
            textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.8), 0 0 1.25rem rgba(251, 198, 50, 0.5)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 10000,
            position: 'relative',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          НАЧАТЬ ПУТЬ
        </button>
      </div>
      
      {/* Затемнение внизу HeroSection для плавного перехода к section-2.png */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          height: '6vh',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0.6) 45%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 1) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}

