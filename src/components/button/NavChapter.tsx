import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Data } from "../../constant/mangaChapterType";

interface props {
  dataChapter: Data;
  title: string;
}

const NavChapter = ({ dataChapter, title }: props) => {
  return (
    <div className="flex justify-end space-x-4 my-3 mr-10">
      <button
        disabled={!dataChapter?.chapter.previous}
        className="bg-button text-btnText px-2 py-1 rounded-md font-bold text-sm  disabled:bg-gray-500 disabled:cursor-not-allowed "
      >
        <Link to={`/komik/${title}${dataChapter?.chapter.previous}`}>
          <HiChevronDoubleLeft className="inline" /> Previus
        </Link>
      </button>
      <button
        disabled={!dataChapter?.chapter.next}
        className="bg-button text-btnText px-2 py-1 rounded-md font-bold text-sm  disabled:bg-gray-500 disabled:cursor-not-allowed "
      >
        <Link to={`/komik/${title}${dataChapter?.chapter.next}`}>
          Next <HiChevronDoubleRight className="inline" />
        </Link>
      </button>
    </div>
  );
};

export default NavChapter;
