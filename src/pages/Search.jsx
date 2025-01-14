import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import { searchRecipes } from "../services/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import ErrorMessage from "../components/ErrorMessage";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20; // Same as limit
  const params = useParams();
  const searchTerm = params.searchTerm;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate offset based on current page
  const offSet = (currentPage - 1) * recipesPerPage;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipe", searchTerm, offSet],
    queryFn: () => searchRecipes(searchTerm, offSet, recipesPerPage),
    staleTime: 10 * 60 * 1000, // 10 minutes for this specific query
    placeholderData: keepPreviousData,
  });

  const totalRecipes = data?.totalResults || 0;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  return (
    <section>
      <div>
        <SearchComponent setPage={setCurrentPage} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Searching recipes...</div>
          </div>
        )}

        {/* Error State */}
        {isError && <ErrorMessage error={error} />}

        {/* Recipes Grid */}
        {data && !isLoading && (
          <div className="max-w-7xl mx-auto mt-8 px-8 grid grid-cols-1 gap-8  md:grid-cols-2">
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
              {`No recipes found with the term: ${searchTerm}`}.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
