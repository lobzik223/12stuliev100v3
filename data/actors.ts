export interface Actor {
  id: number;
  name: string;
  role: string;
  image: string;
  fullName?: string;
  hasExtraContent?: boolean;
}

export const actors: Actor[] = [
  {
    id: 1,
    name: 'Гурам Баблишвили',
    role: 'Остап Бендер',
    image: '',
    hasExtraContent: false
  },
  {
    id: 2,
    name: 'Андрей Лебедев',
    role: 'Киса',
    image: '',
    hasExtraContent: false
  },
  {
    id: 3,
    name: 'Серафима Низовская',
    role: 'Бабищева',
    image: '',
    hasExtraContent: false
  },
  {
    id: 4,
    name: 'Петр Баранчеев',
    role: 'чиновник',
    image: '',
    hasExtraContent: false
  },
  {
    id: 5,
    name: 'Мария Шахнович',
    role: 'Анфиса',
    image: '',
    hasExtraContent: false
  },
  {
    id: 6,
    name: 'Александр Степанцов',
    role: 'Киса',
    image: '',
    hasExtraContent: false
  },
  {
    id: 7,
    name: 'Тимур Ефременков',
    role: 'владелец типографии',
    image: '',
    hasExtraContent: false
  }
];

