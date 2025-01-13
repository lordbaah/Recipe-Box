import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MobileNav = ({ closeMenu }) => {
  const { user } = useAuth();

  return (
    <div className="absolute top-0 right-0 z-30 bg-clr-black w-full  p-8 transition-transform transform duration-300 md:hidden">
      <nav>
        <ul className="mt-8 flex flex-col items-center gap-4">
          {navItems.map((item, index) => (
            <li key={index} className="text-clr-white capitalize relative">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "text-clr-pink" : "")}
                onClick={closeMenu}>
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
      </nav>
    </div>
  );
};

export default MobileNav;

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
    name: "Dashboard",
    path: "/dashboard",
  },
];
