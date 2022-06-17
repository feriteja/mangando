import React from "react";

const SkeletonDetail = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4  rounded-div my-4 px-3 py-2 ">
      <div className="flex  w-full space-x-3 animate-pulse ">
        <div className="bg-gray-500 h-44 w-40 " />
        <div className="flex flex-1 flex-col space-y-2 ">
          <div className="bg-gray-500 h-8 " />
          <div className="bg-gray-500 h-8  w-1/2" />
          <div className="bg-gray-500 h-4  w-4/5" />
          <div className="flex space-x-3 ">
            <div className="bg-gray-500 h-4  w-1/3 " />
            <div className="bg-gray-500 h-4  w-1/3 " />
          </div>
          <div className="flex space-x-3 ">
            <div className="bg-gray-500 h-4  w-1/3 " />
            <div className="bg-gray-500 h-4  w-1/3 " />
            <div className="bg-gray-500 h-4  w-1/3 " />
            <div className="bg-gray-500 h-4  w-1/3 " />
            <div className="bg-gray-500 h-4  w-1/3 " />
          </div>
        </div>
      </div>
      <div className="space-y-3 animate-pulse delay-100">
        <div className="bg-gray-500 h-5 w-3/5" />
        <div className="bg-gray-500 h-4" />
        <div className="bg-gray-500 h-4" />
        <div className="bg-gray-500 h-4" />
        <div className="bg-gray-500 h-4 w-4/5" />
      </div>
      <div className="space-y-3 animate-pulse delay-150 ">
        <h1 className="font-bold">Chapter</h1>
        <div className="bg-gray-500 h-4 w-full" />
        <div className="bg-gray-500 h-4 w-full" />
        <div className="bg-gray-500 h-4 w-full" />
        <div className="bg-gray-500 h-4 w-full" />
        <div className="bg-gray-500 h-4 w-full" />
        <div className="bg-gray-500 h-4 w-full" />
      </div>
    </div>
  );
};

export default SkeletonDetail;
