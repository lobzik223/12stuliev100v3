'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { actors } from '../../data/actors';

function isIOSUserAgent(ua: string) {
  return /iPad|iPhone|iPod/i.test(ua);
}

function pickFallbackPhoto(actorId: number) {
  // Берём существующие ассеты из public/photo/, чтобы убрать 404 и пустые блоки.
  // Если в будущем в public/actors появятся реальные фото — они подхватятся, fallback не сработает.
  const pool = ['/photo/actor-22.png', '/photo/actor-333.png', '/photo/actor-4.png', '/photo/actor-5.png', '/photo/artisti.png'];
  return pool[(actorId - 1) % pool.length];
}

export default function ActorsSection() {
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Image fallback state - MUST be before any conditional returns
  const [imgSrcById, setImgSrcById] = useState<Record<number, string>>(() => {
    const m: Record<number, string> = {};
    actors.forEach((a) => (m[a.id] = a.image));
    return m;
  });

  useEffect(() => {
    setMounted(true);
    if (typeof navigator !== 'undefined') {
      setIsIOS(isIOSUserAgent(navigator.userAgent ?? ''));
    }
    if (typeof window !== 'undefined') {
      const update = () => setIsMobile(window.innerWidth < 768);
      update();
      window.addEventListener('resize', update, { passive: true } as any);
      window.addEventListener('orientationchange', update, { passive: true } as any);
      return () => {
        window.removeEventListener('resize', update as any);
        window.removeEventListener('orientationchange', update as any);
      };
    }
  }, []);

  // На iOS Safari агрессивные фиксаторы (raf + interval + MutationObserver) могут “убивать” страницу.
  // Здесь оставляем лёгкую фиксацию только для десктопа; на мобилке позиционирование стрелок решает CSS.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const fixButtonPositions = () => {
      const topValue = '50%';

      if (prevButtonRef.current) {
        const button = prevButtonRef.current;
        button.style.setProperty('position', 'absolute', 'important');
        button.style.setProperty('top', topValue, 'important');
        button.style.setProperty('left', '-1rem', 'important');
        button.style.setProperty('right', 'auto', 'important');
        button.style.setProperty('bottom', 'auto', 'important');
        button.style.setProperty('transform', 'translateY(-50%)', 'important');
        button.style.zIndex = '30';
        button.style.color = '#FBC632';
        button.style.cursor = 'pointer';
      }

      if (nextButtonRef.current) {
        const button = nextButtonRef.current;
        button.style.setProperty('position', 'absolute', 'important');
        button.style.setProperty('top', topValue, 'important');
        button.style.setProperty('right', '-1rem', 'important');
        button.style.setProperty('left', 'auto', 'important');
        button.style.setProperty('bottom', 'auto', 'important');
        button.style.setProperty('transform', 'translateY(-50%)', 'important');
        button.style.zIndex = '30';
        button.style.color = '#FBC632';
        button.style.cursor = 'pointer';
      }
    };

    const initTimeout = window.setTimeout(() => fixButtonPositions(), 200);
    const onResize = () => fixButtonPositions();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.clearTimeout(initTimeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const iOSFallbackActor = useMemo(() => actors[0], []);

  // iOS: безопасный SSR/первый рендер без Swiper (как в TrailerSection), чтобы не ломалась гидрация.
  if (isIOS && !mounted) {
    const fallback = iOSFallbackActor;
    return (
      <section
        className="relative w-full actors-section-mobile"
        style={{
          minHeight: '100vh',
          padding: '0 4% clamp(4rem, 8vh, 6rem) 4%',
          marginTop: 'clamp(-7rem, -12vh, -6rem)',
          zIndex: 20,
          position: 'relative',
        }}
      >
        <div className="w-full max-w-[120rem] mx-auto">
          <div className="text-center mb-12">
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
                color: '#FBC632',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
              АКТЕРЫ
            </p>
            <p
              className="uppercase"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.05em',
                lineHeight: '1.3',
              }}
            >
              ТАЛАНТЛИВЫЕ АКТЁРЫ, КОТОРЫЕ ВОПЛОЩАЮТ НА СЦЕНЕ
              <br />
              КЛАССИЧЕСКИХ ПЕРСОНАЖЕЙ
            </p>
          </div>

          <div className="flex flex-col items-center w-full" style={{ minHeight: '600px', padding: '2rem 0' }}>
            <div
              className="relative w-full rounded-lg overflow-hidden actor-card-image"
              style={{
                maxWidth: 'clamp(15.625rem, 20vw, 18.75rem)',
                aspectRatio: '3/5',
                border: '3px solid #D9D9D9',
                boxShadow: '0 0 1.5625rem rgba(217, 217, 217, 0.6), inset 0 0 0.625rem rgba(217, 217, 217, 0.2)',
              }}
            >
              <div className="w-full h-full bg-gray-900 relative">
                <Image
                  src={pickFallbackPhoto(fallback.id)}
                  alt={fallback.name}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Для реального рендера: на мобилке (и на iOS) оставляем Swiper, но делаем “мягкий” fallback для битых картинок.

  return (
    <section 
      className="relative w-full actors-section-mobile"
      style={{
        minHeight: '100vh',
        padding: '0 4% clamp(4rem, 8vh, 6rem) 4%',
        marginTop: 'clamp(-7rem, -12vh, -6rem)',
        zIndex: 20,
        position: 'relative'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        {/* Заголовок "Актеры" */}
        <div className="text-center mb-12">
          <p
            className="uppercase mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
              color: '#FBC632',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.1em'
            }}
          >
            АКТЕРЫ
          </p>
          <p
            className="uppercase"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.05em',
              lineHeight: '1.3'
            }}
          >
            ТАЛАНТЛИВЫЕ АКТЁРЫ, КОТОРЫЕ ВОПЛОЩАЮТ НА СЦЕНЕ<br />
            КЛАССИЧЕСКИХ ПЕРСОНАЖЕЙ
          </p>
        </div>

        {/* Карусель актеров Swiper */}
        <div ref={containerRef} className="relative w-full" style={{ minHeight: '600px', padding: '2rem 0' }}>
          <Swiper
            modules={[Navigation]}
            speed={isMobile ? 1200 : 800}
            spaceBetween={40}
            loop={true}
            slidesPerView={3}
            slidesPerGroup={1}
            centeredSlides={true}
            grabCursor={true}
            navigation={{
              nextEl: '.swiper-button-next-actors',
              prevEl: '.swiper-button-prev-actors',
            }}
            onSlideChange={() => {
              // На мобилке позиционирование стрелок отдано CSS; на десктопе фиксируем “мягко” (см. useEffect выше).
            }}
            onSwiper={() => {
              // После инициализации Swiper — небольшая задержка, чтобы CSS/DOM устаканились (особенно на мобилке).
              setTimeout(() => {
                // noop: позиции стрелок — CSS (моб), лёгкий фикс — useEffect (десктоп).
              }, 200);
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
                effect: 'slide',
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="actors-carousel"
          >
            {actors.map((actor, index) => {
              return (
                <SwiperSlide key={actor.id}>
                  <div className="flex flex-col items-center w-full actor-slide-content">
                      {/* Фото актера */}
              <div 
                        className="relative w-full rounded-lg overflow-hidden actor-card-image"
                style={{
                  maxWidth: 'clamp(15.625rem, 20vw, 18.75rem)',
                  aspectRatio: '3/5',
                  border: '3px solid #D9D9D9',
                  boxShadow: '0 0 1.5625rem rgba(217, 217, 217, 0.6), inset 0 0 0.625rem rgba(217, 217, 217, 0.2)'
                }}
              >
                        <div className="w-full h-full bg-gray-900 relative">
                          {imgSrcById[actor.id] ? (
                            <Image 
                              src={imgSrcById[actor.id]} 
                              alt={actor.name}
                              width={400}
                              height={600}
                              className="w-full h-full object-cover"
                              unoptimized
                              onError={() => {
                                // Если /actors/*.jpg отсутствует — подставляем существующий placeholder, чтобы не было пустого блока.
                                setImgSrcById((prev) => ({
                                  ...prev,
                                  [actor.id]: pickFallbackPhoto(actor.id),
                                }));
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                              <span className="text-gray-500 text-sm">Нет фото</span>
                            </div>
                          )}
                        </div>
              </div>
                      
                      {/* Линия под фото */}
              <div 
                        className="w-full relative -mt-0.5 actor-card-line"
                style={{
                  maxWidth: 'clamp(21.25rem, 27vw, 27.5rem)',
                  height: '2px',
                  backgroundColor: '#D9D9D9',
                  boxShadow: '0 0 0.625rem rgba(217, 217, 217, 0.6)'
                }}
              />
                      
                      {/* Имя и роль */}
                      <div className="text-center mt-3 actor-card-text" style={{ maxWidth: 'clamp(15.625rem, 20vw, 18.75rem)' }}>
                <p 
                          className="mb-1 actor-card-name"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
                    color: '#FBC632',
                    fontWeight: 'normal',
                    letterSpacing: '0.05em',
                    filter: 'drop-shadow(0 0 0.46875rem rgba(251, 198, 50, 0.6))',
                    textShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4), 0 0 1.875rem rgba(251, 198, 50, 0.3)'
                  }}
                >
                          {actor.fullName ? (
                            <>
                              {actor.name}<br />
                              {actor.fullName}
                            </>
                          ) : (
                            actor.name
                          )}
                </p>
                <p 
                          className="actor-card-role"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                    color: '#D9D9D9',
                    letterSpacing: '0.05em'
                  }}
                >
                          {actor.role}
                </p>
              </div>
            </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Кнопки навигации Swiper */}
          <div 
            ref={prevButtonRef}
            className="swiper-button-prev swiper-button-prev-actors" 
                  style={{
              position: 'absolute',
              top: isMobile ? '30%' : '50%',
              left: '-1rem',
              right: 'auto',
              bottom: 'auto',
              margin: '0',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: 'clamp(2rem, 3vw, 3rem)',
              height: 'clamp(2rem, 3vw, 3rem)',
                    color: '#FBC632',
              cursor: 'pointer'
                  }}
          ></div>
          <div 
            ref={nextButtonRef}
            className="swiper-button-next swiper-button-next-actors" 
                  style={{
              position: 'absolute',
              top: isMobile ? '30%' : '50%',
              right: '-1rem',
              left: 'auto',
              bottom: 'auto',
              margin: '0',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: 'clamp(2rem, 3vw, 3rem)',
              height: 'clamp(2rem, 3vw, 3rem)',
                    color: '#FBC632',
              cursor: 'pointer'
                  }}
          ></div>
        </div>
      </div>
    </section>
  );
}

