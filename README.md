# 12 Стульев - 100 лет спустя

Театральное путешествие Ильфа и Петрова

## Технологии

- Next.js 14 (App Router)
- TypeScript
- React 18
- Tailwind CSS
- GSAP (анимации)

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

```bash
npm run build
```

## Запуск продакшен версии

```bash
npm start
```

## Деплой на Vercel

Проект готов к деплою на Vercel без дополнительных настроек:

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит Next.js проект
3. Деплой произойдет автоматически

## Структура проекта

```
12Stuliev100let2v/
├── app/
│   ├── globals.css       # Глобальные стили
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── components/
│   ├── Header.tsx        # Шапка сайта
│   ├── MainScreen.tsx    # Основной компонент страницы
│   ├── sections/         # Секции страницы
│   │   ├── HeroSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── JourneySection.tsx
│   │   ├── ActorsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── ScheduleSection.tsx
│   │   ├── ContactsSection.tsx
│   │   └── SecondaryNav.tsx
│   └── ui/               # UI компоненты
│       ├── TypingText.tsx
│       ├── ScrollReveal.tsx
│       ├── CounterAnimation.tsx
│       └── BackgroundImage.tsx
├── public/
│   └── backgrounds/      # Изображения
└── ...
```

## Особенности

- Полностью адаптивный дизайн (responsive)
- Использование относительных единиц (rem, vw, vh, %)
- Анимации при скролле
- Оптимизация производительности

