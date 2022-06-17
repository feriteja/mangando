import React from "react";
import { useQuery } from "react-query";
import { Data } from "../../constant/mangaType";
import { getMenuManga } from "../../services/manga";
import { MdTrendingUp } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import SkeletonCardTrending from "../skeleton/SkeletonCardTrending";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Trending = () => {
  const { data, status } = useQuery<Data>("mangaMenu", getMenuManga);
  return (
    <div className="rounded-div space-y-2">
      <h1 className="text-center text-2xl">
        <MdTrendingUp className="inline" /> Trending
      </h1>
      {status === "loading"
        ? [...Array(10).keys()].map((e, idx) => {
            return <SkeletonCardTrending key={idx + "trending"} />;
          })
        : data?.sidebar.popular.map((manga, idx) => {
            return (
              <Link
                key={manga.link.url}
                to={`/${manga.link.endpoint}`}
                className=" flex items-center border h-24 px-2 space-x-2 rounded-md "
              >
                <div className="flex items-center justify-center border rounded-md h-8 w-8 text-center">
                  {idx + 1}
                </div>
                <LazyLoadImage
                  src={manga.thumb}
                  width={"100%"}
                  className="h-20 w-20"
                />

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
          })}
    </div>
  );
};

export default Trending;
