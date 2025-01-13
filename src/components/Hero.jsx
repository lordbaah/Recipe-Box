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
            This project was made with the Spoonacular Recipe API to fetch
            recipes and serves as my capstone project from a BootCamp I
            completed at Trestle Academy. I am using the free version of the
            API, which has a daily usage limit.
          </p>

          <SearchComponent />
        </div>
      </div>
    </section>
  );
};

export default Hero;
