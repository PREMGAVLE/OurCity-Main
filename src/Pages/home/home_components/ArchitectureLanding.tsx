
import { useEffect, useState, useRef, FormEvent, JSX } from "react";
import { FaSearch } from "react-icons/fa";
import gurudwara from "../../../../public/assets/gurudwara.jpg";
import rajakichatri from "../../../../public/assets/rajakichatri.jpg";
import shanwara from "../../../../public/assets/shanwaraMain.jpg";
import shahiqila from "../../../../public/assets/shahiqila.jpg";
import railway from "../../../../public/assets/detailrailway1.png";
import Adds from "../../Adds/adds/Adds";

const images: string[] = [gurudwara, rajakichatri, shanwara, shahiqila, railway];

function ArchitectureLanding(): JSX.Element {
  const [showFlipText, setShowFlipText] = useState(false);
  const [showFadeText, setShowFadeText] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const headingRef = useRef<HTMLDivElement | null>(null);

  const triggerAnimations = (): void => {
    setShowFlipText(false);
    setShowFadeText(false);
    setShowSearchBox(false);
    setTimeout(() => setShowFlipText(true), 100);
    setTimeout(() => setShowFadeText(true), 400);
    setTimeout(() => setShowSearchBox(true), 700);
  };

  useEffect(() => {
    triggerAnimations();
    if (!headingRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) triggerAnimations();
      });
    }, { threshold: 0.5 });

    observer.observe(headingRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Search submitted!");
  };

  return (
    <>
      <style>{`
        @keyframes flipInX {
          0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
          100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
        }
        .animate-flipInX {
          animation: flipInX 0.8s ease forwards;
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem !important;
          }
          p {
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <div style={{
        // border:'1px solid red',
        top:'-79.90px'
      }} className="relative w-full overflow-hidden pt-0">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Background"
              className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
                i === currentBg ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Ad Section */}
        <div className="pt-4 bg-transparent w-full">
          <Adds />
        </div>

        {/* Foreground content */}
        <div
          ref={headingRef}
          className="relative z-10 flex flex-col items-center justify-start text-center text-white px-4 sm:px-6 h-full pt-14 sm:pt-24"
        >
          <h1
            className={`text-2xl sm:text-4xl md:text-5xl  font-bold mb-2 max-w-2xl ${
              showFlipText ? "animate-flipInX" : "opacity-0"
            }`}
          >
            Welcome to <br /> The Historical City of Heritage & Glory
          </h1>

          <p
            className={`text-md sm:text-lg max-w-xl mb-3 mt-4 transition-opacity duration-700 ${
              showFadeText ? "opacity-100" : "opacity-0"
            }`}
          >
            Discover the hidden gems of Mughal brilliance, majestic forts, and sacred
            shrines that have gracefully stood the test of time in the heart of Madhya Pradesh.
          </p>

          {showSearchBox && (
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/90 rounded-[2rem] shadow-lg max-w-[700px] w-[90%] flex flex-col sm:flex-row items-center gap-3 justify-center px-4 py-3 sm:px-6 sm:py-4 z-20 relative transition-shadow hover:shadow-xl + mt-2 sm:mt-0"
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                spellCheck={false}
                required
                aria-label="Search query"
                className="flex-1 text-black placeholder-gray-500 bg-gray-100 px-4 py-2 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 w-full sm:w-auto"
              />

              <select
                aria-label="Select category"
                defaultValue="Places"
                className="text-black bg-gray-100 px-4 py-2 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 w-full sm:w-[130px]"
              >
                <option value="Places">🏰 Places</option>
                <option value="Hotels">🏨 Hotels</option>
                <option value="Restaurants">🍽 Restaurants</option>
                <option value="Events">🎉 Events</option>
                <option value="Shops">🛍 Shops</option>
              </select>

              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold px-6 py-2 rounded-full shadow-md flex items-center gap-2 text-sm sm:text-base hover:from-pink-600 hover:to-yellow-500 transition-all w-full sm:w-auto justify-center"
              >
                Search <FaSearch />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ArchitectureLanding;
