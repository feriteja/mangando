import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { NewUpdate } from "../../constant/mangaType";

interface props {
  manga: NewUpdate;
  idx: number;
}

const CardTrending = ({ manga, idx }: props) => {
  return (
    <Link
      to={`/${manga.link.endpoint}`}
      className=" flex items-center border shadow-sm h-24 px-2 mx-2 space-x-2 rounded-md "
    >
      <div className="flex items-center justify-center border rounded-md h-8 w-8 text-center">
        {idx + 1}
      </div>
      <LazyLoadImage src={manga.thumb} width={"100%"} className="h-20 w-20" />

      <div className="flex-1 space-y-1 ">
        <h1 className="line-clamp-2">{manga.name}</h1>
        <div className="flex items-center">
          <div className=" ">
            <AiTwotoneStar className="inline text-yellow-400" />
          </div>
          <span className="ml-2">{manga.score}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardTrending;
