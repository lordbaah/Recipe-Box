import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  return (
    <header className="my-4">
      <nav className="custom-screen py-4 border rounded-[32px] border-clr-black/25 border-solid flex justify-between items-center">
        <h1 className="font-bold">RecipeHome</h1>

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

        <button className="w-8 h-8 bg-slate-500 inline-flex items-center justify-center rounded-[50%] md:hidden">
          <FaBars />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

const navItems = [
  {
    name: "Home",
    path: "/",
  },
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
