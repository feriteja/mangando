import { useLayoutEffect, useState } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { DropDown, NavChapter, SkeletonChapter } from "../../components";
import { getMangaChapter, getMangaDetail } from "../../services/manga";
import { FaChevronUp } from "react-icons/fa";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { Data } from "../../constant/mangaChapterType";

const ChapterManga = () => {
  const [scrollPosition, setPosition] = useState({ x: 0, y: 0 });
  const { title = "", chapterId = "" } = useParams();
  const { status, data } = useQuery([`detail${title}`, title], () =>
    getMangaDetail(title)
  );
  const { status: statusChapter, data: dataChapter } = useQuery(
    [`chapter/${chapterId}`, chapterId],
    () => getMangaChapter(chapterId)
  );

  console.log(dataChapter);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setPosition({ x: 0, y: position });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading" || statusChapter === "loading")
    return (
      <SkeletonChapter
        title={title}
        chapterName={dataChapter?.chapter_name}
        chapterList={data?.chapters}
      />
    );

  return (
    <div className="max-w-[1200px] w-full mx-auto mt-4  ">
      <div className="flex flex-col space-y-2 items-center  ">
        <h1 className="font-bold text-2xl">{dataChapter?.chapter_name}</h1>
        <div className="flex items-center space-x-2 text-center">
          <p>
            All chapters are in{" "}
            <span className="text-accent font-semibold">
              <Link to={`/komik/${data?.link.endpoint}`}>
                {data?.title.slice(6)}
              </Link>
            </span>
          </p>
        </div>
        <div className="bg-secondary rounded-sm shadow-lg py-2 w-full text-center">
          <span>Mangando</span> {">"} <span>{data?.title.slice(6)}</span>
          {">"} <span>{dataChapter?.chapter_name}</span>
        </div>
        <div>
          <p className="text-center opacity-80">
            Read the latest manga <strong>{dataChapter?.chapter_name}</strong>{" "}
            at Mangando . Manga {data?.title.slice(6)} at Mangando . Don't
            forget to read the other manga updates. A list of manga collections
            Mangando is in the Manga List menu.
          </p>
        </div>
        <DropDown
          title={title}
          chapterName={dataChapter?.chapter_name || ""}
          chapterList={data?.chapters}
        />
      </div>
      <div className="mt-10">
        <NavChapter title={title} dataChapter={dataChapter as Data} />
        {dataChapter?.chapter_images.map((e, idx) => {
          return (
            <LazyLoadImage
              scrollPosition={scrollPosition}
              effect="opacity"
              width={"100%"}
              className="w-5/6 mx-auto "
              src={e}
              alt=""
            />
          );
        })}
        <NavChapter title={title} dataChapter={dataChapter as Data} />
      </div>
      <button
        disabled={scrollPosition.y < 20}
        onClick={() => window.scrollTo(0, 0)}
        className={`${
          scrollPosition.y >= 20
            ? "fixed opacity-100 right-3"
            : "fixed opacity-0 right-10 "
        } bottom-3   ease-in duration-200 z-20 `}
      >
        <FaChevronUp size={40} />
      </button>
    </div>
  );
};

export default trackWindowScroll(ChapterManga);
