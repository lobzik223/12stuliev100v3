import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Стульев - 100 лет спустя",
  description: "Театральное путешествие Ильфа и Петрова",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="stylesheet" href="//s3.intickets.ru/interposed-frame.min.css" />
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
        <link rel="preload" href="/backgrounds/sections/vput.png" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput2.png" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput3.png" as="image" type="image/png" />
        <link rel="preload" href="/backgrounds/sections/vput4.png" as="image" type="image/png" />
      </head>
      <body>
        {children}
        <Script 
          src="//s3.intickets.ru/interposed-frame.min.js" 
          strategy="afterInteractive"
          onError={(e) => {
            console.warn('Failed to load interposed-frame script:', e);
          }}
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

