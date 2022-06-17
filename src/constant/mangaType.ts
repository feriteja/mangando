export interface menuData {
  success: boolean;
  data: Data;
}

export interface Data {
  menu: Menu[];
  body: MangaBody;
  sidebar: Sidebar;
  footer: Footer[];
}

export interface MangaBody {
  recent_popular: ColoredKomik[];
  new_update: NewUpdate[];
  colored_komik: ColoredKomik[];
}

export interface NewUpdate {
  name: string;
  thumb: string;
  link: Link;
  score?: string;
}

export interface ColoredKomik {
  name: string;
  thumb: string;
  link: Link;
  last_upload?: string;
  last_chapter?: LastChapter;
}

export interface LastChapter {
  name: string;
  url: string;
  endpoint: string;
}

export interface Link {
  url: string;
  endpoint: string;
}

export interface Footer {
  name: string;
  url: string;
}

export interface Menu {
  name: string;
  link: Link;
}

export interface Sidebar {
  popular: NewUpdate[];
  new_komik: NewUpdate[];
}
