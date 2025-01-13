import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="absolute top-0 right-0 z-30 bg-clr-black w-[100%] p-8 transition-all md:hidden">
      <nav>
        <ul className="mt-8 flex flex-col items-center gap-4">
          {navItems.map((item, index) => (
            <li key={index} className="text-clr-white uppercase relative">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "text-clr-pink" : "")}>
                {item.name}
              </NavLink>
            </li>
          ))}
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
    name: "Login",
    path: "/login",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
];
