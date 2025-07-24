import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logoImage from "../../../../../public/assets/logo.png"; 

const FooterLogoSection = () => (
  <div className="text-center sm:text-left">
    <img className="w-14 h-14 mx-auto sm:mx-0 rounded-full" src={logoImage} alt="logo" />
    <p className="text-md font-normal mt-4 mb-4 max-w-xs mx-auto sm:mx-0">
      Empowering your journeys with trusted travel services and unforgettable experiences.
    </p>
    <div className="flex space-x-6 justify-center sm:justify-start text-gray-400">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#1877F2] transition-colors duration-300"><FaFacebookF size={20} /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition-colors duration-300"><FaInstagram size={20} /></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#0A66C2] transition-colors duration-300"><FaLinkedinIn size={20} /></a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#1DA1F2] transition-colors duration-300"><FaTwitter size={20} /></a>
    </div>
  </div>
);

export default FooterLogoSection;
