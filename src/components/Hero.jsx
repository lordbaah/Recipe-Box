import { useNavigate } from "react-router-dom";
import bgImage from "../assets/img/hero-bg.jpg";
import SearchComponent from "./SearchComponent";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <div
        className="relative custom-screen py-16 lg:py-28 rounded-[32px] border-none bg-gradient-to-r from-black to-clr-black bg-blend-overlay"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* background overlay */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-[32px] border-none"></div>

        <div className="relative grid place-items-center gap-4">
          <h1 className="font-bold uppercase text-clr-white text-3xl text-center max-w-[30ch] lg:text-5xl">
            Unleash Culinary Excellence
          </h1>

          <p className="text-clr-white text-center max-w-[60ch]  mt-4">
            This Project is create with <b>Spoonacular Recipe Api</b> to retrive
            recipes. This Project is a capstrone project at a BootCamp I did at
            Trestle Academy.
          </p>

          {/* <button
            onClick={() => navigate(`/recipes`)}
            className="inline-block uppercase font-bold text-sm mt-5 py-2 px-4 text-clr-white bg-clr-pink duration-150 hover:bg-clr-yellow active:bg-gray-200 rounded-full">
            explore recipes
          </button> */}

          <SearchComponent />
        </div>
      </div>
    </section>
  );
};

export default Hero;
