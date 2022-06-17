import React from "react";
import DropDown from "../dropDown/DropDown";
import { Chapter } from "../../constant/mangaDetailType";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

interface props {
  chapterList?: Chapter[];
  chapterName?: string;
  title: string;
}

const SkeletonChapter = (props: props) => {
  return (
    <div className="max-w-[1200px] w-full mx-auto mt-4">
      <div className="flex flex-col space-y-2 items-center  ">
        <div className="bg-gray-500 h-6 w-3/4 self-center animate-pulse " />
        <div className="bg-gray-500 h-6 w-2/4 self-center  animate-pulse" />
        <div className="flex items-center space-x-2     text-center   animate-pulse">
          <p>All chapters are in</p>
          <div className="h-3 w-64 bg-gray-500 " />
        </div>
        <DropDown
          title={props.title}
          chapterName={props.chapterName || ""}
          chapterList={props.chapterList}
        />
      </div>
      <div className="mt-10 space-y-2 animate-pulse ">
        {[...Array(3).keys()].map((e, idx) => {
          return <div className="bg-gray-500 w-full h-screen " />;
        })}
      </div>
    </div>
  );
};

export default SkeletonChapter;
