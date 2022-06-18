import axios from "axios";
import { MangaChapterType } from "../constant/mangaChapterType";
import { MangaDetail } from "../constant/mangaDetailType";
import { menuData } from "../constant/mangaType";

const baseUrl = import.meta.env.VITE_BASE_URL;
if (import.meta.env.MODE === "development") {
}

const getMenuManga = async () => {
  const endPoint = `/home`;
  try {
    const res = await axios.get<menuData>(`${baseUrl + endPoint}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const getMangaDetail = async (endPoint: string) => {
  const uri = baseUrl + "/komik/" + endPoint;
  try {
    const res = await axios.get<MangaDetail>(uri);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

const getMangaChapter = async (endPoint: string) => {
  const uri = baseUrl + "/chapter/" + endPoint;
  try {
    const res = await axios.get<MangaChapterType>(uri);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export { getMenuManga, getMangaDetail, getMangaChapter };
