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
    title: '12 стульев – Вологда',
    date: '16 Февраля',
    time: '19:00',
    location: 'ДК Подшипникового завода',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 2,
    title: '12 стульев – Нижний Новгород',
    date: '18 Февраля',
    time: '19:00',
    location: 'ДК Красное Сормово',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 3,
    title: '12 стульев – Липецк',
    date: '20 Февраля',
    time: '19:00',
    location: 'Областной центр культуры народного творчества и кино',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 4,
    title: '12 стульев – Старый Оскол',
    date: '21 Февраля',
    time: '18:00',
    location: 'Центр молодёжных инициатив',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 5,
    title: '12 стульев – Смоленск',
    date: '24 Февраля',
    time: '19:00',
    location: 'КЗ Губернский',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 6,
    title: '12 стульев – Великий Новгород',
    date: '26 Февраля',
    time: '19:00',
    location: 'КЦ Диалог',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 7,
    title: '12 стульев – Воронеж',
    date: '12 Марта',
    time: '19:00',
    location: 'Воронежский концертный зал',
    address: '',
    buyTicketUrl: ''
  },
  {
    id: 8,
    title: '12 стульев – Владимир',
    date: '13 Марта',
    time: '19:00',
    location: 'АРТ Холл',
    address: '',
    buyTicketUrl: ''
  }
];

