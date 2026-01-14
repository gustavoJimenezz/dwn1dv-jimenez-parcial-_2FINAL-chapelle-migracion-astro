export interface NavLink {
  id: number;
  href: string;
  label: string;
  section: string;
}

export const navLinks: NavLink[] = [
  { id: 1, href: '/', label: 'Introduccion', section: 'sec_1' },
  { id: 2, href: '/carrera-temprana', label: 'Carrera temprana', section: 'sec_2' },
  { id: 3, href: '/chapelle-show', label: "Chappelle's Show", section: 'sec_3' },
  { id: 4, href: '/el-final-del-show', label: 'El final del show', section: 'sec_4' },
  { id: 5, href: '/el-regreso', label: 'El regreso', section: 'sec_5' },
  { id: 6, href: '/filmografia', label: 'Filmografia', section: 'sec_6' },
  { id: 7, href: '/buddies', label: 'Buddies', section: 'sec_7' },
  { id: 8, href: '/suscripcion', label: 'Suscripcion', section: 'sec_8' }
];
