'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { actors } from '../../data/actors';

export default function ActorsSection() {
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const fixedTopPxRef = useRef<number | null>(null);

  // Вычисляем фиксированную позицию один раз при инициализации
  const calculateFixedPosition = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    // Вычисляем позицию выше центра (примерно на 8% выше центра)
    fixedTopPxRef.current = containerRect.height / 2 - containerRect.height * 0.08;
  };

  useEffect(() => {

    // Блокируем изменение стилей через переопределение setProperty и прямое присваивание
    const lockButtonStyles = (button: HTMLElement, isPrev: boolean) => {
      const lockedProperties = ['top', 'bottom', 'margin', 'marginTop', 'marginBottom', 'position'];
      
      // Блокируем setProperty
      const originalSetProperty = button.style.setProperty.bind(button.style);
      button.style.setProperty = function(property: string, value: string, priority?: string) {
        const propLower = property.toLowerCase();
        if (lockedProperties.includes(propLower)) {
          // Игнорируем попытки изменить заблокированные свойства
          return;
        }
        return originalSetProperty(property, value, priority);
      };
      
      // Блокируем removeProperty
      const originalRemoveProperty = button.style.removeProperty.bind(button.style);
      button.style.removeProperty = function(property: string) {
        if (lockedProperties.includes(property.toLowerCase())) {
          return; // Игнорируем попытки удалить заблокированные свойства
        }
        return originalRemoveProperty(property);
      };
    };

    const fixButtonPositions = () => {
      // Если позиция еще не вычислена, вычисляем её
      if (fixedTopPxRef.current === null) {
        calculateFixedPosition();
      }
      
      // Используем фиксированную позицию в пикселях, если она вычислена
      const topValue = fixedTopPxRef.current !== null ? `${fixedTopPxRef.current}px` : '50%';

      if (prevButtonRef.current) {
        const button = prevButtonRef.current;
        // Принудительно устанавливаем все свойства через прямое присваивание
        button.style.setProperty('position', 'absolute', 'important');
        button.style.setProperty('top', topValue, 'important');
        button.style.setProperty('left', '-1rem', 'important');
        button.style.setProperty('right', 'auto', 'important');
        button.style.setProperty('bottom', 'auto', 'important');
        button.style.setProperty('margin', '0', 'important');
        button.style.setProperty('margin-top', '0', 'important');
        button.style.setProperty('margin-bottom', '0', 'important');
        button.style.setProperty('margin-left', '0', 'important');
        button.style.setProperty('margin-right', '0', 'important');
        button.style.setProperty('transform', 'translateY(-50%)', 'important');
        button.style.zIndex = '30';
        button.style.width = 'clamp(2rem, 3vw, 3rem)';
        button.style.height = 'clamp(2rem, 3vw, 3rem)';
        button.style.color = '#FBC632';
        button.style.cursor = 'pointer';
      }

      if (nextButtonRef.current) {
        const button = nextButtonRef.current;
        // Принудительно устанавливаем все свойства через прямое присваивание
        button.style.setProperty('position', 'absolute', 'important');
        button.style.setProperty('top', topValue, 'important');
        button.style.setProperty('right', '-1rem', 'important');
        button.style.setProperty('left', 'auto', 'important');
        button.style.setProperty('bottom', 'auto', 'important');
        button.style.setProperty('margin', '0', 'important');
        button.style.setProperty('margin-top', '0', 'important');
        button.style.setProperty('margin-bottom', '0', 'important');
        button.style.setProperty('margin-left', '0', 'important');
        button.style.setProperty('margin-right', '0', 'important');
        button.style.setProperty('transform', 'translateY(-50%)', 'important');
        button.style.zIndex = '30';
        button.style.width = 'clamp(2rem, 3vw, 3rem)';
        button.style.height = 'clamp(2rem, 3vw, 3rem)';
        button.style.color = '#FBC632';
        button.style.cursor = 'pointer';
      }
    };

    // Вычисляем фиксированную позицию после небольшой задержки (когда контейнер полностью отрендерен)
    const initTimeout = setTimeout(() => {
      calculateFixedPosition();
      fixButtonPositions();
      
      // Блокируем стили после вычисления позиции
      if (prevButtonRef.current) {
        lockButtonStyles(prevButtonRef.current, true);
      }
      if (nextButtonRef.current) {
        lockButtonStyles(nextButtonRef.current, false);
      }
    }, 300);

    // Фиксируем позиции сразу
    fixButtonPositions();

    // Используем requestAnimationFrame для постоянной фиксации (каждый кадр)
    const animate = () => {
      fixButtonPositions();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Дополнительно фиксируем каждые 10мс через setInterval (более агрессивно)
    const intervalId = setInterval(() => {
      fixButtonPositions();
    }, 10);

    // Следим за изменениями и фиксируем позиции
    const observer = new MutationObserver(() => {
      fixButtonPositions();
    });

    if (prevButtonRef.current) {
      observer.observe(prevButtonRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: false
      });
    }
    if (nextButtonRef.current) {
      observer.observe(nextButtonRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: false
      });
    }

    // Также фиксируем при скролле и ресайзе
    const handleScroll = () => fixButtonPositions();
    const handleResize = () => fixButtonPositions();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      clearInterval(intervalId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      className="relative w-full"
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
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.9), 0 6px 12px rgba(0, 0, 0, 0.7), 0 9px 18px rgba(0, 0, 0, 0.5), 0 0 2rem rgba(231, 200, 132, 0.6), 0 0 3.5rem rgba(231, 200, 132, 0.5), 0 0 5rem rgba(231, 200, 132, 0.4), 0 0 6.5rem rgba(231, 200, 132, 0.3)',
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
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.9), 0 6px 12px rgba(0, 0, 0, 0.7), 0 9px 18px rgba(0, 0, 0, 0.5), 0 0 1.8rem rgba(231, 200, 132, 0.6), 0 0 3rem rgba(231, 200, 132, 0.5), 0 0 4.5rem rgba(231, 200, 132, 0.4), 0 0 6rem rgba(231, 200, 132, 0.3)',
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
            speed={800}
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
              // Фиксируем позиции после каждого перехода слайда
              if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                const topValue = `${fixedTopPxRef.current}px`;
                const prevButton = prevButtonRef.current;
                prevButton.style.setProperty('position', 'absolute', 'important');
                prevButton.style.setProperty('top', topValue, 'important');
                prevButton.style.setProperty('left', '-1rem', 'important');
                prevButton.style.setProperty('right', 'auto', 'important');
                prevButton.style.setProperty('bottom', 'auto', 'important');
                prevButton.style.setProperty('margin', '0', 'important');
                prevButton.style.setProperty('transform', 'translateY(-50%)', 'important');
                prevButton.style.zIndex = '30';
                
                const nextButton = nextButtonRef.current;
                nextButton.style.setProperty('position', 'absolute', 'important');
                nextButton.style.setProperty('top', topValue, 'important');
                nextButton.style.setProperty('right', '-1rem', 'important');
                nextButton.style.setProperty('left', 'auto', 'important');
                nextButton.style.setProperty('bottom', 'auto', 'important');
                nextButton.style.setProperty('margin', '0', 'important');
                nextButton.style.setProperty('transform', 'translateY(-50%)', 'important');
                nextButton.style.zIndex = '30';
              }
            }}
            onSlideChangeTransitionStart={() => {
              // Фиксируем позиции в начале перехода
              if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                const topValue = `${fixedTopPxRef.current}px`;
                prevButtonRef.current.style.setProperty('top', topValue, 'important');
                nextButtonRef.current.style.setProperty('top', topValue, 'important');
              }
            }}
            onSlideChangeTransitionEnd={() => {
              // Фиксируем позиции в конце перехода
              if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                const topValue = `${fixedTopPxRef.current}px`;
                prevButtonRef.current.style.setProperty('top', topValue, 'important');
                nextButtonRef.current.style.setProperty('top', topValue, 'important');
              }
            }}
            onTransitionStart={() => {
              // Фиксируем позиции в начале любой анимации
              if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                const topValue = `${fixedTopPxRef.current}px`;
                prevButtonRef.current.style.setProperty('top', topValue, 'important');
                nextButtonRef.current.style.setProperty('top', topValue, 'important');
              }
            }}
            onTransitionEnd={() => {
              // Фиксируем позиции в конце любой анимации
              if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                const topValue = `${fixedTopPxRef.current}px`;
                prevButtonRef.current.style.setProperty('top', topValue, 'important');
                nextButtonRef.current.style.setProperty('top', topValue, 'important');
              }
            }}
            onSwiper={() => {
              // Вычисляем и фиксируем позиции после инициализации Swiper
              setTimeout(() => {
                calculateFixedPosition();
                if (prevButtonRef.current && nextButtonRef.current && fixedTopPxRef.current !== null) {
                  const topValue = `${fixedTopPxRef.current}px`;
                  const prevButton = prevButtonRef.current;
                  prevButton.style.setProperty('position', 'absolute', 'important');
                  prevButton.style.setProperty('top', topValue, 'important');
                  prevButton.style.setProperty('left', '-1rem', 'important');
                  prevButton.style.setProperty('right', 'auto', 'important');
                  prevButton.style.setProperty('bottom', 'auto', 'important');
                  prevButton.style.setProperty('margin', '0', 'important');
                  prevButton.style.setProperty('transform', 'translateY(-50%)', 'important');
                  prevButton.style.zIndex = '30';
                  
                  const nextButton = nextButtonRef.current;
                  nextButton.style.setProperty('position', 'absolute', 'important');
                  nextButton.style.setProperty('top', topValue, 'important');
                  nextButton.style.setProperty('right', '-1rem', 'important');
                  nextButton.style.setProperty('left', 'auto', 'important');
                  nextButton.style.setProperty('bottom', 'auto', 'important');
                  nextButton.style.setProperty('margin', '0', 'important');
                  nextButton.style.setProperty('transform', 'translateY(-50%)', 'important');
                  nextButton.style.zIndex = '30';
                }
              }, 200);
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
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
                        <div className="w-full h-full bg-gray-900">
                          {actor.image && (
                            <Image 
                              src={actor.image} 
                              alt={actor.name}
                              width={400}
                              height={600}
                              className="w-full h-full object-cover"
                              unoptimized
                            />
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
              top: '42%',
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
              top: '42%',
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

