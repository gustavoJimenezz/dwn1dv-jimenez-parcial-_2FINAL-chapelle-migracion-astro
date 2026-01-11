import type { ImageMetadata } from 'astro';

// Importar imágenes desde assets
import robinHoodImg from '../assets/imagenes/robin_hood_dave.jpg';
import profesorChifladoImg from '../assets/imagenes/el_profesor_chiflado_dave.jpg';
import conAirImg from '../assets/imagenes/con_air_dave.jpg';
import medioFlipadoImg from '../assets/imagenes/medio_flipado_dave.jpg';
import tienenEmailImg from '../assets/imagenes/tienen_un_email_dave.jpg';
import ladronPoliciaImg from '../assets/imagenes/de_ladron_a_policia_dave.jpg';
import hermanoEncubiertoImg from '../assets/imagenes/hermano_en_cubierto.jpg';
import blockPartyImg from '../assets/imagenes/dave_block_pelicula.jpg';

// Definición de tipos para películas de la filmografía
export interface Movie {
  id: number;
  title: string;
  year: string;
  image: ImageMetadata;
  url: string;
  description: string;
}

// Lista de películas de Dave Chappelle
export const movies: Movie[] = [
  {
    id: 1,
    title: 'Las locas, locas aventuras de Robin Hood',
    year: '1993',
    image: robinHoodImg,
    url: 'https://es.wikipedia.org/wiki/Robin_Hood:_Men_in_Tights',
    description: 'Es una película de 1993 dirigida por Mel Brooks, que retoma la fábula de Robin Hood en forma de comedia. Las bases de la leyenda se mantienen iguales, pero implementa nuevos elementos y personajes a fin de hacer una película al estilo humorístico del director parodiando las películas más famosas que se han hecho sobre este personaje, especialmente la versión protagonizada por Errol Flynn y la versión de 1991 con Kevin Costner.'
  },
  {
    id: 2,
    title: 'El Profesor chiflado',
    year: '1996',
    image: profesorChifladoImg,
    url: 'https://es.wikipedia.org/wiki/El_profesor_chiflado_(pel%C3%ADcula_de_1996)',
    description: 'Una película estadounidense de comedia y ciencia ficción de 1996, dirigida por Tom Shadyac. Se trata de un remake de la película homónima de 1963 producida, escrita, dirigida y protagonizada por Jerry Lewis, que a su vez es una parodia de la novela El extraño caso del Dr. Jekyll y el Sr. Hyde de Robert Louis Stevenson.'
  },
  {
    id: 3,
    title: 'Con Air',
    year: '1997',
    image: conAirImg,
    url: 'https://es.wikipedia.org/wiki/Con_Air',
    description: 'Una película de acción estadounidense de 1997 protagonizada por Nicolas Cage, John Cusack y John Malkovich. Fue escrita por Scott Rosenberg, producida por Jerry Bruckheimer y dirigida por Simon West. La película transcurre sobre un avión que transporta prisioneros, en el que no será un vuelo normal. Fue nominada en dos categorías para los premios Óscar, por Mejor canción y Mejor sonido.'
  },
  {
    id: 4,
    title: 'Medio flipado',
    year: '1998',
    image: medioFlipadoImg,
    url: 'https://es.wikipedia.org/wiki/Medio_flipado',
    description: 'Una película de comedia de 1998 protagonizada por Dave Chappelle, Jim Breuer, Harland Williams y Guillermo Díaz. La película estuvo dirigida por Tamra Davis, y coescrita por la estrella Dave Chappelle y Neal Brennan.'
  },
  {
    id: 5,
    title: 'Tienes un e-m@il',
    year: '1998',
    image: tienenEmailImg,
    url: 'https://es.wikipedia.org/wiki/You%27ve_Got_Mail',
    description: 'Una película perteneciente al género de la comedia romántica, dirigida por Nora Ephron y estrenada en 1998.'
  },
  {
    id: 6,
    title: 'De ladron a policia',
    year: '1999',
    image: ladronPoliciaImg,
    url: 'https://es.wikipedia.org/wiki/De_ladr%C3%B3n_a_polic%C3%ADa',
    description: 'Película de comedia lanzada en septiembre de 1999 con Martin Lawrence y Luke Wilson. La película cuenta con un reparto adicional de Dave Chappelle, William Forsythe, Nicole Ari Parker, entre otros.'
  },
  {
    id: 7,
    title: 'El hermano encubierto',
    year: '2002',
    image: hermanoEncubiertoImg,
    url: 'https://www.lahiguera.net/cinemania/pelicula/498/',
    description: 'Anton Jackson es un agente muy especial, cuya obsesión es la ropa, la música y el cine de los 70. Inspirado por Shaft, Bootsy Collins y otros mitos de la blaxplotaiton, deberá dejar a un lado su peluca afro, las gafas de sol y los zapatos de plataforma para llevar a cabo esta misión: salvar a un candidato negro a la presidencia de los Estados Unidos. Su diavólico archi-enemigo, conocido simplemente como The Man, es el responsable de esto, junto con sus esbirros Mr. Feather y Penelope Snow.'
  },
  {
    id: 8,
    title: "Dave Chappelle's Block Party",
    year: '2005',
    image: blockPartyImg,
    url: 'https://en.wikipedia.org/wiki/Dave_Chappelle%27s_Block_Party',
    description: 'Película documental de 2005 presentada y escrita por el comediante Dave Chappelle y dirigida por Michel Gondry.'
  }
];
