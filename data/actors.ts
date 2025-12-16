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
    image: '/photo/Fotoset-6 (1).jpg',
    hasExtraContent: false
  },
  {
    id: 2,
    name: 'Андрей Лебедев',
    role: 'Киса',
    image: '/photo/Fotoset-107 (1).JPG',
    hasExtraContent: false
  },
  {
    id: 3,
    name: 'Серафима Низовская',
    role: 'Бабищева',
    image: '/photo/Fotoset-198.jpg',
    hasExtraContent: false
  },
  {
    id: 4,
    name: 'Петр Баранчеев',
    role: 'чиновник',
    image: '/photo/Fotoset-172.jpg',
    hasExtraContent: false
  },
  {
    id: 5,
    name: 'Мария Шахнович',
    role: 'Анфиса',
    image: '/photo/Fotoset-94.jpg',
    hasExtraContent: false
  },
  {
    id: 6,
    name: 'Александр Степанцов',
    role: 'Киса',
    image: '/backgrounds/sections/IMG_6223а.jpg',
    hasExtraContent: false
  },
  {
    id: 7,
    name: 'Тимур Ефременков',
    role: 'владелец типографии',
    image: '/photo/IMG_20250610_023201_918.jpg',
    hasExtraContent: false
  }
];

