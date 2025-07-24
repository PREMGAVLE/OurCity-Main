// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Props {
//   onAddBusiness?: (newBusiness: any) => void;
// }

// const RegisterBusinessForm: React.FC<Props> = ({ onAddBusiness }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     description: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     email: "",
//     facebook: "",
//     instagram: "",
//     owner: "",
//   });

//   const [categories, setCategories] = useState<string[]>([]);
//   const [owners, setOwners] = useState<{ name: string }[]>([]);

//   const [responseMsg, setResponseMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch categories and owners
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryRes = await axios.get(
//           "https://burhanpur-city-backend-mfs4.onrender.com/api/category/getCategory"
//         );
//         console.log("Category API Response:", categoryRes.data.data);

//         setCategories(categoryRes.data.data);

//         const ownerRes = await axios.get(
//           "https://burhanpur-city-backend-mfs4.onrender.com/api/user/getUser"
//         );
//         console.log("Owner API Response:", ownerRes.data);

//         const ownerData = Array.isArray(ownerRes.data)
//           ? ownerRes.data
//           : ownerRes.data.users || [];

//         setOwners(ownerData);
//       } catch (error) {
//         console.error("Error fetching categories or owners:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponseMsg("");
//     try {
//       await axios.post(
//         "https://burhanpur-city-backend-mfs4.onrender.com/api/bussiness/registerBuss",
//         formData
//       );
//       setResponseMsg("✅ Business registered successfully!");

//       // Call parent handler
//       if (onAddBusiness) {
//         onAddBusiness(formData);
//       }

//       // Reset form
//       setFormData({
//         name: "",
//         category: "",
//         description: "",
//         street: "",
//         city: "",
//         state: "",
//         pincode: "",
//         phone: "",
//         email: "",
//         facebook: "",
//         instagram: "",
//         owner: "",
//       });
//     } catch (error: any) {
//       setResponseMsg(
//         error.response?.data?.message || "❌ Something went wrong!"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-gray-200">
//       <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
//         Register Your Business
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Business Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat, idx) => (
//               <option key={idx} value={cat}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {[
//           { label: "Business Name", name: "name" },
//           { label: "Category", name: "category" },
//           { label: "Street", name: "street" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Pincode", name: "pincode" },
//           { label: "Phone", name: "phone" },
//           { label: "Email", name: "email" },
//           { label: "Facebook URL", name: "facebook" },
//           { label: "Instagram URL", name: "instagram" },
//           { label: "Owner Name", name: "owner" },
//         ].map((field) => (
//           <div key={field.name} className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700 mb-1">
//               {field.label}
//             </label>
//             <input
//               type="text"
//               name={field.name}
//               value={(formData as any)[field.name]}
//               onChange={handleChange}
//               required
//               className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
//             />
//           </div>
//         ))}

//         {/* Description */}
//         <div className="md:col-span-2 flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28 shadow-sm"
//           ></textarea>
//         </div>

//         <div className="md:col-span-2 flex justify-center mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md"
//           >
//             {loading ? "Registering..." : "Register Business"}
//           </button>
//         </div>

//         {responseMsg && (
//           <div className="md:col-span-2 text-center mt-4 text-blue-700 font-medium">
//             {responseMsg}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default RegisterBusinessForm;
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  onAddBusiness?: (newBusiness: any) => void;
}

const RegisterBusinessForm: React.FC<Props> = ({ onAddBusiness }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    owner: "", // Will be set from localStorage dynamically
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await axios.get(
          "https://burhanpur-city-backend-mfs4.onrender.com/api/category/getCategory"
        );
        setCategories(categoryRes.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setResponseMsg("");

  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setResponseMsg("❌ Token not found. Please login again.");
      setLoading(false);
      return;
    }

    // Step 1: Get owner ID from userDetails
    const userRes = await axios.get(
      "https://burhanpur-city-backend-mfs4.onrender.com/api/Users/userDetails",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const ownerData = userRes.data?.result;

    if (!Array.isArray(ownerData) || ownerData.length === 0) {
      setResponseMsg("❌ No valid user found.");
      setLoading(false);
      return;
    }

    const ownerId = ownerData[0]?._id;

    if (!ownerId) {
      setResponseMsg("❌ Failed to extract owner ID.");
      setLoading(false);
      return;
    }

    // Step 2: Structure data correctly for API
    const dataToSend = {
      name: formData.name,
      category: formData.category, // Should be ObjectId of category
      description: formData.description,
      owner: ownerId,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      contact: {
        phone: formData.phone,
        email: formData.email,
      },
      social: {
        facebook: formData.facebook,
        instagram: formData.instagram,
      },
    };

    console.log("📤 Sending:", dataToSend);

    // Step 3: Send to API
    const registerRes = await axios.post(
      "https://burhanpur-city-backend-mfs4.onrender.com/api/bussiness/registerBuss",
      dataToSend,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const createdBusiness = registerRes.data?.result;

    if (createdBusiness) {
      setResponseMsg("✅ Business registered successfully!");
      console.log("🟢 Created Business:", createdBusiness);

      // Push to parent list
      if (onAddBusiness) {
        onAddBusiness(createdBusiness); // use API returned business
      }

      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        owner: "",
      });
    } else {
      setResponseMsg("❌ API did not return created business.");
    }
  } catch (error: any) {
    console.error("⛔ Registration Error:", error.response?.data || error.message);
    setResponseMsg(error.response?.data?.message || "❌ Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-br from-white to-purple-400 rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
        Register Your Business
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Business Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat: any, idx: number) => (
              <option key={idx} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining input fields */}
        {[
          { label: "Street", name: "street" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Facebook URL", name: "facebook" },
          { label: "Instagram URL", name: "instagram" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
        ))}

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28 shadow-sm"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-300 text-black font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md"
          >
            {loading ? "Registering..." : "Register Business"}
          </button>
        </div>

        {responseMsg && (
          <div className="md:col-span-2 text-center mt-4 text-blue-700 font-medium">
            {responseMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterBusinessForm;
