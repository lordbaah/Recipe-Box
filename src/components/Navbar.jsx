import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
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
            <li key={index} className="text-clr-black capitalize relative">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "text-clr-pink" : "")}>
                {item.name}
              </NavLink>
            </li>
          ))}
          {!user ? (
            <li>
              <NavLink
                to={"/login"}
                className="font-bold text-sm py-2 px-4 text-clr-white bg-clr-pink duration-150 hover:bg-clr-yellow active:bg-gray-200 rounded-full">
                Login
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>

        <button
          onClick={handleToggle}
          className="inline-flex items-center justify-center z-40 md:hidden">
          {open ? (
            <FaX className="text-clr-white text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </nav>
      {open && <MobileNav closeMenu={closeMenu} />}
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
    name: "Dashboard",
    path: "/dashboard",
  },
];
