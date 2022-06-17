import { Fragment, useEffect, useRef, useState } from "react";

import { Chapter } from "../../constant/mangaDetailType";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

interface props {
  chapterList?: Chapter[];
  chapterName: string;
  title: string;
}

const DropDown = (props: props) => {
  return (
    <Menu as="div" className="relative self-end  w-56 text-right z-10 ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md shadow-lg h-10 hover:shadow-2xl bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {props.chapterName}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-56 origin-top-right divide-y
         divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
          focus:outline-none  max-h-96 overflow-auto "
        >
          {props.chapterList?.map((chapter) => (
            <Link
              to={`/komik/${props.title}/${chapter.endpoint}`}
              key={chapter.endpoint}
              className="px-1 py-1  "
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-accent text-white" : "text-gray-900"
                    } flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {chapter.title}
                  </button>
                )}
              </Menu.Item>
            </Link>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
