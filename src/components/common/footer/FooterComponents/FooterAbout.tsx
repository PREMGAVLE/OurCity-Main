import { Link } from "react-router-dom";

const FooterAbout = () => {
  const links = [
   { name: "Contact Us", href: "/contact" },
   { name: "About Us", href: "/contact" },
    { name: "Privacy Policy", href: "/contact" },
  ];

  return (
    <div className="">
      <h3 className="font-bold text-lg mb-4">About Us</h3>
      <ul className="text-md font-normal space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.href} className="hover:text-pink-500 transition">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterAbout;
