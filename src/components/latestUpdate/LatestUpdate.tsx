import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { MangaBody } from "../../constant/mangaType";
import { getMenuManga } from "../../services/manga";
import CardManga from "../card/CardManga";

import SkeletonCard from "../skeleton/SkeletonCard";

const LatestUpdate = () => {
  const { data, status } = useQuery<MangaBody>("mangaMenu", getMenuManga);

  return (
    <div className="bg-secondary p-2 rounded-div mt-3">
      <h1 className="font-bold text-lg">Latest Update</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center ">
        {status === "loading"
          ? [...Array(10).keys()].map((e, idx) => (
              <SkeletonCard key={idx + "latest"} />
            ))
          : data?.new_update.map((data, idx) => {
              return <CardManga key={idx + "latest"} {...data} />;
            })}
      </div>
      <div className=" flex mt-4 space-x-3 items-center justify-center">
        <button className="font-bold text-xl">Show all manga</button>
      </div>
    </div>
  );
};

export default LatestUpdate;
