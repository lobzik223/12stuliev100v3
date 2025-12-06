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
    name: 'Андрей Лебедев',
    role: 'Киса',
    image: '/actors/andrey-lebedev.jpg',
    hasExtraContent: false
  },
  {
    id: 2,
    name: 'ГУРАМ МИХАЙЛОВИЧ',
    fullName: 'БАБЛИШВИЛИ',
    role: 'Остап бендер',
    image: '/actors/guram-bablishvili.jpg',
    hasExtraContent: true
  },
  {
    id: 3,
    name: 'Мария Шахнович',
    role: 'Анфиса',
    image: '/actors/mariya-shakhnovich.jpg',
    hasExtraContent: false
  },
  {
    id: 4,
    name: 'Иван Петров',
    role: 'Воробьянинов',
    image: '/actors/ivan-petrov.jpg',
    hasExtraContent: false
  },
  {
    id: 5,
    name: 'Елена Смирнова',
    role: 'Эллочка',
    image: '/actors/elena-smirnova.jpg',
    hasExtraContent: false
  },
  {
    id: 6,
    name: 'Дмитрий Волков',
    role: 'Отец Фёдор',
    image: '/actors/dmitry-volkov.jpg',
    hasExtraContent: false
  },
  {
    id: 7,
    name: 'Александр Новиков',
    role: 'Эллочка-людоедка',
    image: '/actors/alexander-novikov.jpg',
    hasExtraContent: false
  },
  {
    id: 8,
    name: 'Сергей Морозов',
    role: 'Инженер Брунс',
    image: '/actors/sergey-morozov.jpg',
    hasExtraContent: false
  }
];

