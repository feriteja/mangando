import React from "react";
import { LatesUpdate, Recommended } from "../../components";

const Home = () => {
  return (
    <div className="p-4 grid grid-cols-7 max-w-[1140px] mx-auto ">
      <div className="col-span-7 md:col-span-5">
        <Recommended />
        <LatesUpdate />
      </div>
      <div className=" col-span-7 md:col-span-2 h-screen  max-w-[350px]  "></div>
    </div>
  );
};

export default Home;
