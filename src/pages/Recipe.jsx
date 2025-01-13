import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../customhook/UseFavourite";
import { IoIosTimer, IoIosHeart } from "react-icons/io";
import ErrorMessage from "../components/ErrorMessage";

const Recipe = () => {
  const { user } = useAuth();
  const { recipeId } = useParams();

  const {
    data: recipeData,
    isLoading: isRecipeLoading,
    isError,
    error: recipeError,
  } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => fetchRecipesDetails(recipeId),
  });

  const {
    isFavorite,
    isLoading: isFavoriteLoading,
    error: favoriteError,
    toggleFavorite,
  } = useFavorites(user, recipeId, recipeData);

  return (
    <section>
      <div className="custom-screen">
        {/* Loading State */}
        {isRecipeLoading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading recipes...</div>
          </div>
        )}

        {/* Error States */}
        {favoriteError && (
          <div className="text-center py-12">
            <div className="text-lg text-red-600">
              {recipeError?.message || favoriteError}
            </div>
          </div>
        )}

        {isError && <ErrorMessage error={recipeError} />}

        {recipeData && !isRecipeLoading && (
          <>
            <div className="flex flex-col gap-6 items-start">
              <div className="">
                <p className="font-bold uppercase text-2xl">ready in</p>
                <div className="flex items-end">
                  <IoIosTimer className="text-4xl" />
                  <h3 className="font-bold">{`${recipeData.readyInMinutes} minutes`}</h3>
                </div>
              </div>
              {/* <p>{`Number of Servings: ${recipeData.servings}`}</p> */}

              <h1 className="text-2xl font-extrabold lg:text-5xl mb-4">
                {recipeData.title}
              </h1>

              <button
                onClick={toggleFavorite}
                disabled={isFavoriteLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isFavorite ? "bg-clr-pink" : "bg-blue-400"
                }`}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <div className="max-w-[700px] mx-auto">
                <img
                  src={recipeData.image}
                  alt={recipeData.title}
                  className="w-full h-auto block object-cover"
                />
              </div>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: recipeData.summary }}
              />

              <div className="mt-4">
                {recipeData.vegetarian ? (
                  <p className="font-bold text-2xl">Vegetarian Choice</p>
                ) : (
                  <p className="font-bold text-2xl">Not for Vegetarian</p>
                )}
              </div>
            </div>

            <div className=" mt-8">
              <h2 className="font-bold text-2xl lg:text-4xl">Ingredients</h2>
              <ul className="grid grid-cols-1 gap-4">
                {recipeData.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    <div className="">
                      <p>{ingredient.original}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" mt-8">
              <h1 className="font-bold text-2xl lg:text-4xl">Recipe Steps</h1>
              <ul className="grid grid-cols-1 gap-4">
                {recipeData.analyzedInstructions[0]?.steps.map((step) => (
                  <li key={step.number}>
                    <h2 className="font-bold text-clr-pink">{`Step ${step.number}`}</h2>
                    <div className="flex">
                      <p>{step.step}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Recipe;
