import React from "react";
import { useQuery } from "react-query";
import { Data } from "../../constant/mangaType";
import { getMenuManga } from "../../services/manga";
import { MdTrendingUp } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import SkeletonCardTrending from "../skeleton/SkeletonCardTrending";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import CardTrending from "../card/CardTrending";

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
              <CardTrending key={manga.link.url} manga={manga} idx={idx} />
            );
          })}
    </div>
  );
};

export default Trending;
