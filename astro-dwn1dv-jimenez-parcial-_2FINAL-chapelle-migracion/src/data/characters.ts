export interface Character {
  id: number;
  name: string;
  image: string;
  gif: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: 'Tron Carter',
    image: '/imagenes/tron_carter.jpg',
    gif: '/imagenes/gif/carter.gif',
    description: 'En esta mirada satirica al sistema de justicia penal. Como una parodia de "La ley y el orden", la parodia se teje a partir de las historias paralelas de Tron y un hombre blanco adinerado, ambos acusados de trafico de drogas y considerados de manera muy diferente por el sistema de justicia penal.'
  },
  {
    id: 2,
    name: 'Tyrone Biggums',
    image: '/imagenes/tyrone_biggums.jpg',
    gif: '/imagenes/gif/tyrone.gif',
    description: 'Chappelle interpreta a un adicto de voz chillona reconocido por sus labios blancos y llenos de ampollas y rascado constante. Su primera aparicion fue en el segundo episodio de la primera temporada.'
  },
  {
    id: 3,
    name: '"Silky" Johnson',
    image: '/imagenes/silky_johnson.jpg',
    gif: '/imagenes/gif/confused.gif',
    description: 'Un notorio enemigo de los jugadores, gano el ficticio "Hater of the year" dos veces (una de las cuales fue por llamar a una amenaza de bomba en las Olimpiadas Especiales).'
  },
  {
    id: 4,
    name: 'Chuck Taylor',
    image: '/imagenes/chuck_taylor.jpg',
    gif: '/imagenes/gif/taylor.gif',
    description: 'El presentador "blanco" principal en el ficticio programa de noticias "News 3".'
  },
  {
    id: 5,
    name: 'Leonard Washington',
    image: '/imagenes/leonard.jpg',
    gif: '/imagenes/gif/leonard.gif',
    description: 'Washington aparecio por primera vez en el sketch de la primera temporada "Trading Conyuges", en el que actuo como patriarca de una familia blanca durante un mes. En particular, al entrar en las habitaciones con lujos desconocidos para el.'
  },
  {
    id: 6,
    name: "Lil' Jon",
    image: '/imagenes/lil_jon.jpg',
    gif: '/imagenes/gif/lil_jon.gif',
    description: 'Chappelle hace una imitacion de Jonathan Smith, mas conocido como Lil Jon, es un rapero y productor estadounidense aparece por primera ves en el capitulo 7 de la primer temporada en su seccion de "a moment in the life of lil jon", uno de los personajes mas famosos del comediante.'
  }
];
