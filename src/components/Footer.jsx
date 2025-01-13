import { BiCopyright } from "react-icons/bi";
const currentYear = new Date().getFullYear();

// console.log(currentYear);

const Footer = () => {
  return (
    <footer>
      <div className="custom-screen">
        <p>copyright{currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
