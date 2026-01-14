export interface FormOption {
  value: string;
  label: string;
}

export const sectionOptions: FormOption[] = [
  { value: 'Introducción', label: 'Introducción' },
  { value: 'Carrera temprana', label: 'Carrera temprana' },
  { value: 'Chappelle´s show', label: 'Chappelle´s show' },
  { value: 'El final del show', label: 'El final del show' },
  { value: 'El regreso', label: 'El regreso' },
  { value: 'Filmografia', label: 'Filmografia' },
  { value: 'Buddies (1996)', label: 'Buddies (1996)' }
];

export interface FavoriteSpecial {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
}

export const favoriteSpecials: FavoriteSpecial[] = [
  {
    id: 'the_age_of_spin',
    name: 'especiales_favoritos[]',
    value: 'the_age_of_spin',
    label: '"The Age of Spin"',
    checked: true
  },
  {
    id: 'equanimity',
    name: 'especiales_favoritos[]',
    value: 'equanimity',
    label: '"Equanimity"',
    checked: false
  },
  {
    id: 'the_bird_revelations',
    name: 'especiales_favoritos[]',
    value: 'the_bird_revelations',
    label: '"The Bird Revelations"',
    checked: true
  },
  {
    id: 'the_heart_of_texas',
    name: 'especiales_favoritos[]',
    value: 'the_heart_of_texas',
    label: '"Deep in the Heart of Texas"',
    checked: true
  }
];
