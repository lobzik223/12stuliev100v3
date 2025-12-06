import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Стульев - 100 лет спустя",
  description: "Театральное путешествие Ильфа и Петрова",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="//s3.intickets.ru/interposed-frame.min.css" />
      </head>
      <body>
        {children}
        <Script 
          src="//s3.intickets.ru/interposed-frame.min.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

