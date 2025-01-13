import React from "react";
import { cuisines, mealtypes, DietType } from "../services/RecipeCategories";

const Filter = ({
  dietType,
  setDietType,
  cuisineType,
  setCuisineType,
  mealType,
  setMealType,
}) => {
  return (
    <div className="w-full">
      <div className="bg-clr-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-clr-black mb-4">
          Filter Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cuisine Type Filter */}
          <div>
            <label
              htmlFor="cuisineType"
              className="block text-sm font-medium text-clr-black mb-1.5">
              Cuisine Type
            </label>
            <select
              id="cuisineType"
              name="cuisineType"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 text-clr-black sm:text-sm focus:ring-2 focus:ring-clr-pink focus:border-clr-pink">
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Type Filter */}
          <div>
            <label
              htmlFor="mealType"
              className="block text-sm font-medium text-clr-black mb-1.5">
              Meal Type
            </label>
            <select
              id="mealType"
              name="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 text-clr-black sm:text-sm focus:ring-2 focus:ring-clr-pink focus:border-clr-pring-clr-pink">
              <option value="">All Meal Types</option>
              {mealtypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Diet Type Filter */}
          <div>
            <label
              htmlFor="dietType"
              className="block text-sm font-medium text-clr-black mb-1.5">
              Diet Type
            </label>
            <select
              id="dietType"
              name="dietType"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 text-clr-black sm:text-sm focus:ring-2 focus:ring-clr-pink focus:border-clr-pring-clr-pink">
              <option value="">All Diet Types</option>
              {DietType.map((diet) => (
                <option key={diet} value={diet.toLowerCase()}>
                  {diet}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
