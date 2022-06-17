import React from "react";
import { IoMdContact } from "react-icons/io";
import { BsInstagram, BsGithub } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

const Sosmed = () => {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className="rounded-div p-2 space-y-3">
      <h1 className="text-center text-2xl">
        <IoMdContact className="inline" /> My Sosmed
      </h1>
      <button
        onClick={() => openInNewTab("https://instagram.com/feri_teja")}
        className=" flex w-full items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-4 rounded-md text-white"
      >
        <BsInstagram size={24} className="inline" />
        <h1 className="flex-1 font-bold text-xl ">feri_teja</h1>
      </button>
      <button
        onClick={() => openInNewTab("https://twitter.com/feriteja")}
        className=" flex w-full items-center space-x-2 bg-[#1D9BF0] py-2 px-4 rounded-md text-white"
      >
        <FiTwitter size={24} className="inline" />
        <h1 className="flex-1 font-bold text-xl  ">feriteja</h1>
      </button>
      <button
        onClick={() => openInNewTab("https://github.com/feriteja")}
        className=" flex w-full items-center space-x-2 bg-[#24292F] py-2 px-4 rounded-md text-white"
      >
        <BsGithub size={24} className="inline" />
        <h1 className="flex-1 font-bold text-xl  ">feriteja</h1>
      </button>
    </div>
  );
};

export default Sosmed;
