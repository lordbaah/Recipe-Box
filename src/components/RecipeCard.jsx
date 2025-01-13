import { IoIosTimer, IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../customhook/UseFavourite";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecipeCard = ({
  id,
  image,
  title,
  servings,
  readyInMinutes,
  onRemoveFavorite,
  isDashboard = false,
}) => {
  const { user } = useAuth();
  const recipeData = { id, image, title, servings, readyInMinutes }; //data needed for favorite

  const { isFavorite, isLoading, toggleFavorite } = useFavorites(
    user,
    id,
    recipeData
  );

  const handleFavoriteClick = async () => {
    if (isDashboard) {
      // If we're on the dashboard, use the dashboard's remove function
      await onRemoveFavorite(id);
    } else {
      // Otherwise use the normal toggle functionality
      await toggleFavorite();
    }
  };

  return (
    <div className="relative rounded shadow-md pb-4 flex flex-col justify-between">
      <button
        className="absolute right-2 top-2 shadow-sm z-10"
        onClick={handleFavoriteClick}
        disabled={isLoading}>
        <IoIosHeart
          className={`text-3xl ${
            isDashboard || isFavorite ? "text-clr-pink" : "text-clr-white"
          }`}
        />
      </button>

      <div className="relative h-[216px] w-full rounded-t">
        <LazyLoadImage
          alt={title}
          src={image}
          effect="blur"
          width="100%"
          height="100%"
          className="h-full w-full block rounded-t object-cover"
        />
        <div className="absolute h-full w-full inset-0 bg-black opacity-30 rounded"></div>
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
            className="border-clr-black border py-1 px-2 rounded-full capatalize text-xs">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
