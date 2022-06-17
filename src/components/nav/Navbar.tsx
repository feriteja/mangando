import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex items-center justify-between h-16  rounded-div px-2 sm:px-4 md:px-6 ">
        <NavLink to={"/"}>
          <h1 className="font-bold text-2xl">Mangando</h1>
        </NavLink>
        <ul className="hidden sm:flex font-bold items-center text-center sm:text-sm md:text-base ">
          <li className="mx-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-primary"
              }
              to={"/"}
            >
              Homepage
            </NavLink>
          </li>
          <li className="mx-2">All Series</li>
          <li className="mx-2">Genres</li>
        </ul>
        <ul className="hidden sm:flex">
          <li>
            <NavLink to={"/signin"}>
              <button className="mx-2   border-2 rounded-xl px-2 py-1 font-bold">
                Sign in
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to={"signup"}>
              <button className="mx-2  rounded-xl px-2 py-1 bg-button text-btnText font-bold  ">
                Sign up
              </button>
            </NavLink>
          </li>
        </ul>
        <button className="sm:hidden" onClick={handleNav}>
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </nav>

      {/* Mobile */}
      <div
        className={
          isOpen
            ? "fixed sm:hidden right-0 top-16 bg-secondary w-[75%] h-full px-4 py-4 z-50 opacity-100 ease-in duration-300 "
            : "fixed sm:hidden right-[-100%] top-16   bg-secondary  w-[75%] h-full opacity-0 ease-in duration-300 "
        }
      >
        <ul className="flex justify-center">
          <li>
            <NavLink to={"/signin"}>
              <button
                onClick={handleNav}
                className="mx-2   border-2 rounded-xl px-2 py-1 font-bold"
              >
                Sign in
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to={"signup"}>
              <button
                onClick={handleNav}
                className="mx-2  rounded-xl px-2 py-1 bg-button text-btnText font-bold  "
              >
                Sign up
              </button>
            </NavLink>
          </li>
        </ul>
        <ul className="font-bold flex flex-col justify-evenly h-40">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "text-accent" : "text-primary"
            }
          >
            <li onClick={handleNav}>Homepage</li>
          </NavLink>
          <li>Latest</li>
          <li>All Series</li>
          <li>Genres</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
