import { useContext } from "react";
import { IoIosTimer, IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../customhook/UseFavourite";

const RecipeCard = ({ id, image, title, servings, readyInMinutes }) => {
  const { user } = useAuth;
  const recipeData = { id, image, title, servings, readyInMinutes }; //data needed for favorite

  const { isFavorite, isLoading, toggleFavorite } = useFavorites(
    user,
    id,
    recipeData
  );

  return (
    <div className="relative rounded shadow-md pb-4 flex flex-col justify-between">
      <button
        className="absolute right-2 top-2 shadow-sm z-10"
        onClick={toggleFavorite}
        disabled={isLoading}>
        <IoIosHeart
          className={`text-3xl ${
            isFavorite ? "text-clr-pink" : "text-clr-white"
          }`}
        />
      </button>

      <div className="relative h-[216px] w-full rounded-t">
        <img
          alt={title}
          src={image}
          loading="lazy"
          className="h-full w-full block rounded-t object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
      </div>

      <div className="p-4">
        <h2 className="font-bold">{title}</h2>

        <div className="mt-6 flex  items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoIosTimer className="text-xs uppercase" />
              <p className="text-xs uppercase">{`${readyInMinutes} mins`}</p>
            </div>

            <p className="text-xs uppercase">{`${servings} serves`}</p>
          </div>

          <Link
            to={`/recipes/${id}`}
            className="border-clr-black border py-2 px-4 rounded-full uppercase text-xs">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
