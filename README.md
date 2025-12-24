# 12 Стульев - 100 лет спустя

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

