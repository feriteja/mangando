import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useMatch, useParams } from "react-router-dom";
import { SkeletonDetail } from "../../components";
import { getMangaDetail } from "../../services/manga";
import { BsCircleFill, BsDownload, BsPen, BsPencil } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const DetailManga = () => {
  const [showMore, setShowMore] = useState(false);
  const { title = "" } = useParams();
  const { status, data } = useQuery([`detail${title}`, title], () =>
    getMangaDetail(title)
  );

  if (status === "loading") return <SkeletonDetail />;

  return (
    <div className="flex flex-1 flex-col   space-y-4 bg-red-20  rounded-div my-4 px-3 py-2 ">
      <div className="flex  w-full space-x-3  ">
        <img className="h-44 w-40 object-cover " src={data?.thumb} alt="" />
        <div className="flex flex-1 flex-col space-y-2 ">
          <h1 className="font-bold text-2xl">{data?.title}</h1>
          <div className="flex items-center space-x-1">
            <HiOutlineDotsCircleHorizontal size={20} /> <h3>{data?.status}</h3>
          </div>
          <div className="flex flex-wrap">
            {"("}
            {data?.alter.slice(0, Math.min(data.alter.length, 5)).map((e) => (
              <span>{` ${e}`};</span>
            ))}
            {")"}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-3 ">
            <div className="flex items-center`">
              <BsPen /> <h3>{data?.pengarang[0].name}</h3>
            </div>
            <div className="flex items-center`">
              <BsPencil /> <h3>{data?.illustrator[0].name}</h3>
            </div>
          </div>
          <div className="flex space-x-3 ">
            {data?.genre.map((genre) => (
              <h3 className="font-semibold">{genre.name}</h3>
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
      <div className="space-y-3 overflow-y-auto max-h-[500px] scrollbar-hide">
        <h1 className="font-bold">Chapter</h1>
        {data?.chapters.map((chapter) => {
          return (
            <Link to={`/komik/${title}/${chapter.endpoint}`}>
              <div className="flex justify-between px-2 py-1 rounded-md shadow-sm bg-secondary">
                <h2>{chapter.title}</h2>
                <BsDownload />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DetailManga;
