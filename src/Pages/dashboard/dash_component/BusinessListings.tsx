// import { useState } from 'react';
// import { Plus, Search, MapPin, Globe, Phone, Edit, Trash2, Eye } from 'lucide-react';

// export const BusinessListings = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const businesses = [
//     {
//       id: 1,
//       name: 'Downtown Coffee Shop',
//       category: 'Food & Beverage',
//       address: '123 Main St, Downtown',
//       phone: '+1 234-567-8901',
//       website: 'www.downtowncoffee.com',
//       status: 'active',
//       rating: 4.5,
//       reviews: 124,
//       image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop'
//     },
//     {
//       id: 2,
//       name: 'TechStart Solutions',
//       category: 'Technology',
//       address: '456 Innovation Ave, Tech Park',
//       phone: '+1 234-567-8902',
//       website: 'www.techstartsolutions.com',
//       status: 'active',
//       rating: 4.8,
//       reviews: 89,
//       image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
//     },
//     {
//       id: 3,
//       name: 'Green Garden Landscaping',
//       category: 'Home Services',
//       address: '789 Garden Blvd, Suburbia',
//       phone: '+1 234-567-8903',
//       website: 'www.greengarden.com',
//       status: 'pending',
//       rating: 4.2,
//       reviews: 67,
//       image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
//     },
//     {
//       id: 4,
//       name: 'Fitness Plus Gym',
//       category: 'Health & Fitness',
//       address: '321 Workout Way, Fitness District',
//       phone: '+1 234-567-8904',
//       website: 'www.fitnessplus.com',
//       status: 'active',
//       rating: 4.6,
//       reviews: 203,
//       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-700';
//       case 'pending': return 'bg-yellow-100 text-yellow-700';
//       case 'inactive': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const filteredBusinesses = businesses.filter(business =>
//     business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     business.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Business Listings</h2>
//           <p className="text-sm sm:text-base text-gray-600">Manage your business listings and profiles</p>
//         </div>
//         <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base">
//           <Plus size={18} className="mr-2" />
//           Add New Business
//         </button>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search businesses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//           />
//         </div>
//       </div>

//       {/* Business Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//         {filteredBusinesses.map((business) => (
//           <div key={business.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
//             {/* Business Image */}
//             <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
//               <img
//                 src={business.image}
//                 alt={business.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
//                 <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${getStatusColor(business.status)}`}>
//                   {business.status}
//                 </span>
//               </div>
//             </div>

//             {/* Business Info */}
//             <div className="p-4 sm:p-5 md:p-6">
//               <div className="mb-3 sm:mb-4">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">{business.name}</h3>
//                 <p className="text-xs sm:text-sm text-purple-600 font-medium">{business.category}</p>
//               </div>

//               <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
//                 <div className="flex items-center text-xs sm:text-sm text-gray-600">
//                   <MapPin size={12} className="mr-2 text-gray-400 flex-shrink-0" />
//                   <span className="truncate">{business.address}</span>
//                 </div>
//                 <div className="flex items-center text-xs sm:text-sm text-gray-600">
//                   <Phone size={12} className="mr-2 text-gray-400 flex-shrink-0" />
//                   <span>{business.phone}</span>
//                 </div>
//                 <div className="flex items-center text-xs sm:text-sm text-gray-600">
//                   <Globe size={12} className="mr-2 text-gray-400 flex-shrink-0" />
//                   <span className="truncate">{business.website}</span>
//                 </div>
//               </div>

//               {/* Rating */}
//               <div className="flex items-center mb-3 sm:mb-4">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} className={`text-sm ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="ml-2 text-xs sm:text-sm text-gray-600">
//                   {business.rating} ({business.reviews} reviews)
//                 </span>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2">
//                 <button className="flex-1 bg-purple-50 text-purple-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center text-xs sm:text-sm">
//                   <Eye size={14} className="mr-1 sm:mr-2" />
//                   View
//                 </button>
//                 <button className="flex-1 bg-gray-50 text-gray-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center text-xs sm:text-sm">
//                   <Edit size={14} className="mr-1 sm:mr-2" />
//                   Edit
//                 </button>
//                 <button className="px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
//           <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">24</div>
//           <div className="text-xs sm:text-sm text-gray-600">Total Listings</div>
//         </div>
//         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
//           <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1 sm:mb-2">18</div>
//           <div className="text-xs sm:text-sm text-gray-600">Active</div>
//         </div>
//         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
//           <div className="text-lg sm:text-2xl font-bold text-yellow-600 mb-1 sm:mb-2">4</div>
//           <div className="text-xs sm:text-sm text-gray-600">Pending</div>
//         </div>
//         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
//           <div className="text-lg sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">2</div>
//           <div className="text-xs sm:text-sm text-gray-600">Inactive</div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Globe,
  Phone,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import axios from "@/axois";
import AddBusinessModal from "./AddBusinessModal";
import { useDisclosure} from "@chakra-ui/react";
// import {
//   Button,
//    Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Select,
// } from "@chakra-ui/react";

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface Contact {
  phone: string;
  email: string;
  website: string;
}

interface Business {
  _id: string;
  name: string;
  description: string;
  category?: string;
  image?: string;
  status?: "active" | "pending" | "inactive";
  address: Address;
  contact: Contact;
}

export const BusinessListings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get("/bussiness/getMyBuss");
      setBusinesses(res.data?.result || []);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    } finally {
      setLoading(false);
    }
  };

   const handleAddBusiness = async (newBusiness: any) => {
    try {
      const res = await axios.post("/bussiness/create", newBusiness);
      fetchBusinesses();
      onClose();
    } catch (err) {
      console.error("Add failed:", err);
    }
  };


  const handleEditClick = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedBusiness) return;
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1] as keyof Address;
      setSelectedBusiness((prev) => ({
        ...prev!,
        address: { ...prev!.address, [key]: value },
      }));
    } else if (name.startsWith("contact.")) {
      const key = name.split(".")[1] as keyof Contact;
      setSelectedBusiness((prev) => ({
        ...prev!,
        contact: { ...prev!.contact, [key]: value },
      }));
    } else {
      setSelectedBusiness((prev) => ({ ...prev!, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const id = selectedBusiness?._id;
      await axios.put(`/bussiness/updateBuss/${id}`, selectedBusiness);
      setIsModalOpen(false);
      fetchBusinesses(); // Refresh after update
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const countByStatus = (status: string) =>
    businesses.filter((b) => b.status === status).length;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Business Listings
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your business listings and profiles
          </p>
        </div>
        {/* <button
          onClick={onOpen}
          className="bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
        >
          <Plus size={18} className="mr-2" />
          Add New Business
        </button> */}
        <AddBusinessModal
        
          isOpen={isOpen}
          onClose={onClose}
          onAdd={handleAddBusiness}
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredBusinesses.map((business) => (
          <div
            key={business._id}
            className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-purple-600 to-purple-700 relative overflow-hidden">
              <img
                src={business.image || "https://via.placeholder.com/400x300"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              {business.status && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${getStatusColor(
                      business.status
                    )}`}
                  >
                    {business.status}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                  {business.name}
                </h3>
                <p className="text-xs sm:text-sm text-purple-600 font-medium">
                  {business.category || "Uncategorized"}
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <MapPin
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  <span className="truncate">
                    {business.address?.street}, {business.address?.city},{" "}
                    {business.address?.state} - {business.address?.pincode}
                  </span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Phone
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  <span>{business.contact?.phone || "N/A"}</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Globe
                    size={12}
                    className="mr-2 text-gray-400 flex-shrink-0"
                  />
                  <span className="truncate">
                    {business.contact?.website || "N/A"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-50 text-purple-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center text-xs sm:text-sm">
                  <Eye size={14} className="mr-1 sm:mr-2" />
                  View
                </button>
                <button
                  onClick={() => handleEditClick(business)}
                  className="flex-1 bg-gray-50 text-gray-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center text-xs sm:text-sm"
                >
                  <Edit size={14} className="mr-1 sm:mr-2" />
                  Edit
                </button>
                <button className="px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">
            {businesses.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Total Listings</div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1 sm:mb-2">
            {countByStatus("active")}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-lg sm:text-2xl font-bold text-yellow-600 mb-1 sm:mb-2">
            {countByStatus("pending")}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center">
          <div className="text-lg sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">
            {countByStatus("inactive")}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Inactive</div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold mb-4">Edit Business</h2>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <input
                name="name"
                value={selectedBusiness.name}
                onChange={handleFormChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={selectedBusiness.description}
                onChange={handleFormChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />
              <input
                name="category"
                value={selectedBusiness.category}
                onChange={handleFormChange}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />
              <input
                name="address.street"
                value={selectedBusiness.address.street}
                onChange={handleFormChange}
                placeholder="Street"
                className="w-full border p-2 rounded"
              />
              <input
                name="address.city"
                value={selectedBusiness.address.city}
                onChange={handleFormChange}
                placeholder="City"
                className="w-full border p-2 rounded"
              />
              <input
                name="address.state"
                value={selectedBusiness.address.state}
                onChange={handleFormChange}
                placeholder="State"
                className="w-full border p-2 rounded"
              />
              <input
                name="address.pincode"
                value={selectedBusiness.address.pincode}
                onChange={handleFormChange}
                placeholder="Pincode"
                className="w-full border p-2 rounded"
              />
              <input
                name="contact.phone"
                value={selectedBusiness.contact.phone}
                onChange={handleFormChange}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />
              <input
                name="contact.email"
                value={selectedBusiness.contact.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <input
                name="contact.website"
                value={selectedBusiness.contact.website}
                onChange={handleFormChange}
                placeholder="Website"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={handleUpdate}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
