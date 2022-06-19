import React, { useId } from "react";
import SkeletonCard from "../skeleton/SkeletonCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getMenuManga } from "../../services/manga";
import { Data } from "../../constant/mangaType";
import { useQuery } from "react-query";
import CardManga from "../card/CardManga";

const recommended = () => {
  const sliderId = useId();

  const { data, status } = useQuery<Data>("mangaMenu", getMenuManga);

  const slideMove = (direction: "right" | "left") => {
    const slider = document.getElementById(sliderId);
    if (slider == null) return;
    if (direction === "left") slider.scrollLeft -= 160;
    if (direction === "right") slider.scrollLeft += 160;
  };

  return (
    <div className="bg-secondary p-2 rounded-div ">
      <h1 className="font-bold text-lg">Recommended</h1>
      <div className=" flex items-center group relative">
        <button
          onClick={() => slideMove("left")}
          className="absolute text-accent border-accent top-20 border rounded-full z-10 hidden  group-hover:sm:block "
        >
          <MdChevronLeft size={40} />
        </button>
        <div
          id={sliderId}
          className="snap-x snap-proximity scroll-smooth h-full w-full space-x-3 mt-2    overflow-x-scroll whitespace-nowrap scrollbar-hide  "
        >
          {status === "loading"
            ? [...Array(10).keys()].map((e, idx) => (
                <SkeletonCard key={idx + "recomended"} />
              ))
            : data?.body.recent_popular.map((e, idx) => (
                <CardManga key={e.name + idx + "cardRecomend"} {...e} />
              ))}
        </div>
        <button
          onClick={() => slideMove("right")}
          className="absolute text-accent right-0 border-accent top-20 border rounded-full z-10 hidden  group-hover:sm:block "
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default recommended;
