'use client';

import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JourneySectionProps {
  sectionEndRef: React.RefObject<HTMLDivElement>;
}

export default function JourneySection({ sectionEndRef }: JourneySectionProps) {
  const vputSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP анимации для объектов в разделе "В ПУТЬ"
    if (vputSectionRef.current) {
      const allElements = vputSectionRef.current.querySelectorAll('[data-animate="vput"]');
      const imageElements: Element[] = [];
      const textElements: Element[] = [];
      
      // Разделяем элементы на изображения и тексты
      allElements.forEach((el) => {
        // Проверяем, является ли это объектом vput (vput.png, vput2.png, vput3.png, vput4.png)
        const innerDiv = el.querySelector('div');
        let isVputObject = false;
        
        if (innerDiv) {
          const styleAttr = innerDiv.getAttribute('style') || '';
          isVputObject = styleAttr.includes('vput.png') || 
                        styleAttr.includes('vput2.png') || 
                        styleAttr.includes('vput3.png') || 
                        styleAttr.includes('vput4.png');
        }
        
        // Пропускаем объекты vput и тексты - они не должны иметь параллакс
        if (isVputObject || (el.textContent && el.textContent.trim().length > 0)) {
          // Это vput объект или текст - только анимация появления, без параллакса
          return;
        }
        
        // Проверяем, есть ли внутри div с backgroundImage (для остальных объектов)
        let hasImage = false;
        if (innerDiv) {
          const styleAttr = innerDiv.getAttribute('style') || '';
          hasImage = styleAttr.includes('backgroundImage') || 
                     styleAttr.includes('background-image') ||
                     (window.getComputedStyle && window.getComputedStyle(innerDiv).backgroundImage !== 'none' && 
                      window.getComputedStyle(innerDiv).backgroundImage !== '');
        }
        
        if (hasImage) {
          imageElements.push(el);
        } else {
          textElements.push(el);
        }
      });
      
      // Анимация для объектов vput и текстов - только появление, без параллакса
      allElements.forEach((el, index) => {
        // Проверяем, является ли это объектом vput или текстом
        const innerDiv = el.querySelector('div');
        let isVputObject = false;
        let isText = el.textContent && el.textContent.trim().length > 0;
        
        if (innerDiv) {
          const styleAttr = innerDiv.getAttribute('style') || '';
          isVputObject = styleAttr.includes('vput.png') || 
                        styleAttr.includes('vput2.png') || 
                        styleAttr.includes('vput3.png') || 
                        styleAttr.includes('vput4.png');
        }
        
        // Если это vput объект или текст - только анимация появления
        if (isVputObject || isText) {
          gsap.set(el, {
            opacity: 0,
            y: 60
          });
          
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.03
          });
        }
      });
      
      // Анимация для объектов с параллаксом - появление + плавный параллакс (как в MainView.tsx)
      imageElements.forEach((el, index) => {
        // Устанавливаем начальное состояние
        gsap.set(el, {
          opacity: 0,
          y: 60,
          scale: 0.95
        });
        
        // Быстрая анимация появления
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.03
        });
        
        // Легкий параллакс-эффект для объектов (более деликатный)
        const speed = 0.3 + (index % 4) * 0.15; // Более медленные скорости от 0.3 до 0.75
        const directionY = index % 2 === 0 ? -1 : 1;
        const directionX = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0;
        
        gsap.to(el, {
          y: directionY * 40 * speed, // Уменьшена амплитуда для более легкого эффекта
          x: directionX * 25 * speed, // Уменьшена амплитуда для более легкого эффекта
          rotation: directionY * 2 * speed, // Уменьшено вращение
          scale: 1 + (speed * 0.02), // Очень легкое увеличение масштаба
          ease: "sine.inOut", // Плавное движение
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Более плавное и медленное движение
            invalidateOnRefresh: true
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <section 
      ref={vputSectionRef}
      className="relative w-full"
      style={{
        minHeight: '400vh',
        width: '100%',
        marginTop: 'clamp(0vh, 10vh, 20vh)',
        paddingTop: '0'
      }}
    >
      {/* Фон раздела */}
      <div className="relative w-full z-0" style={{ minHeight: '400vh', width: '100%' }}>
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/section-4.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: 0,
            minHeight: '400vh'
          }}
        />
      </div>

      {/* Изображение vput.png поверх фона сверху */}
      <div 
        className="absolute z-[5]"
        style={{
          top: 'clamp(5vh, 15vh, 25vh)',
          left: 'clamp(2rem, 4vw, 5rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/vput.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(25rem, 38vw, 45rem)',
            height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение tiraj.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        style={{
          top: 'clamp(20vh, 30vh, 40vh)',
          right: 'clamp(22.5rem, 30vw, 28.125rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/tiraj.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(18rem, 24vw, 30rem)',
            height: 'clamp(13.5rem, 18vw, 22.5rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение flash.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.5"
        style={{
          top: 'clamp(20.5vh, 31vh, 41vh)',
          right: 'clamp(0.5rem, 1vw, 1.5rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/flash.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(18rem, 24vw, 30rem)',
            height: 'clamp(13.5rem, 18vw, 22.5rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Навигационная панель */}
      <div 
        className="absolute z-[10] w-full max-w-[1200px] left-1/2 -translate-x-1/2"
        style={{
          top: 'clamp(-25vh, -15vh, -5vh)',
          paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
          paddingRight: 'clamp(0.5rem, 1vw, 1rem)',
          paddingTop: 'clamp(0.625rem, 0.75vw, 0.75rem)',
          paddingBottom: 'clamp(0.625rem, 0.75vw, 0.75rem)'
        }}
      >
        {/* SVG фон с эффектом свечения */}
        <div className="relative w-full" style={{ height: 'clamp(80px, 10vh, 90px)' }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1728 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="filter0_d_journey"
                x="0"
                y="0"
                width="1728"
                height="81"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="7.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.984314 0 0 0 0 0.776471 0 0 0 0 0.196078 0 0 0 0.6 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_journey"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_journey"
                  result="shape"
                />
              </filter>
            </defs>
            <g filter="url(#filter0_d_journey)">
              <rect
                x="15"
                y="15"
                width="1698"
                height="51"
                rx="10"
                fill="#682302"
              />
              <rect
                x="16"
                y="16"
                width="1696"
                height="49"
                rx="9"
                stroke="#955E0C"
                strokeWidth="2"
              />
            </g>
          </svg>

          {/* Контент поверх SVG */}
          <div className="relative h-full flex items-center justify-center px-4 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-12">
              {/* ОФИС ЛОТЕРЕИ «БИМ-БОМ-26» */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-3 h-3 rounded-full mb-2"
                  style={{
                    backgroundColor: '#FBC632',
                    boxShadow: '0 0 10px rgba(251, 198, 50, 0.8)'
                  }}
                ></div>
                <p
                  className="text-xs md:text-sm text-center uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: 'white'
                  }}
                >
                  ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»
                </p>
              </div>
              
              {/* ПСИХУШКА */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-3 h-3 rounded-full mb-2 border-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'transparent'
                  }}
                ></div>
                <p
                  className="text-xs md:text-sm text-center uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: 'white'
                  }}
                >
                  ПСИХУШКА
                </p>
              </div>
              
              {/* КВАРТИРА КИСЫ */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-3 h-3 rounded-full mb-2 border-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'transparent'
                  }}
                ></div>
                <p
                  className="text-xs md:text-sm text-center uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: 'white'
                  }}
                >
                  КВАРТИРА КИСЫ
                </p>
              </div>
              
              {/* КВАРТИРА СТАРУХИ ЯРЫГИНОЙ */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-3 h-3 rounded-full mb-2 border-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'transparent'
                  }}
                ></div>
                <p
                  className="text-xs md:text-sm text-center uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: 'white'
                  }}
                >
                  КВАРТИРА СТАРУХИ ЯРЫГИНОЙ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Текст отдельно от flash.png */}
      <div 
        className="absolute z-[5] text-center"
        data-animate="vput"
        style={{
          top: 'clamp(55vh, 65vh, 75vh)',
          right: 'clamp(4rem, 6vw, 7rem)',
          paddingLeft: 'clamp(1rem, 2vw, 2rem)',
          paddingRight: 'clamp(1rem, 2vw, 2rem)',
          maxWidth: 'clamp(20rem, 40vw, 40rem)'
        }}
      >
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
            color: '#FFFDFD',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: '1.2'
          }}
        >
          ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И<br />
          РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.
        </p>
      </div>

      {/* Изображение stul100let.png слева от vput2.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.4"
        style={{
          top: 'clamp(87vh, 105vh, 124vh)',
          left: 'clamp(0rem, 0.5vw, 3.125rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/stul100let.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(28rem, 38vw, 42rem)',
            height: 'clamp(21rem, 28.5vw, 31.5rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение vput2.png ниже и справа */}
      <div 
        className="absolute z-[5]"
        style={{
          top: 'clamp(85vh, 100vh, 120vh)',
          left: 'clamp(26rem, 34vw, 40rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/vput2.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(25rem, 38vw, 45rem)',
            height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение analiz.png справа от vput2.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.7"
        style={{
          top: 'clamp(84vh, 102vh, 122vh)',
          left: 'clamp(52rem, 68vw, 85rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/analiz.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(20rem, 26vw, 30rem)',
            height: 'clamp(15rem, 19.5vw, 22.5rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Текст "Психушка" ниже analiz.png */}
      <div 
        className="absolute z-[5] text-center"
        data-animate="vput"
        style={{
          top: 'clamp(115.625vh, 143.75vh, 156.25vh)',
          left: 'clamp(55rem, 71vw, 88rem)',
          maxWidth: 'clamp(22rem, 28vw, 32rem)'
        }}
      >
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
            color: '#FFFDFD',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          ПСИХУШКА
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: '1.5'
          }}
        >
          СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ<br />
          СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ<br />
          СИСТЕМУ.
        </p>
      </div>

      {/* Изображение pamat15.png слева от vput3.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.3"
        style={{
          top: 'clamp(175vh, 207.5vh, 200vh)',
          left: 'clamp(0rem, 2.5vw, 6.25rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/pamat15.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(32rem, 40vw, 40rem)',
            height: 'clamp(24rem, 30vw, 30rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Текст "КВАРТИРА КИСЫ" ниже pamat15.png */}
      <div 
        className="absolute z-[5] text-center"
        data-animate="vput"
        style={{
          top: 'clamp(238vh, 272.5vh, 250vh)',
          left: 'clamp(6rem, 11vw, 21rem)',
          maxWidth: 'clamp(20rem, 32.5vw, 32.5rem)'
        }}
      >
        <p
          className="uppercase mb-4"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
            color: '#FFFFFF',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          КВАРТИРА КИСЫ
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: '1.2'
          }}
        >
          ЛИЧНОЕ УБЕЖИЩЕ И ШТАБ<br />
          ОПЕРАЦИИ, ГДЕ СТАЛКИВАЮТСЯ<br />
          ЖАДНОСТЬ И СОВЕСТЬ.
        </p>
      </div>

      {/* Изображение computer.png ниже текста "Личное убежище..." */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.5"
        style={{
          top: 'clamp(280vh, 335vh, 305vh)',
          left: 'clamp(3.5rem, 6.75vw, 14.5rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/computer.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(21rem, 28vw, 29rem)',
            height: 'clamp(15.75rem, 21vw, 21.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение vput3.png ниже объекта vput2.png */}
      <div 
        className="absolute z-[5]"
        style={{
          top: 'clamp(173vh, 206vh, 198vh)',
          left: 'clamp(50rem, 59vw, 66rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/vput3.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(25rem, 38vw, 45rem)',
            height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Текст "КВАРТИРА СТАРУХИ ЯРЫГИНОЙ" ниже computer.png */}
      <div 
        className="absolute z-[5] text-center"
        style={{
          top: 'clamp(325vh, 390vh, 350vh)',
          left: 'clamp(2rem, 5.75vw, 12rem)',
          maxWidth: 'clamp(20rem, 31.25vw, 43.75rem)'
        }}
      >
        <p
          className="uppercase mb-4"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
            color: '#FFFFFF',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          КВАРТИРА СТАРУХИ ЯРЫГИНОЙ
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.05em',
            lineHeight: '1.2'
          }}
        >
          ФИНАЛ ОХОТЫ — ЛОГОВО<br />
          «БАБКИ-ХАКЕРА», УПРАВЛЯЮЩЕЙ<br />
          МИЛЛИАРДАМИ ИЗ КРЕСЛА.
        </p>
      </div>

      {/* Изображение vput4.png ниже объекта vput3.png */}
      <div 
        className="absolute z-[5]"
        style={{
          top: 'clamp(262vh, 315vh, 288vh)',
          left: 'clamp(43rem, 53vw, 70rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/vput4.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(25rem, 38vw, 45rem)',
            height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение tabletki.png ниже vput4.png */}
      <div 
        className="absolute z-[5]"
        data-animate="vput"
        data-speed="0.8"
        style={{
          top: 'clamp(302vh, 365vh, 343vh)',
          left: 'clamp(50rem, 64vw, 83.875rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/tabletki.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(14rem, 19vw, 20rem)',
            height: 'clamp(10.5rem, 14.25vw, 15rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Маркер конца раздела для отслеживания скролла */}
      <div 
        ref={sectionEndRef}
        className="absolute left-0 w-full"
        style={{ 
          top: 'clamp(212.5vh, 282.5vh, 237.5vh)',
          height: '1px',
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}

