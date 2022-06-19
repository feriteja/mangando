import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Navigate,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SkeletonDetail } from "../../components";
import { getMangaDetail, getMangaFile } from "../../services/manga";
import { BsCircleFill, BsDownload, BsPen, BsPencil } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  UserState,
  userStateContextProps,
} from "../../context/UserStateContext";

const DetailManga = () => {
  const { mangaList, addToFav, deleteFromFav } =
    UserState() as userStateContextProps;
  const [showMore, setShowMore] = useState(false);
  const { title = "" } = useParams();
  const [isFav, setIsFav] = useState(false);
  const [isWaitFav, setIsWaitFav] = useState(false);
  const { status, data, error, isError } = useQuery(
    [`detail${title}`, title],
    () => getMangaDetail(title)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" && data === undefined) navigate("/not-found");
    setIsFav(mangaList.some((manga) => manga.endpoint === title));
  }, [status]);

  const handleFav = async () => {
    if (isWaitFav) return;
    setIsWaitFav(true);
    try {
      const dataManga = {
        endpoint: data?.link.endpoint || "",
        thumb: data?.thumb || "",
        title: data?.title || "",
      };
      if (isFav) {
        await deleteFromFav(dataManga);
        setIsFav(false);
        setIsWaitFav(false);
        return;
      }
      await addToFav(dataManga);
      setIsFav(true);

      setIsWaitFav(false);
    } catch (error) {
      setIsWaitFav(false);
    }
  };

  if (status === "loading") return <SkeletonDetail />;

  return (
    <div className="flex flex-1 flex-col   space-y-4 bg-red-20  rounded-div my-4 px-3 py-2 ">
      <div className="flex  w-full space-x-3  ">
        <img className="h-44 w-40 object-cover " src={data?.thumb} alt="" />
        <div className="flex flex-1 flex-col space-y-2 ">
          <div className="flex  items-center justify-between pr-4 ">
            <h1 className="font-bold text-xl md:text-2xl">{data?.title}</h1>
            <button onClick={isFav ? handleFav : handleFav}>
              {isFav ? (
                <FaHeart size={25} className="text-pink-500" />
              ) : (
                <FaRegHeart size={25} />
              )}
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <HiOutlineDotsCircleHorizontal size={20} /> <h3>{data?.status}</h3>
          </div>
          <div className="flex flex-wrap">
            {"("}
            {data?.alter
              .slice(0, Math.min(data.alter.length, 5))
              .map((alterName, idx) => (
                <span key={alterName + idx}>{` ${alterName}`};</span>
              ))}
            {")"}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-3 ">
            <div className="flex items-center`">
              <BsPen /> <h3>{data?.pengarang[0].name}</h3>
            </div>
            <div className="flex items-center`">
              <BsPencil /> <h3>{data?.illustrator[0]?.name}</h3>
            </div>
          </div>
          <div className="flex flex-wrap  ">
            {data?.genre.map((genre) => (
              <h3 key={genre.name} className="font-semibold mr-3">
                {genre.name}
              </h3>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3 ">
        <h1 className="text-lg font-bold">{data?.title}</h1>
        <p
          className={
            showMore
              ? "line-clamp-none ease-in duration-150 "
              : "line-clamp-4 ease-in duration-150"
          }
        >
          {data?.sinopsis}
        </p>
        <button
          className="flex items-center"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? (
            <>
              <MdExpandLess size={26} /> <h3>Show Less</h3>
            </>
          ) : (
            <>
              <MdExpandMore size={26} />
              <h3>Show More</h3>{" "}
            </>
          )}
        </button>
      </div>
      <h1 className="font-bold">Chapter</h1>
      <div className="flex flex-col space-y-2 overflow-auto max-h-[500px] scrollbar-hide">
        {data?.chapters.map((chapter) => {
          return (
            <Link
              key={chapter.endpoint + "chapterManga"}
              className="visited:opacity-75"
              to={`/komik/${title}/${chapter.endpoint}`}
            >
              <div
                className="flex justify-between px-2 py-2 rounded-md shadow-sm bg-secondary"
                key={chapter.endpoint + "chapterManga"}
              >
                <h2>{chapter.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DetailManga;
