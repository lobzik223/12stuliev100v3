'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isProbablyMobile } from '../utils/device';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JourneySectionProps {
  sectionEndRef: React.RefObject<HTMLDivElement>;
  finalTextRef?: React.RefObject<HTMLDivElement>;
  navPanelRef?: React.RefObject<HTMLDivElement>;
  officeRef?: React.RefObject<HTMLDivElement>;
  psychushkaRef?: React.RefObject<HTMLDivElement>;
  kisaRef?: React.RefObject<HTMLDivElement>;
  yaryginaRef?: React.RefObject<HTMLDivElement>;
}

// Cache-busting version для изображений vput
const VPUT_IMAGES_VERSION = '?v=2.0';

export default function JourneySection({ sectionEndRef, finalTextRef, officeRef, psychushkaRef, kisaRef, yaryginaRef }: JourneySectionProps) {
  const vputSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return isProbablyMobile();
  });

  // Мобильная версия: без absolute/parallax (на телефонах rem/clamp координаты уводят всё за экран).
  // ВАЖНО: рендерим mobile+desktop всегда, а показываем только нужное через CSS (md:hidden / hidden md:block + force-mobile),
  // чтобы даже при лаге/падении JS на iOS не было “пустого экрана”.
  const MobileJourney = () => {
    const scenes = [
      {
        key: 'office',
        title: 'ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»',
        desc: 'ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.',
        img: `/backgrounds/sections/vput.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'psy',
        title: 'ПСИХУШКА',
        desc: 'СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.',
        img: `/backgrounds/sections/vput2.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'kisa',
        title: 'КВАРТИРА КИСЫ',
        desc: 'ЛИЧНОЕ УБЕЖИЩЕ И ШТАБ ОПЕРАЦИИ, ГДЕ СТАЛКИВАЮТСЯ ЖАДНОСТЬ И СОВЕСТЬ.',
        img: `/backgrounds/sections/vput3.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'yarygina',
        title: 'КВАРТИРА СТАРУХИ ЯРЫГИНОЙ',
        desc: 'ФИНАЛ ОХОТЫ — ЛОГОВО «БАБКИ-ХАКЕРА», УПРАВЛЯЮЩЕЙ МИЛЛИАРДАМИ ИЗ КРЕСЛА.',
        img: `/backgrounds/sections/vput4.png${VPUT_IMAGES_VERSION}`,
      },
    ];

    return (
      <div
        className="md:hidden relative w-full"
        style={{
          width: '100%',
          backgroundImage: 'url(/backgrounds/sections/section-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: 'clamp(3rem, 6vh, 5rem) 4% clamp(4rem, 8vh, 6rem) 4%',
        }}
      >
        <div className="w-full max-w-[120rem] mx-auto flex flex-col items-center" style={{ gap: 'clamp(2.5rem, 6vh, 4.5rem)' }}>
          {scenes.map((s, idx) => (
            <div
              key={s.key}
              ref={idx === 0 ? officeRef : idx === 1 ? psychushkaRef : idx === 2 ? kisaRef : yaryginaRef}
              className="w-full flex flex-col items-center text-center"
              style={{ maxWidth: 'min(92vw, 560px)' }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/11',
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: 'drop-shadow(0 0 1.25rem rgba(0,0,0,0.55))',
                }}
              />
              <div style={{ marginTop: 'clamp(0.75rem, 2vh, 1.25rem)' }}>
                <p
                  className="uppercase mb-2"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1.05rem, 4.4vw, 1.35rem)',
                    color: '#FFFDFD',
                    filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                    textShadow: '0 0 0.9375rem rgba(0,0,0,0.65)',
                    letterSpacing: '0.08em',
                    lineHeight: '1.15',
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.95rem, 3.9vw, 1.15rem)',
                    color: '#FBC632',
                    filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                    textShadow: '0 0 0.9375rem rgba(0,0,0,0.55)',
                    letterSpacing: '0.03em',
                    lineHeight: '1.25',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Мобилка/iOS: отключаем GSAP-параллакс (часто ломает скролл/рендер и даёт “чёрные пустоты”).
    if (isProbablyMobile()) return;

    // GSAP параллакс для объектов в разделе "В ПУТЬ" (как на hlado.ru)
    if (vputSectionRef.current) {
      // Находим только объекты с изображениями (не тексты)
      const parallaxObjects = Array.from(vputSectionRef.current.querySelectorAll('[data-animate="vput"]'));
      
      // Фильтруем только объекты с изображениями (не тексты)
      const imageObjects = parallaxObjects.filter((el) => {
        const isText = el.textContent && el.textContent.trim().length > 0;
        return !isText;
      });
      
      imageObjects.forEach((el, index) => {
        // Получаем скорость из data-speed атрибута
        const speedAttr = el.getAttribute('data-speed');
        const parallaxSpeed = speedAttr ? parseFloat(speedAttr) : 0.3;
      
        // Применяем will-change для оптимизации GPU
        if (el instanceof HTMLElement) {
          el.style.willChange = 'transform';
          gsap.set(el, { force3D: true });
        }
        
        // Параллакс-движение как на hlado.ru
        // Разные скорости создают эффект глубины: ближайшие объекты двигаются быстрее, дальние - медленнее
        // Направление движения для разнообразия
        const direction = index % 2 === 0 ? -1 : 1;
        const parallaxAmount = parallaxSpeed * 100; // Амплитуда движения (100px максимум)
        
        // Параллакс по вертикали с разной скоростью
        // Используем подход как на hlado.ru - движение зависит от позиции скролла
        gsap.to(el, {
          y: direction * parallaxAmount,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el, // Триггер для каждого элемента отдельно
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Плавная привязка к скроллу
            refreshPriority: -1,
            onLeave: () => {
              if (el instanceof HTMLElement) {
                el.style.willChange = 'auto';
              }
            },
            onEnterBack: () => {
              if (el instanceof HTMLElement) {
                el.style.willChange = 'transform';
              }
            }
          }
        });
      });
    }

    return () => {
      // Очистка всех ScrollTrigger при размонтировании
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger) {
          trigger.kill();
        }
      });
    };
  }, []);
  return (
    <section 
      ref={vputSectionRef}
      className="relative w-full journey-section-container"
      style={{ width: '100%', marginTop: 0, paddingTop: 0 }}
    >
      <MobileJourney />

      {/* Desktop composition (как было) */}
      <div className="hidden md:block">
        {/* Фон раздела */}
        <div className="relative w-full z-0 journey-bg-wrapper" style={{ minHeight: '400vh', height: '400vh', width: '100%' }}>
          <div
            className="journey-bg-mobile"
            style={{
              backgroundImage: 'url(/backgrounds/sections/section-4.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              minHeight: '400vh',
              willChange: 'auto' // Оптимизация для браузера
            }}
          />
        </div>

      {/* Изображение vput.png поверх фона сверху */}
      <div 
        ref={officeRef}
        className="absolute z-[5] vput-element-mobile"
        style={{
          top: '-8vh',
          left: 'clamp(2rem, 4vw, 5rem)'
        }}
      >
        <div
          className="vput-inner-mobile"
          style={{
            backgroundImage: `url(/backgrounds/sections/vput.png${VPUT_IMAGES_VERSION})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            width: 'clamp(25rem, 38vw, 45rem)',
            height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Изображение tiraj.png */}
      <div 
        className="absolute z-[5] tiraj-desktop tiraj-element-mobile"
        data-animate="vput"
        data-speed="0.3"
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
        className="absolute z-[5] flash-desktop flash-mobile"
        data-animate="vput"
        data-speed="0.5"
        style={{
          top: 'clamp(18.5vh, 29vh, 39vh)', /* Поднято чуть выше на ПК версии */
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

      {/* Текст отдельно от flash.png */}
      <div 
        ref={officeRef}
        className="absolute z-[5] text-center office-text-desktop office-text-mobile"
        style={{
          top: 'clamp(55vh, 65vh, 75vh)',
          right: 'clamp(4rem, 6vw, 7rem)',
          paddingLeft: 'clamp(1rem, 2vw, 2rem)',
          paddingRight: 'clamp(1rem, 2vw, 2rem)',
          maxWidth: 'clamp(20rem, 40vw, 40rem)'
        }}
      >
        <p
          className="uppercase mb-2 office-title-mobile"
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
          className="office-description-mobile"
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
        className="absolute z-[5] stul100let-mobile"
        data-animate="vput"
        data-speed="0.4"
        style={{
          top: 'clamp(87vh, 105vh, 124vh)',
          left: 'clamp(0rem, 0.5vw, 3.125rem)'
        }}
      >
        <div
          className="stul100let-inner-mobile"
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
        ref={psychushkaRef}
        className="absolute z-[5] vput2-mobile"
        style={{
          top: 'clamp(85vh, 100vh, 120vh)',
          left: 'clamp(26rem, 34vw, 40rem)'
        }}
      >
        <div
          style={{
            backgroundImage: `url(/backgrounds/sections/vput2.png${VPUT_IMAGES_VERSION})`,
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
        className="absolute z-[5] analiz-mobile"
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
        className="absolute z-[5] text-center psychushka-text-mobile"
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
          {isMobileDevice ? (
            <>
              СИМВОЛ БЕЗУМИЯ ПРОГРЕССА —<br />
              ЗДЕСЬ<br />
              СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.
            </>
          ) : (
            <>
              СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ<br />
              СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.
            </>
          )}
        </p>
      </div>

      {/* Изображение pamat15.png слева от vput3.png */}
      <div 
        className="absolute z-[5] pamat15-mobile"
        data-animate="vput"
        data-speed="0.3"
        style={{
          top: 'clamp(175vh, 207.5vh, 200vh)',
          left: 'clamp(-2rem, 0vw, 3rem)'
        }}
      >
        <div
          style={{
            backgroundImage: 'url(/backgrounds/sections/pamat15.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 'clamp(28rem, 35vw, 35rem)',
            height: 'clamp(21rem, 26.25vw, 26.25rem)',
            maxWidth: '100%'
          }}
        />
      </div>

      {/* Текст "КВАРТИРА КИСЫ" ниже pamat15.png */}
      <div 
        className="absolute z-[5] text-center kvartira-kisy-mobile"
        style={{
          top: 'clamp(238vh, 272.5vh, 250vh)',
          left: 'clamp(6rem, 11vw, 21rem)',
          maxWidth: 'clamp(20rem, 32.5vw, 32.5rem)'
        }}
      >
        <p
          className="uppercase mb-4 kvartira-title-mobile"
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
          className="kvartira-description-mobile"
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
        className="absolute z-[5] computer-mobile"
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
        ref={kisaRef}
        className="absolute z-[5] vput3-mobile"
        style={{
          top: 'clamp(173vh, 206vh, 198vh)',
          left: 'clamp(50rem, 59vw, 66rem)'
        }}
      >
        <div
          style={{
            backgroundImage: `url(/backgrounds/sections/vput3.png${VPUT_IMAGES_VERSION})`,
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
        ref={finalTextRef}
        className="absolute z-[5] text-center yarygina-text-mobile"
        style={{
          top: 'clamp(325vh, 390vh, 350vh)',
          left: 'clamp(2rem, 5.75vw, 12rem)',
          maxWidth: 'clamp(20rem, 31.25vw, 43.75rem)'
        }}
      >
        <p
          className="uppercase mb-4 yarygina-title-mobile"
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
          className="yarygina-description-mobile"
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
        ref={yaryginaRef}
        className="absolute z-[5] vput4-mobile"
        style={{
          top: 'clamp(310vh, 370vh, 345vh)',
          left: 'clamp(43rem, 53vw, 70rem)'
        }}
      >
        <div
          style={{
            backgroundImage: `url(/backgrounds/sections/vput4.png${VPUT_IMAGES_VERSION})`,
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
          top: 'clamp(312vh, 375vh, 353vh)',
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
      </div>
      {/* Для мобилки: маркеры внизу секции, чтобы MainScreen логика не ломалась */}
      <div className="md:hidden">
        <div ref={sectionEndRef} className="absolute left-0 w-full" style={{ bottom: 0, height: '1px', pointerEvents: 'none' }} />
        <div ref={finalTextRef} className="absolute left-0 w-full" style={{ bottom: '1px', height: '1px', pointerEvents: 'none' }} />
      </div>
    </section>
  );
}

