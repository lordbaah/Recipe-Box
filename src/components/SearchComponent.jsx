import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto w-[80%] md:w-[50%]">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex px-1 py-1 rounded-full border border-clr-pink overflow-hidden w-full">
        <input
          type="text"
          placeholder="Search recipe, diet, meal...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-white pl-4 text-sm"
        />
        <button
          type="submit"
          className="bg-clr-pink hover: transition-all text-white text-sm rounded-full px-5 py-2.5">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
