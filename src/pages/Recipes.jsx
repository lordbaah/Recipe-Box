import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { fetchRecipesPaginated } from "../services/api";
import Filter from "../components/Filter";
import ErrorMessage from "../components/ErrorMessage";
import CardSkeleton from "../components/Loaders/CardSkeleton";

const Recipes = () => {
  const navigate = useNavigate();
  const { page } = useParams(); // Get page from URL params
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  // const [offSet, setOffSet] = useState(0); //same as skip
  const [dietType, setDietType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const recipesPerPage = 20; // Same as limit

  // Update URL when page changes
  useEffect(() => {
    navigate(`/recipes/page/${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  // Update currentPage when URL param changes
  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page]);

  // Calculate offset based on current page
  const offSet = (currentPage - 1) * recipesPerPage;

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["recipes", offSet, dietType, cuisineType, mealType],
    queryFn: () =>
      fetchRecipesPaginated(
        offSet,
        recipesPerPage,
        dietType,
        cuisineType,
        mealType
      ),
    staleTime: 10 * 60 * 1000, // 10 minutes for this specific query
    keepPreviousData: true,
  });

  // console.log(error);

  const totalRecipes = data?.totalResults || 0;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  // Update page and URL when filters change
  const handleFilterChange = (type, value) => {
    setCurrentPage(1);
    navigate("/recipes/page/1", { replace: true });
    switch (type) {
      case "diet":
        setDietType(value);
        break;
      case "cuisine":
        setCuisineType(value);
        break;
      case "meal":
        setMealType(value);
        break;
      default:
        break;
    }
  };

  // Handle manual URL navigation to invalid pages
  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      setCurrentPage(1);
      navigate("/recipes/page/1", { replace: true });
    }
  }, [totalPages, currentPage, navigate]);

  return (
    <section>
      <div className="custom-screen">
        <h1 className="text-2xl font-bold text-center my-4">Recipe List</h1>
        {data && !isLoading && (
          <Filter
            dietType={dietType}
            setDietType={(value) => handleFilterChange("diet", value)}
            cuisineType={cuisineType}
            setCuisineType={(value) => handleFilterChange("cuisine", value)}
            mealType={mealType}
            setMealType={(value) => handleFilterChange("meal", value)}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 grid grid-cols-1 gap-8  md:grid-cols-2">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {/* Error State */}
        {isError && <ErrorMessage error={error} />}

        {/* Recipes Grid */}
        {data && !isLoading && (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.results.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                id={recipe.id}
                readyInMinutes={recipe.readyInMinutes}
                servings={recipe.servings}
                image={recipe.image}
              />
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {data && !isLoading && (
          <div className="mt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-gray-700">
                page {currentPage} of {totalPages}
                <span className="mx-2">•</span>
                Total recipes: {totalRecipes}
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}

        {/* No Results State */}
        {data?.results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">
              No recipes found with the selected filters.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recipes;
