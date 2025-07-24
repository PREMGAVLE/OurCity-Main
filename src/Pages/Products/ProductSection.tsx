import React, { useEffect, useState } from "react";
import Bags from "../../../public/assets/school-bag.jpg";
import Bags2 from "../../../public/assets/bag2.jpeg";
import KitchenSet from "../../../public/assets/stainless-steel-kitchen-utensils.jpg";
import KitchenSet2 from "../../../public/assets/kitchenset2.jpeg";
import BandhaniSuit from "../../../public/assets/Bandhani suit.jpg";
import BandhaniSuit2 from "../../../public/assets/bandhanisuit2.jpg";
import Mirror from "../../../public/assets/mirror.jpg";
import Mirror2 from "../../../public/assets/mirror2.jpg";
import WallClock from "../../../public/assets/wooden clock.jpg";
import WallClock2 from "../../../public/assets/wall clock.jpg";
import DiyaStand from "../../../public/assets/diya stand.jpeg";
import DiyaStand2 from "../../../public/assets/diya stand2.jpeg";
import CushanCover from "../../../public/assets/handmade embridery.jpg";
import CushanCover2 from "../../../public/assets/cushancover2.jpeg";
import WoodenBowl from "../../../public/assets/wooden bowl.jpeg";
import WoodenBowl2 from "../../../public/assets/wooden bowl2.jpg";

const products = [
  {
    id: 1,
    image: [Bags, Bags2],
    name: "Duty Free Bags",
    price: "10 INR (Approx.)",
    unit: "Piece/Pieces",
    brand: "DHWANI POLYPRINTS",
  },
  {
    id: 2,
    image: [KitchenSet, KitchenSet2],
    name: "Stainless Steel Kitchen Utensil Set",
    price: "999 INR (Approx.)",
    unit: "Set",
    brand: "KITCHEN CLASSIC",
  },
  {
    id: 3,
    image: [BandhaniSuit, BandhaniSuit2],
    name: "Designer Printed Bandhani Suit",
    price: "500 INR (Approx.)",
    unit: "Piece/Pieces",
    brand: "JAYSHREE BANDHEJ",
  },
  {
    id: 4,
    image: [Mirror, Mirror2],
    name: "Vintage Handcrafted Brass Mirror",
    price: "1,499 INR",
    unit: "Piece",
    brand: "ROYAL HERITAGE",
  },
  {
    id: 5,
    image: [WallClock, WallClock2],
    name: "Antique Wooden Wall Clock",
    price: "2,299 INR",
    unit: "Piece",
    brand: "TIME CRAFT",
  },
  {
    id: 6,
    image: [DiyaStand, DiyaStand2],
    name: "Decorative Brass Diya with Stand",
    price: "599 INR",
    unit: "Piece",
    brand: "DIVINE LIGHT",
  },
  {
    id: 7,
    image: [CushanCover, CushanCover2],
    name: "Embroidery Cushion Cover",
    price: "299 INR",
    unit: "Piece",
    brand: "HAND CRAFT HOME",
  },
  {
    id: 8,
    image: [WoodenBowl, WoodenBowl2],
    name: "Handmade Wooden Bowl",
    price: "499 INR",
    unit: "Piece",
    brand: "ARTSY WOODWORK",
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [index, setIndex] = useState(0);

  const images = Array.isArray(product.image) ? product.image : [product.image];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition transform hover:scale-105 duration-300 flex flex-col h-full">
      {/* 👇 Image with fixed height and scale */}
      <img
        src={images[index]}
        alt={product.name}
        className="w-full h-40 object-contain p-2 bg-white rounded-t-xl transition-all duration-500 ease-in-out"
      />

      {/* 👇 Content with space fill */}
      <div className="px-3 pb-3 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm truncate">
            {product.name}
          </h3>
          <p className="text-[13px] text-gray-600">
            {product.price}{" "}
            <span className="text-gray-400 text-xs">{product.unit}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">{product.brand}</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded-md transition">
            Inquiry 📩
          </button>
          <button className="w-1/2 bg-green-600 hover:bg-green-700 text-white text-xs py-1 rounded-md transition">
            Add 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <section className="py-10 px-4 bg-gray-50" id="products">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
