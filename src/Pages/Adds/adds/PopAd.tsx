import React, { useEffect, useState } from "react";
import adImage from "../../../../public/assets/1st.jpg"; // ✅ Update path if needed

const PopAd: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768; // ✅ Only show on mobile width
      if (window.scrollY > 100 && isMobile && !hasClosed) {
        setShowPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasClosed]);

  const handleClose = () => {
    setShowPopup(false);
    setHasClosed(true);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-7 right-5 z-[9999] w-[90%] max-w-[370px] bg-blue-600 rounded-xl shadow-xl text-white overflow-hidden md:hidden">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-3 text-white text-2xl font-bold z-10"
      >
        ×
      </button>

      <div className="flex items-center px-4 py-5">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-sm">Connect with</h2>
          <h1 className="text-xl font-bold text-yellow-300">19.1 Crore+ Buyers</h1>
          <p className="text-sm mb-3">Grow Your Business in 3 Easy Steps</p>
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition-all">
            List your Business for FREE
          </button>
        </div>

        {/* Image */}
        <img
          src={adImage}
          alt="Ad Visual"
          className="w-24 h-24 object-contain ml-2"
        />
      </div>
    </div>
  );
};

export default PopAd;
