'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import DetailsView from '@/components/details/DetailsView';
import { events } from '@/data/events';
import { scheduleItems } from '@/data/schedule';

// Функция для склонения городов в предложный падеж
const getCityInPrepositionalCase = (cityName: string): string => {
  const cityMap: { [key: string]: string } = {
    'ВОЛОГДА': 'Вологде',
    'Вологда': 'Вологде',
    'БРЯНСК': 'Брянске',
    'Брянск': 'Брянске',
    'ЛИПЕЦК': 'Липецке',
    'Липецк': 'Липецке',
    'СТАРЫЙ ОСКОЛ': 'Старом Осколе',
    'Старый Оскол': 'Старом Осколе',
    'СМОЛЕНСК': 'Смоленске',
    'Смоленск': 'Смоленске',
    'ВЕЛИКИЙ НОВГОРОД': 'Великом Новгороде',
    'Великий Новгород': 'Великом Новгороде',
    'ВОРОНЕЖ': 'Воронеже',
    'Воронеж': 'Воронеже',
    'ВЛАДИМИР': 'Владимире',
    'Владимир': 'Владимире',
  };
  
  // Нормализуем название города (убираем лишние пробелы, приводим к нужному регистру)
  const normalizedCity = cityName.trim();
  return cityMap[normalizedCity] || normalizedCity;
};

// Функция для извлечения города из location (для events)
const getCityFromLocation = (location: string): string => {
  // Извлекаем город из строки вида "ОКТЯБРЯ | ВОЛОГДА" или "Театр драмы, ул. Ленина,"
  const parts = location.split('|');
  if (parts.length > 1) {
    const city = parts[1].trim();
    return getCityInPrepositionalCase(city);
  }
  
  // Если формат другой, пытаемся найти город в строке
  const cityMatch = location.match(/(Вологда|ВОЛОГДА|Брянск|БРЯНСК|Липецк|ЛИПЕЦК|Старый Оскол|СТАРЫЙ ОСКОЛ|Смоленск|СМОЛЕНСК|Великий Новгород|ВЕЛИКИЙ НОВГОРОД|Воронеж|ВОРОНЕЖ|Владимир|ВЛАДИМИР)/i);
  if (cityMatch) {
    return getCityInPrepositionalCase(cityMatch[1]);
  }
  
  return 'городе';
};

// Функция для извлечения города из title (для schedule)
const getCityFromTitle = (title: string): string => {
  // Формат: "12 стульев – [Город]"
  const match = title.match(/12 стульев – (.+)/);
  if (match && match[1]) {
    return getCityInPrepositionalCase(match[1].trim());
  }
  return 'городе';
};

// PRODUCTION FIX: Функция для форматирования даты и времени с выделением цифр
// Унифицированный формат для всех городов: "22 ОКТЯБРЯ | 19:00"
const formatDateTime = (date: string, location?: string, time?: string): { __html: string } => {
  let result = '';
  
  // Для events: date = "22", location = "ОКТЯБРЯ | ВОЛОГДА", time = "19:00"
  if (location && location.includes('|')) {
    const monthPart = location.split('|')[0].trim();
    const dateStr = `${date} ${monthPart}`.toUpperCase();
    // Если есть время, добавляем его
    if (time) {
      result = `${dateStr} | ${time}`;
    } else {
      result = dateStr;
    }
  } else if (time) {
    // Для schedule: date = "16 Февраля", time = "19:00"
    // Преобразуем в единый формат: "16 ФЕВРАЛЯ | 19:00"
    // Извлекаем число и месяц из строки вида "16 Февраля" или "16 февраля"
    const dateMatch = date.match(/(\d+)\s+([а-яёА-ЯЁ]+)/i);
    if (dateMatch) {
      const day = dateMatch[1];
      const month = dateMatch[2].toUpperCase();
      result = `${day} ${month} | ${time}`;
    } else {
      // Если формат не распознан, просто делаем uppercase и добавляем время
      result = `${date.toUpperCase()} | ${time}`;
    }
  } else {
    // Если нет времени, просто форматируем дату
    const dateMatch = date.match(/(\d+)\s+([а-яёА-ЯЁ]+)/i);
    if (dateMatch) {
      const day = dateMatch[1];
      const month = dateMatch[2].toUpperCase();
      result = `${day} ${month}`;
    } else {
      result = date.toUpperCase();
    }
  }
  
  // PRODUCTION FIX: Обертываем все цифры в span с классом для увеличения размера
  // Это гарантирует, что все цифры (и в дате, и во времени) будут одинакового размера
  // Используем глобальную замену для всех цифр в строке
  const html = result.replace(/(\d+)/g, '<span class="date-time-number">$1</span>');
  
  return { __html: html };
};

const DetailsPage: React.FC = () => {
  // Безопасное получение params с проверкой на мобильных устройствах
  const params = useParams();
  const [id, setId] = React.useState<number | null>(null);
  const [isClient, setIsClient] = React.useState(false);

  // Убеждаемся что мы на клиенте перед использованием params
  React.useEffect(() => {
    setIsClient(true);
    if (params?.id) {
      const parsedId = parseInt(params.id as string, 10);
      if (!isNaN(parsedId)) {
        setId(parsedId);
      }
    }
  }, [params]);

  // Показываем загрузку пока не определили id на клиенте
  if (!isClient || id === null) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Загрузка...</div>
      </div>
    );
  }

  // PRODUCTION FIX: Ищем данные в обоих источниках и используем правильные данные
  // Сначала ищем в scheduleItems (приоритет для расписания спектаклей)
  let scheduleItem = id ? scheduleItems.find(s => s.id === id) : null;
  // Также ищем в events для проверки и синхронизации данных
  let event = id ? events.find(e => e.id === id) : null;
  
  // Если найдено в обоих источниках, используем scheduleItems как основной источник
  // но проверяем, что данные синхронизированы
  if (!scheduleItem && !event) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Событие не найдено</div>
      </div>
    );
  }

  // PRODUCTION FIX: Извлекаем данные с правильным приоритетом
  let city = 'городе';
  let dateTime: string | { __html: string } | undefined = undefined;
  let buyTicketUrl: string | undefined;
  let address: string | undefined;

  // Приоритет: scheduleItems > events
  if (scheduleItem) {
    // Для schedule извлекаем все данные строго из scheduleItem
    city = getCityFromTitle(scheduleItem.title);
    dateTime = formatDateTime(scheduleItem.date, undefined, scheduleItem.time);
    buyTicketUrl = scheduleItem.buyTicketUrl || undefined;
    // Формируем адрес из location и address (если address не пустой)
    address = scheduleItem.location + (scheduleItem.address ? ' ' + scheduleItem.address : '');
  } else if (event) {
    // Для events извлекаем данные из event
    city = getCityFromLocation(event.location);
    dateTime = formatDateTime(event.date, event.location, event.time);
    buyTicketUrl = event.buyTicketUrl || undefined;
    // Для events адрес формируется из location
    address = event.location;
  }

  return (
    <DetailsView 
      city={city}
      dateTime={dateTime}
      buyTicketUrl={buyTicketUrl}
      address={address}
    />
  );
};

export default DetailsPage;

