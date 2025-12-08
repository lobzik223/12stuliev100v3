'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import DetailsView from '@/components/details/DetailsView';
import { events } from '@/data/events';
import { scheduleItems } from '@/data/schedule';

// Функция для извлечения города из location и склонения
const getCityInPrepositionalCase = (location: string): string => {
  // Извлекаем город из строки вида "ОКТЯБРЯ | КУРСК" или "Театр драмы, ул. Ленина,"
  const parts = location.split('|');
  if (parts.length > 1) {
    const city = parts[1].trim();
    // Склонение городов в предложный падеж
    const cityMap: { [key: string]: string } = {
      'КУРСК': 'Курске',
      'МОСКВА': 'Москве',
      'НИЖНИЙ НОВГОРОД': 'Нижнем Новгороде',
      'Курск': 'Курске',
      'Москва': 'Москве',
      'Нижний Новгород': 'Нижнем Новгороде',
    };
    return cityMap[city] || city;
  }
  
  // Если формат другой, пытаемся найти город в строке
  const cityMatch = location.match(/(Москва|Курск|Нижний Новгород|МОСКВА|КУРСК|НИЖНИЙ НОВГОРОД)/i);
  if (cityMatch) {
    const city = cityMatch[1];
    const cityMap: { [key: string]: string } = {
      'КУРСК': 'Курске',
      'МОСКВА': 'Москве',
      'НИЖНИЙ НОВГОРОД': 'Нижнем Новгороде',
      'Курск': 'Курске',
      'Москва': 'Москве',
      'Нижний Новгород': 'Нижнем Новгороде',
    };
    return cityMap[city] || city;
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

  // Ищем событие в events
  let event = events.find(e => e.id === id);
  let scheduleItem = null;
  let isFromEvents = true;
  
  // Если не найдено в events, ищем в schedule
  if (!event && id) {
    scheduleItem = scheduleItems.find(s => s.id === id);
    if (scheduleItem) {
      isFromEvents = false;
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

  if (isFromEvents && event) {
    city = getCityInPrepositionalCase(event.location);
    dateTime = formatDateTime(event.date, event.location, event.time);
    buyTicketUrl = event.buyTicketUrl;
  } else if (scheduleItem) {
    // Для schedule нужно определить город из title или location
    // По умолчанию все события в schedule - Москва
    city = 'Москве';
    dateTime = formatDateTime(scheduleItem.date, undefined, scheduleItem.time);
    buyTicketUrl = scheduleItem.buyTicketUrl;
  }

  return (
    <DetailsView 
      city={city}
      dateTime={dateTime}
      buyTicketUrl={buyTicketUrl}
    />
  );
};

export default DetailsPage;

