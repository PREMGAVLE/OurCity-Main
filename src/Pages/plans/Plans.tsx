import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Plan {
  _id: string;
  name: string;
  price: number;
  offerPrice: number;
  type: "Monthly" | "Yearly";
  validity: string;
  features: string[];
}

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          "https://burhanpur-city-backend-mfs4.onrender.com/api/plan/GetAllPlans"
        );
        setPlans(res.data.result || []);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(
    (plan) => plan.type.toLowerCase() === (isYearly ? "yearly" : "monthly")
  );

  const handleBuyPlan = () => {
    const token = localStorage.getItem("authToken");
    navigate(token ? "/payment" : "/login");
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow">
        Our <span className="text-purple-600">Pricing Plan</span>
      </h1>
      <p className="text-gray-500 text-center max-w-2xl mb-10 text-lg">
        Choose a plan that works best for your needs. Transparent pricing, no
        hidden fees.
      </p>

      {/* Toggle Switch */}
      <div className="mb-12">
        <div className="relative flex items-center bg-purple-600 rounded-full w-64 h-11 p-1 shadow-md">
          <div
            className={`absolute inset-[2px] w-1/2 rounded-full bg-white transition-transform duration-300 ${
              isYearly ? "translate-x-[calc(100%-4px)]" : "translate-x-0"
            }`}
          ></div>
          <button
            onClick={() => setIsYearly(false)}
            className={`w-1/2 z-10 text-center text-sm font-semibold transition-colors ${
              !isYearly ? "text-purple-600" : "text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`w-1/2 z-10 text-center text-sm font-semibold transition-colors ${
              isYearly ? "text-purple-600" : "text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-7xl px-4">
        {filteredPlans.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">
            No plans available.
          </p>
        ) : (
          filteredPlans.map((plan, index) => {
  const isExpanded = expandedId === plan._id;
  const displayedFeatures = isExpanded ? plan.features : plan.features.slice(0, 3);

  // Tag label and color based on index
  const tagLabels = ["Starter", "Best Seller", "Recommended"];
  const tagColors = [
    "bg-green-100 text-green-800 border-green-300",
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-blue-100 text-blue-800 border-blue-300",
  ];

  const tag = tagLabels[index] || "Popular";
  const tagColor = tagColors[index] || "bg-purple-100 text-purple-800 border-purple-300";

  return (
    <div
      key={plan._id}
      className="bg-white hover:bg-purple-50 transition-transform duration-300 transform hover:scale-105 p-8 rounded-3xl text-center border border-gray-200 hover:border-purple-400 shadow-xl relative"
    >
      {/* Tag Badge */}
      <span
        className={`absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold py-2 px-5 rounded-full shadow-md border ${tagColor}`}
      >
        {tag}
      </span>

      <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">{plan.name}</h3>

      <div className="mb-6">
        <div className="text-gray-400 text-lg line-through">₹{plan.price}</div>
        <div className="text-4xl font-bold text-purple-600">
          ₹{plan.offerPrice}
          <span className="text-base text-gray-500 font-medium">
            {isYearly ? " /year" : " /month"}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col items-center text-left gap-2 ml-14 mb-4">
        {displayedFeatures.map((item, i) => (
          <li key={i} className="text-gray-700 w-full max-w-xs">
            ✅ {item}
          </li>
        ))}

        {(plan.name === "Enterprise Elite" || plan.name === "Basic") && (
          <>
            <li className="text-gray-400 line-through w-full max-w-xs">❌ Team Collaboration</li>
            <li className="text-gray-400 line-through w-full max-w-xs">❌ AI Tools</li>
          </>
        )}
      </ul>

      {plan.features.length > 3 && (
        <div className="mb-4">
          <button
            onClick={() => toggleExpand(plan._id)}
            className="text-sm text-purple-600 hover:underline font-semibold"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        </div>
      )}

      <button
        onClick={handleBuyPlan}
        className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-2 rounded-full font-semibold transition shadow-md hover:shadow-lg"
      >
        Buy Plan
      </button>
    </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Plans;
