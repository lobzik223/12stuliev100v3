import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Стульев - 100 лет спустя",
  description: "Театральное путешествие Ильфа и Петрова",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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
        {/* Preload критических фоновых изображений для быстрой загрузки */}
        <link rel="preload" href="/backgrounds/sections/section-1.png" as="image" />
        <link rel="preload" href="/backgrounds/sections/section-3.png" as="image" />
        <link rel="preload" href="/backgrounds/sections/section-4.png" as="image" />
        <link rel="preload" href="/photo/section-34839282.png" as="image" />
        <link rel="preload" href="/backgrounds/sections/logo100let.png" as="image" />
      </head>
      <body>
        {children}
        <Script 
          src="//s3.intickets.ru/interposed-frame.min.js" 
          strategy="afterInteractive"
          onError={(e) => {
            console.error('Ошибка загрузки скрипта intickets:', e);
          }}
          onLoad={() => {
            console.log('Скрипт intickets загружен');
          }}
        />
      </body>
    </html>
  );
}

