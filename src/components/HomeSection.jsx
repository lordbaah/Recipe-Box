import RecipeCard from "./RecipeCard";
import section_img from "../assets/img/5dcdb6c72e8ae.png";
import { useNavigate } from "react-router-dom";

const HomeSection = () => {
  const navigate = useNavigate();
  return (
    <section className="my-12">
      <div className="custom-screen grid gap-8 grid-cols-1 md:grid-cols-2">
        <div>
          <img
            src={section_img}
            alt="A woman Chef"
            className="w-full block object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p>Explore our variuos recipes, and choose from there</p>
          <button
            onClick={() => navigate(`/recipes`)}
            className="inline-block uppercase font-bold text-sm mt-5 py-2 px-4 text-clr-white bg-clr-pink duration-150 hover:bg-clr-yellow active:bg-gray-200 rounded-full">
            explore recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
