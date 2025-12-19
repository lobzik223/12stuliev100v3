export interface Event {
  id: number;
  date: string;
  location: string;
  title: string;
  ticketsLeft: number;
  time?: string;
  buyTicketUrl?: string;
}

export const events: Event[] = [
  {
    id: 1,
    date: '16',
    location: 'ФЕВРАЛЯ | ВОЛОГДА',
    title: '12 СТУЛЬЕВ',
    ticketsLeft: 15,
    time: '19:00',
    buyTicketUrl: 'https://iframeab-pre10068.intickets.ru/seance/68855887'
  },
  {
    id: 2,
    date: '28',
    location: 'ФЕВРАЛЯ | БРЯНСК',
    title: '12 СТУЛЬЕВ',
    ticketsLeft: 0,
    time: '20:00',
    buyTicketUrl: 'https://iframeab-pre11010.intickets.ru/event/68662267/'
  },
  {
    id: 3,
    date: '20',
    location: 'ФЕВРАЛЯ | ЛИПЕЦК',
    title: '12 СТУЛЬЕВ',
    ticketsLeft: 44,
    time: '19:30',
    buyTicketUrl: 'https://iframeab-pre10068.intickets.ru/seance/68733630'
  }
];

