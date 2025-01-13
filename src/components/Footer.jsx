import { BiCopyright } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className=" text-clr-white  mt-8">
      <div className="custom-screen flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-clr-black">
        <div className="flex gap-6">
          <a
            href="https://github.com/lordbaah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-clr-white hover:text-clr-pink duration-150 text-2xl">
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/lord-baah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-clr-white hover:text-clr-pink duration-150 text-2xl">
            <FaLinkedin />
          </a>
        </div>

        <p className="flex items-center gap-1 text-sm">
          <BiCopyright className="text-lg" /> {currentYear} Lord Baah. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
