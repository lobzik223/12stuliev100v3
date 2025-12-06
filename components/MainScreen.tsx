'use client';

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SecondaryNav from "./sections/SecondaryNav";
import HeroSection from "./sections/HeroSection";
import EventsSection from "./sections/EventsSection";
import JourneySection from "./sections/JourneySection";
import ActorsSection from "./sections/ActorsSection";
import TrailerSection from "./sections/TrailerSection";

export default function MainScreen() {
  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true);
  const secondaryHeaderNavRef = useRef<HTMLDivElement>(null);
  const sectionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (secondaryHeaderNavRef.current && sectionEndRef.current) {
      const handleScroll = () => {
        if (!secondaryHeaderNavRef.current || !sectionEndRef.current) return;
        
        const secondaryRect = secondaryHeaderNavRef.current.getBoundingClientRect();
        const endRect = sectionEndRef.current.getBoundingClientRect();
        
        if (secondaryRect.top <= 100 && endRect.top > 0) {
          setIsMainHeaderVisible(false);
        } else {
          setIsMainHeaderVisible(true);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black" style={{ overflowX: 'hidden' }}>
      <Header isVisible={isMainHeaderVisible} />
      <SecondaryNav isVisible={!isMainHeaderVisible} />
      
      <div className="min-h-screen">
        {/* Раздел 1 - Hero */}
        <HeroSection />

        {/* Раздел 2 - Карточки событий (под текстами Hero) */}
        <EventsSection />

        {/* Раздел "В ПУТЬ" */}
        <div ref={secondaryHeaderNavRef}>
          <JourneySection sectionEndRef={sectionEndRef} />
        </div>

        {/* Переходный элемент с черным блюром между section-4.png и section-3.png */}
        <div 
          className="relative w-full"
          style={{
            height: '20vh',
            width: '100%',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 1) 100%)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            zIndex: 10,
            position: 'relative'
          }}
        />

        {/* Раздел с фоном section-3.png */}
        <section 
          className="relative w-full"
          style={{
            width: '100%'
          }}
        >
          {/* Фон раздела - покрывает ActorsSection и TrailerSection до конца раздела "Контакты и партнёры" */}
          <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
            <div
              style={{
                backgroundImage: 'url(/backgrounds/sections/section-3.png)',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: 0,
                bottom: 0
              }}
            />
          </div>
          {/* Черный блюр над фоном section-3.png для сглаживания перехода */}
          <div 
            className="absolute top-0 left-0 w-full"
            style={{
              height: '25vh',
              width: '100%',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.3) 85%, rgba(0, 0, 0, 0) 100%)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />
          {/* Контейнер для контента */}
          <div className="relative w-full" style={{ zIndex: 15 }}>
            {/* Раздел "АКТЕРЫ" */}
            <div className="relative w-full" style={{ zIndex: 15 }}>
              <ActorsSection />
            </div>
            
            {/* Раздел "ТРЕЙЛЕР" */}
            <div className="relative w-full">
              <TrailerSection />
            </div>
          </div>
        </section>

        {/* Раздел с фоном sectıon-12.png и наложением sectıon-1509.png */}
        <section className="relative w-full">
          <div className="relative w-full z-0">
            {/* Фоновое изображение sectıon-12.png */}
            <img
              src="/backgrounds/sections/sectıon-12.png"
              alt=""
              className="w-full h-auto block"
              style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            {/* Наложенное изображение sectıon-1509.png в начале фона */}
            <div 
              className="absolute top-0 left-0 w-full"
              style={{ zIndex: 5 }}
            >
              <img
                src="/backgrounds/sections/sectıon-1509.png"
                alt=""
                className="w-full h-auto block"
                style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

