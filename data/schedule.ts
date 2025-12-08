export interface ScheduleItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  buyTicketUrl?: string;
}

export const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    title: '12 стульев – Курск',
    date: '15 ноября',
    time: '22:00',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 2,
    title: '12 стульев – Москва',
    date: '18 ноября',
    time: '19:30',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 3,
    title: '12 стульев – Москва',
    date: '22 ноября',
    time: '20:00',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 4,
    title: '12 стульев – Москва',
    date: '25 ноября',
    time: '21:00',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 5,
    title: '12 стульев – Москва',
    date: '28 ноября',
    time: '19:00',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 6,
    title: '12 стульев – Москва',
    date: '2 декабря',
    time: '20:30',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 7,
    title: '12 стульев – Москва',
    date: '5 декабря',
    time: '22:00',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 8,
    title: '12 стульев – Москва',
    date: '8 декабря',
    time: '19:30',
    location: 'Театр драмы, ул. Ленина,',
    address: '23',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  }
];

