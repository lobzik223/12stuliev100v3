import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./mobile-safe.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import DebugConsole from "@/components/DebugConsole";

export const metadata: Metadata = {
  title: "12 Стульев - 100 лет спустя",
  description: "Театральное путешествие Ильфа и Петрова",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* ВАЖНО: meta viewport генерируется Next.js из export const viewport выше.
            Дублировать <meta name="viewport"> вручную нельзя — на iOS это часто ломает масштаб/брейкпоинты. */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="stylesheet" href="//s3.intickets.ru/interposed-frame.min.css" />
        {/* iOS/Safari иногда отдаёт viewport как “десктопный”, из-за чего ломаются брейкпоинты.
            Ставим класс force-mobile ДО гидрации, чтобы CSS сразу применился корректно. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var docEl = document.documentElement;
                  var coarse = false;
                  try {
                    coarse = (window.matchMedia && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches)) || false;
                  } catch (e) {}
                  var touch = (navigator && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) || false;
                  var vv = window.visualViewport && window.visualViewport.width;
                  var vw = (typeof vv === 'number' && vv > 0) ? vv : window.innerWidth;
                  var sw = (window.screen && window.screen.width) ? window.screen.width : vw;
                  var eff = Math.min(vw, sw);
                  if (coarse || touch || eff < 768) {
                    docEl.classList.add('force-mobile');
                  }

                  // Mobile viewport-height fix:
                  // Real mobile browsers change visible viewport height during scroll (address bar collapse/expand).
                  // We store the *visible* height (visualViewport.height when available) in CSS var --vvh.
                  function setVvh() {
                    try {
                      var vvh = (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : window.innerHeight;
                      if (typeof vvh === 'number' && vvh > 0) {
                        docEl.style.setProperty('--vvh', (vvh * 0.01) + 'px');
                      }
                    } catch (e) {}
                  }

                  // Only needed for real mobile/touch devices.
                  if (docEl.classList.contains('force-mobile')) {
                    setVvh();
                    try {
                      window.addEventListener('resize', setVvh, { passive: true });
                    } catch (e) {
                      window.addEventListener('resize', setVvh);
                    }
                    if (window.visualViewport) {
                      try {
                        window.visualViewport.addEventListener('resize', setVvh, { passive: true });
                        window.visualViewport.addEventListener('scroll', setVvh, { passive: true });
                      } catch (e) {
                        window.visualViewport.addEventListener('resize', setVvh);
                        window.visualViewport.addEventListener('scroll', setVvh);
                      }
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Preconnect для быстрой загрузки ресурсов */}
        <link rel="preconnect" href="https://12stuliev100v4.vercel.app" />
        <link rel="dns-prefetch" href="https://12stuliev100v4.vercel.app" />
        {/* Preload критических фоновых изображений для быстрой загрузки на мобильных */}
        <link rel="preload" href="/backgrounds/sections/section-1.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/backgrounds/sections/section-2.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/backgrounds/sections/section-3.png" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/section-4.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/backgrounds/sections/logo100let.png" as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href="/backgrounds/sections/plitkanovosti.png" as="image" type="image/png" />
        {/* Preload критических изображений для JourneySection */}
        <link rel="preload" href="/backgrounds/sections/vput.png?v=2.0" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput2.png?v=2.0" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput3.png?v=2.0" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput4.png?v=2.0" as="image" type="image/png" />
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <DebugConsole />
        <Script 
          src="//s3.intickets.ru/interposed-frame.min.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="/mobile-diagnostic.js" 
          strategy="afterInteractive"
        />
        {/* Инициализация клиентских скриптов после загрузки DOM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Функция инициализации
                function initApp() {
                  // Триггерим событие для инициализации клиентских компонентов
                  window.dispatchEvent(new Event('app-ready'));
                  
                  // Принудительно загружаем критические изображения
                  const criticalImages = [
                    '/backgrounds/sections/section-1.png',
                    '/backgrounds/sections/section-2.png',
                    '/backgrounds/sections/section-3.png',
                    '/backgrounds/sections/section-4.png',
                    '/backgrounds/sections/logo100let.png',
                    '/backgrounds/sections/plitkanovosti.png'
                  ];
                  
                  criticalImages.forEach(src => {
                    const img = new Image();
                    img.src = src;
                  });
                  
                  // MOBILE FIX: Блокируем изменения стилей hero-section-bg при скролле
                  // (убираем zoom анимацию фона на главном экране)
                  try {
                    var isMobile = window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
                    if (isMobile) {
                      // Ждем появления hero-section-bg в DOM
                      var checkHeroBg = function() {
                        var heroBg = document.querySelector('.hero-section-bg');
                        if (!heroBg) {
                          setTimeout(checkHeroBg, 100);
                          return;
                        }
                        
                        // Сохраняем начальный размер viewport для фиксации background-size
                        var initialVw = window.innerWidth;
                        var initialVh = window.innerHeight || (window.visualViewport && window.visualViewport.height) || window.innerHeight;
                        
                        // Фиксируем background-size на основе начального viewport
                        var fixedBgSize = initialVw + 'px ' + initialVh + 'px';
                        heroBg.style.backgroundSize = fixedBgSize;
                        heroBg.style.backgroundPosition = '70% center';
                        heroBg.style.transform = 'none';
                        heroBg.style.webkitTransform = 'none';
                        
                        // Блокируем изменения через MutationObserver
                        var observer = new MutationObserver(function(mutations) {
                          mutations.forEach(function(mutation) {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                              var el = mutation.target;
                              if (el.classList && el.classList.contains('hero-section-bg')) {
                                // Восстанавливаем фиксированные значения
                                el.style.backgroundSize = fixedBgSize;
                                el.style.backgroundPosition = '70% center';
                                el.style.transform = 'none';
                                el.style.webkitTransform = 'none';
                              }
                            }
                          });
                        });
                        
                        observer.observe(heroBg, { attributes: true, attributeFilter: ['style'] });
                        
                        // Также блокируем изменения при каждом скролле/resize
                        var lockStyles = function() {
                          if (heroBg) {
                            heroBg.style.backgroundSize = fixedBgSize;
                            heroBg.style.backgroundPosition = '70% center';
                            heroBg.style.transform = 'none';
                            heroBg.style.webkitTransform = 'none';
                          }
                        };
                        
                        window.addEventListener('scroll', lockStyles, { passive: true });
                        window.addEventListener('resize', lockStyles, { passive: true });
                        if (window.visualViewport) {
                          window.visualViewport.addEventListener('resize', lockStyles, { passive: true });
                          window.visualViewport.addEventListener('scroll', lockStyles, { passive: true });
                        }
                      };
                      
                      // Запускаем проверку после небольшой задержки
                      setTimeout(checkHeroBg, 300);
                    }
                  } catch (e) {
                    console.warn('Hero background lock failed:', e);
                  }
                }
                
                // Гарантируем что DOM полностью загружен
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initApp);
                } else {
                  // DOM уже загружен, но ждем немного для гарантии
                  setTimeout(initApp, 100);
                }
                
                // Также инициализируем после полной загрузки всех ресурсов
                window.addEventListener('load', function() {
                  setTimeout(initApp, 200);
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

