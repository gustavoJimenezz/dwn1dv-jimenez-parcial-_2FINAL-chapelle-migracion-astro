import type { ImageMetadata } from 'astro';

// Importar imágenes desde assets
import ageOfSpinImg from '../assets/imagenes/the_age_of_spin.jpg';
import equanimityImg from '../assets/imagenes/equanimity.jpg';
import birdRevelationImg from '../assets/imagenes/the_bird_revelation.jpg';
import deepInTexasImg from '../assets/imagenes/deep_in_the_heart_of_texas.jpg';

export interface NetflixSpecial {
  id: number;
  title: string;
  year: string;
  image: ImageMetadata;
  url: string;
}

export const netflixSpecials: NetflixSpecial[] = [
  {
    id: 1,
    title: "The Age of Spin",
    year: "2017",
    image: ageOfSpinImg,
    url: "https://www.netflix.com/watch/80161055?trackId=255824129",
  },
  {
    id: 2,
    title: "Equanimity",
    year: "2017",
    image: equanimityImg,
    url: "https://www.netflix.com/watch/80171759?trackId=255824129&tctx=0%2C1%2CNAPA%40%40%7C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084_titles%2F1%2F%2Fdave%20chapelle%2F0%2F0%2CNAPA%40%40%7C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084_titles%2F1%2F%2Fdave%20chapelle%2F0%2F0%2Cunknown%2C%2C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084%7C1%2CtitlesResults",
  },
  {
    id: 3,
    title: "The Bird Revelation",
    year: "2017",
    image: birdRevelationImg,
    url: "https://www.netflix.com/watch/80230404?trackId=255824129&tctx=0%2C1%2CNAPA%40%40%7C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084_titles%2F1%2F%2Fdave%20chapelle%2F0%2F0%2CNAPA%40%40%7C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084_titles%2F1%2F%2Fdave%20chapelle%2F0%2F0%2C%2C%2C6f20bacb-27e8-4975-8cbf-ccf1ee6f8773-116189084%7C1%2C",
  },
  {
    id: 4,
    title: "Deep in the Heart of Texas",
    year: "2017",
    image: deepInTexasImg,
    url: "https://www.netflix.com/watch/80161054?trackId=14277283&tctx=-97%2C-97%2C%2C%2C%2C%2C%2C",
  },
];
