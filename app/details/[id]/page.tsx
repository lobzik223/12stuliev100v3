'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import DetailsView from '@/components/details/DetailsView';
import { events } from '@/data/events';
import { scheduleItems } from '@/data/schedule';

// Функция для склонения городов в предложный падеж
const getCityInPrepositionalCase = (cityName: string): string => {
  const cityMap: { [key: string]: string } = {
    'КУРСК': 'Курске',
    'МОСКВА': 'Москве',
    'НИЖНИЙ НОВГОРОД': 'Нижнем Новгороде',
    'Курск': 'Курске',
    'Москва': 'Москве',
    'Нижний Новгород': 'Нижнем Новгороде',
    'ВОЛОГДА': 'Вологде',
    'Вологда': 'Вологде',
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
  // Извлекаем город из строки вида "ОКТЯБРЯ | КУРСК" или "Театр драмы, ул. Ленина,"
  const parts = location.split('|');
  if (parts.length > 1) {
    const city = parts[1].trim();
    return getCityInPrepositionalCase(city);
  }
  
  // Если формат другой, пытаемся найти город в строке
  const cityMatch = location.match(/(Москва|Курск|Нижний Новгород|МОСКВА|КУРСК|НИЖНИЙ НОВГОРОД|Вологда|ВОЛОГДА|Липецк|ЛИПЕЦК|Старый Оскол|СТАРЫЙ ОСКОЛ|Смоленск|СМОЛЕНСК|Великий Новгород|ВЕЛИКИЙ НОВГОРОД|Воронеж|ВОРОНЕЖ|Владимир|ВЛАДИМИР)/i);
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

// Функция для форматирования даты и времени с выделением цифр
// Унифицированный формат для всех городов: "22 ОКТЯБРЯ | 19:00"
const formatDateTime = (date: string, location?: string, time?: string): { __html: string } => {
  let result = '';
  
  // Для events: date = "22", location = "ОКТЯБРЯ | КУРСК", time = "19:00"
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
    // Для schedule: date = "15 ноября", time = "22:00"
    // Преобразуем в единый формат: "15 НОЯБРЯ | 22:00"
    // Извлекаем число и месяц из строки вида "15 ноября"
    const dateMatch = date.match(/(\d+)\s+([а-яё]+)/i);
    if (dateMatch) {
      const day = dateMatch[1];
      const month = dateMatch[2].toUpperCase();
      result = `${day} ${month} | ${time}`;
    } else {
      // Если формат не распознан, просто делаем uppercase
      result = `${date.toUpperCase()} | ${time}`;
    }
  } else {
    result = date.toUpperCase();
  }
  
  // Обертываем все цифры в span с классом для увеличения размера
  // Это гарантирует, что все цифры (и в дате, и во времени) будут одинакового размера
  // Используем глобальную замену для всех цифр в строке
  const html = result.replace(/(\d+)/g, '<span class="date-time-number">$1</span>');
  
  return { __html: html };
};

const DetailsPage: React.FC = () => {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string, 10) : null;

  // Сначала ищем в scheduleItems (приоритет для расписания спектаклей)
  // Это гарантирует, что при клике "Подробнее" в SchedulePage откроется правильная карточка
  let scheduleItem = id ? scheduleItems.find(s => s.id === id) : null;
  let event = null;
  let isFromEvents = false;
  
  // Если не найдено в scheduleItems, ищем в events (для обратной совместимости)
  if (!scheduleItem && id) {
    event = events.find(e => e.id === id);
    if (event) {
      isFromEvents = true;
    }
  }

  if (!event && !scheduleItem) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
        Событие не найдено
      </div>
    );
  }

  // Извлекаем город и форматируем дату/время
  let city = 'городе';
  let dateTime: string | { __html: string } | undefined = undefined;
  let buyTicketUrl: string | undefined;
  let address: string | undefined;

  if (isFromEvents && event) {
    city = getCityFromLocation(event.location);
    dateTime = formatDateTime(event.date, event.location, event.time);
    buyTicketUrl = event.buyTicketUrl;
    // Для events адрес формируется из location
    address = event.location;
  } else if (scheduleItem) {
    // Для schedule извлекаем все данные строго из scheduleItem
    city = getCityFromTitle(scheduleItem.title);
    dateTime = formatDateTime(scheduleItem.date, undefined, scheduleItem.time);
    buyTicketUrl = scheduleItem.buyTicketUrl;
    // Формируем адрес из location и address (если address не пустой)
    address = scheduleItem.location + (scheduleItem.address ? ' ' + scheduleItem.address : '');
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

