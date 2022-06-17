import React from "react";

const SkeletonCardTrending = () => {
  return (
    <div className=" flex items-center border h-24 animate-pulse px-2 space-x-2 rounded-md ">
      <div className="bg-gray-500 h-8 w-8 text-center  " />
      <div className="bg-gray-500 h-20 w-20 " />
      <div className="flex-1 space-y-2 ">
        <div className="bg-gray-500 h-6 w-full " />
        <div className="bg-gray-500 h-6 w-1/3 " />
      </div>
    </div>
  );
};

export default SkeletonCardTrending;
