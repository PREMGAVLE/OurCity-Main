import React, { useRef, useEffect } from "react";
import comboImg1 from "../../../../public/assets/1st.jpg";
import comboImg2 from "../../../../public/assets/2nd.jpeg";
import comboImg3 from "../../../../public/assets/3rd.jpg";
import comboImg4 from "../../../../public/assets/4th.jpeg";
import comboImg5 from "../../../../public/assets/5th.jpeg";
import comboImg1b from "../../../../public/assets/6th.jpg";
import comboImg2b from "../../../../public/assets/7th.jpeg";
import comboImg3b from "../../../../public/assets/8th.jpeg";

const advertisements = [
  { id: 1, title: "Combo Offer", subtitle: "IMAGE + VIDEO", price: "₹998 / 365 दिन", description: "फोटो स्टेट डिज़ाइन ₹789 + ₹998 में!", image: comboImg1 },
  { id: 2, title: "Poster Design", subtitle: "LIMITED TIME", price: "₹499 Only", description: "Festival posters ₹499!", image: comboImg2 },
  { id: 3, title: "Business Card", subtitle: "CUSTOM DESIGN", price: "₹199", description: "Premium visiting cards.", image: comboImg3 },
  { id: 4, title: "Festival Package", subtitle: "FULL SET", price: "₹1499", description: "Banners & posts combo!", image: comboImg4 },
  { id: 5, title: "SPG Membership", subtitle: "OFFER ACTIVE", price: "₹999 / Year", description: "Post ads on SPG easily!", image: comboImg5 },
  { id: 6, title: "New Launch", subtitle: "HOT DEAL", price: "₹799", description: "Exclusive launch offer", image: comboImg1b },
  { id: 7, title: "Season Offer", subtitle: "SPECIAL", price: "₹1299", description: "Seasonal discounts", image: comboImg2b },
  { id: 8, title: "Mega Pack", subtitle: "LIMITED", price: "₹1899", description: "Mega combo pack", image: comboImg3b },
];

const Adds: React.FC = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileIndexRef = useRef<number>(0); // 🔁 Track current index

  useEffect(() => {
    const interval = setInterval(() => {
      const dRef = desktopRef.current;
      const mRef = mobileRef.current;

      // 🖥️ Desktop auto scroll
      if (dRef && window.innerWidth >= 640) {
        const amount = dRef.offsetWidth * 0.33;
        dRef.scrollTo({
          left: dRef.scrollLeft + amount >= dRef.scrollWidth ? 0 : dRef.scrollLeft + amount,
          behavior: "smooth",
        });
      }

      // 📱 Mobile auto scroll with remembered index
      if (mRef && window.innerWidth < 640) {
        const total = advertisements.length;
        mobileIndexRef.current = (mobileIndexRef.current + 1) % total;
        const cardWidth = mRef.offsetWidth * 0.95;

        mRef.scrollTo({
          left: cardWidth * mobileIndexRef.current,
          behavior: "smooth",
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-transparent">
      {/* ✅ Desktop View */}
      <div
        className="hidden sm:flex mt-4 px-2"
        ref={desktopRef}
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {advertisements.map((ad) => (
          <div
            key={ad.id}
            className="flex-shrink-0 snap-center w-[260px] h-[120px] bg-gradient-to-r from-pink-600 to-purple-500 text-white rounded-2xl shadow-lg p-3 relative flex items-center gap-4 mx-2"
          >
            <div className="w-[70px] h-[70px] rounded overflow-hidden">
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between h-full w-full pr-1">
              <div className="text-sm font-bold uppercase bg-yellow-300 text-black px-2 py-0.5 rounded w-fit">
                {ad.subtitle}
              </div>
              <h3 className="text-sm font-bold truncate">{ad.title}</h3>
              <p className="text-xs truncate">{ad.description}</p>
              <p className="text-sm font-semibold">{ad.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Mobile View */}
      <div className="block sm:hidden mt-14 px-4">
        <div
          ref={mobileRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar space-x-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {advertisements.map((ad) => (
            <div
              key={ad.id}
              className="snap-center flex-shrink-0 w-[90vw] min-w-[90vw] h-[200px] bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl shadow-lg p-4 relative flex items-center gap-4"
            >
              <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between h-full w-full pr-2">
                <div className="text-[10px] font-bold uppercase bg-yellow-300 text-black px-2 py-0.5 rounded w-fit">
                  {ad.subtitle}
                </div>
                <h3 className="text-sm font-bold truncate">{ad.title}</h3>
                <p className="text-xs truncate">{ad.description}</p>
                <p className="text-sm font-semibold">{ad.price}</p>
              </div>
              <div className="absolute bottom-2 right-2 text-[8px]">SPG ऐप पर</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adds;
