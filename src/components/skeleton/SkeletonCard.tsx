import React from "react";

const SkeletonCard = () => {
  return (
    <div className="border snap-start border-gray-500 rounded-md overflow-hidden min-w-fit max-w-fit h-52  inline-block animate-pulse ">
      <div className=" h-36 w-40 md:w-44 bg-gray-500" />
      <div className="flex flex-col h-auto  ">
        <div className=" h-4  bg-gray-500 m-1 rounded-md " />
        <div className=" h-4 w-24  bg-gray-500 m-1 rounded-md " />
      </div>
    </div>
  );
};

export default SkeletonCard;
