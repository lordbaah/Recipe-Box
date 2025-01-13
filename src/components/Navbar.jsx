import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaCross } from "react-icons/fa6";

import MobileNav from "./MobileNav";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="my-4">
      <nav className="custom-screen py-4 border rounded-[32px] border-clr-black/25 border-solid flex justify-between items-center">
        <Link
          to={"/"}
          className={`z-40 ${open ? "text-clr-white" : "text-clr-black"}`}>
          <h1 className="font-bold cursor-pointer">RecipeBox</h1>
        </Link>

        <ul className="hidden md:flex gap-4 items-center">
          {navItems.map((item, index) => (
            <li key={index} className="text-clr-black uppercase relative">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "text-clr-pink" : "")}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={handleToggle}
          className="inline-flex items-center justify-center  z-40 md:hidden">
          {open ? (
            <FaCross className="text-clr-white text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </nav>
      {open && <MobileNav />}
    </header>
  );
};

export default Navbar;

const navItems = [
  {
    name: "Recipes",
    path: "/recipes",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];
