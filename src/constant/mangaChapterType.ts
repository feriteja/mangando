export interface MangaChapterType {
  success: boolean;
  data: Data;
}

export interface Data {
  chapter_name: string;
  chapter_url: string;
  chapter_endpoint: string;
  chapter_images: string[];
  chapter: Chapter;
  download_link: DownloadLink;
}

export interface Chapter {
  previous: string;
  next: string;
}

export interface DownloadLink {
  pdf: string;
}
