'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isProbablyMobile } from '../utils/device';

// Only register GSAP on client side
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

export default function JourneySection({ sectionEndRef, finalTextRef, officeRef, psychushkaRef, kisaRef, yaryginaRef }: JourneySectionProps) {
  const vputSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Client-side only rendering to prevent SSR/hydration mismatches
  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isProbablyMobile());
  }, []);

  // Mobile-only version - simple, no parallax, no 400vh containers
  const MobileJourney = () => {
    const scenes = [
      {
        key: 'office',
        title: 'ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»',
        desc: 'ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.',
        img: '/backgrounds/sections/vput.png',
      },
      {
        key: 'psy',
        title: 'ПСИХУШКА',
        desc: 'СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.',
        img: '/backgrounds/sections/vput2.png',
      },
      {
        key: 'kisa',
        title: 'КВАРТИРА КИСЫ',
        desc: 'ЛИЧНОЕ УБЕЖИЩЕ И ШТАБ ОПЕРАЦИИ, ГДЕ СТАЛКИВАЮТСЯ ЖАДНОСТЬ И СОВЕСТЬ.',
        img: '/backgrounds/sections/vput3.png',
      },
      {
        key: 'yarygina',
        title: 'КВАРТИРА СТАРУХИ ЯРЫГИНОЙ',
        desc: 'ФИНАЛ ОХОТЫ — ЛОГОВО «БАБКИ-ХАКЕРА», УПРАВЛЯЮЩЕЙ МИЛЛИАРДАМИ ИЗ КРЕСЛА.',
        img: '/backgrounds/sections/vput4.png',
      },
    ];

    return (
      <div
        className="relative w-full mobile-journey-section"
        style={{
          width: '100%',
          minHeight: 'auto',
          height: 'auto',
          backgroundImage: 'url(/backgrounds/sections/section-4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          padding: 'clamp(4rem, 8vh, 6rem) 4%',
          paddingBottom: 'clamp(6rem, 10vh, 8rem)',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
        }}
      >
        <div className="w-full max-w-[120rem] mx-auto flex flex-col items-center" style={{ gap: 'clamp(3rem, 8vh, 5rem)' }}>
          {scenes.map((s, idx) => (
            <div
              key={s.key}
              ref={idx === 0 ? officeRef : idx === 1 ? psychushkaRef : idx === 2 ? kisaRef : yaryginaRef}
              className="w-full flex flex-col items-center text-center mobile-scene-card"
              style={{ 
                maxWidth: 'min(90vw, 500px)',
                marginBottom: 'clamp(3rem, 6vh, 4rem)',
                paddingBottom: 'clamp(2rem, 4vh, 3rem)',
              }}
            >
              <div
                className="mobile-scene-image"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  height: 'clamp(200px, 35vh, 300px)',
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
                  display: 'block',
                  visibility: 'visible',
                }}
              />
              <div style={{ marginTop: 'clamp(0.75rem, 2vh, 1.25rem)', width: '100%', padding: '0 1rem' }}>
                <p
                  className="uppercase mb-2"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                    color: '#FFFDFD',
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    letterSpacing: '0.08em',
                    lineHeight: '1.3',
                    marginBottom: '1rem',
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                    color: '#FBC632',
                    textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                    letterSpacing: '0.03em',
                    lineHeight: '1.4',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile markers for scroll tracking */}
        <div ref={sectionEndRef} className="absolute left-0 w-full" style={{ bottom: 0, height: '1px', pointerEvents: 'none' }} />
        {finalTextRef && <div ref={finalTextRef} className="absolute left-0 w-full" style={{ bottom: '1px', height: '1px', pointerEvents: 'none' }} />}
      </div>
    );
  };

  // Desktop GSAP parallax effect - ONLY run when confirmed desktop
  useEffect(() => {
    // Guard: only run on desktop, only after client mount
    if (!isClient || isMobileDevice === null || isMobileDevice) return;
    
    // Additional safety check
    if (typeof window === 'undefined' || isProbablyMobile()) return;

    const cleanup: (() => void)[] = [];

    try {
      if (vputSectionRef.current) {
        const parallaxObjects = Array.from(vputSectionRef.current.querySelectorAll('[data-animate="vput"]'));
        const imageObjects = parallaxObjects.filter((el) => {
          const isText = el.textContent && el.textContent.trim().length > 0;
          return !isText;
        });

        imageObjects.forEach((el, index) => {
          const speedAttr = el.getAttribute('data-speed');
          const parallaxSpeed = speedAttr ? parseFloat(speedAttr) : 0.3;

          if (el instanceof HTMLElement) {
            el.style.willChange = 'transform';
            gsap.set(el, { force3D: true });
          }

          const direction = index % 2 === 0 ? -1 : 1;
          const parallaxAmount = parallaxSpeed * 100;

          const scrollTriggerInstance = gsap.to(el, {
            y: direction * parallaxAmount,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
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

          cleanup.push(() => {
            if (scrollTriggerInstance.scrollTrigger) {
              scrollTriggerInstance.scrollTrigger.kill();
            }
            scrollTriggerInstance.kill();
          });
        });
      }
    } catch (error) {
      console.error('GSAP ScrollTrigger error:', error);
    }

    return () => {
      cleanup.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger) {
          trigger.kill();
        }
      });
    };
  }, [isClient, isMobileDevice]);

  // Loading state - show nothing until we know device type
  if (!isClient || isMobileDevice === null) {
    return (
      <section className="relative w-full" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
        {/* Placeholder to prevent layout shift */}
      </section>
    );
  }

  // Mobile device - simple layout
  if (isMobileDevice) {
    return (
      <section 
        ref={vputSectionRef}
        className="relative w-full journey-section-container"
        style={{ width: '100%', marginTop: 0, paddingTop: 0 }}
      >
        <MobileJourney />
      </section>
    );
  }

  // Desktop device - complex parallax layout
  return (
    <section 
      ref={vputSectionRef}
      className="relative w-full journey-section-container"
      style={{ width: '100%', marginTop: 0, paddingTop: 0 }}
    >
      {/* Desktop composition - 400vh parallax version */}
      <div className="desktop-journey">
        {/* Background */}
        <div className="relative w-full z-0 journey-bg-wrapper" style={{ minHeight: '400vh', height: '400vh', width: '100%' }}>
          <div
            className="journey-bg-desktop"
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
              willChange: 'auto'
            }}
          />
        </div>

        {/* Office - vput.png */}
        <div 
          ref={officeRef}
          className="absolute z-[5]"
          style={{
            top: '-8vh',
            left: 'clamp(2rem, 4vw, 5rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/vput.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              width: 'clamp(25rem, 38vw, 45rem)',
              height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Tiraj.png */}
        <div 
          className="absolute z-[5]"
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

        {/* Flash.png */}
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

        {/* Office Text */}
        <div 
          className="absolute z-[5] text-center"
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
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4)',
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
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4)',
              letterSpacing: '0.05em',
              lineHeight: '1.2'
            }}
          >
            ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И<br />
            РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.
          </p>
        </div>

        {/* Continue with other desktop elements... */}
        {/* Psychushka - vput2.png */}
        <div 
          ref={psychushkaRef}
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

        {/* Kisa - vput3.png */}
        <div 
          ref={kisaRef}
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

        {/* Yarygina - vput4.png */}
        <div 
          ref={yaryginaRef}
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

        {/* Section end marker */}
        <div 
          ref={sectionEndRef}
          className="absolute left-0 w-full"
          style={{ 
            top: 'clamp(212.5vh, 282.5vh, 237.5vh)',
            height: '1px',
            pointerEvents: 'none'
          }}
        />
        {finalTextRef && (
          <div 
            ref={finalTextRef}
            className="absolute left-0 w-full"
            style={{ 
              top: 'clamp(325vh, 390vh, 350vh)',
              height: '1px',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </section>
  );
}
