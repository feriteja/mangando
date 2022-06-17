export interface MangaDetail {
  success: boolean;
  data: Data;
}

export interface Data {
  title: string;
  thumb: string;
  alter: string[];
  status: string;
  pengarang: Grafis[];
  illustrator: Grafis[];
  grafis: Grafis;
  tema: Grafis[];
  tipe: string;
  genre: Grafis[];
  sinopsis: string;
  score: string;
  chapters: Chapter[];
  link: Link;
}

export interface Chapter {
  title: string;
  link: string;
  endpoint: string;
  download: Download;
}

export interface Download {
  pdf: string;
}

export interface Grafis {
  name: string;
  link: string;
  endpoint: string;
}

export interface Link {
  url: string;
  endpoint: string;
}
