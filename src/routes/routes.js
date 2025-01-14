import Home from "../pages/Home";
import Recipe from "../pages/Recipe";
import Recipes from "../pages/Recipes";
import Search from "../pages/Search";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DashBoard from "../pages/DashBoard";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";

export const appRoutes = [
  {
    path: "/",
    component: Home,
    isProtected: false,
  },
  {
    path: "/recipes",
    component: Recipes,
    isProtected: false,
  },
  {
    path: "/recipes/page/:page",
    component: Recipes,
    isProtected: false,
  },
  {
    path: "/recipes/:recipeId",
    component: Recipe,
    isProtected: false,
  },
  {
    path: "/search/:searchTerm",
    component: Search,
    isProtected: false,
  },
  {
    path: "/dashboard",
    component: DashBoard,
    isProtected: true,
  },
  {
    path: "*",
    component: NotFound,
    isProtected: false,
  },
];

export const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/reset-password",
    component: ForgotPassword,
  },
];
