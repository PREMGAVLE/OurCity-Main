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
import AddBusinessModal from "./AddBusinessModal"; // ✅ Import Modal

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
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
        >
          <Plus size={18} className="mr-2" />
          Add New Business
        </button>
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredBusinesses.map((business) => (
          <div key={business._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-r from-purple-600 to-purple-700 relative">
              <img
                src={business.image || "https://via.placeholder.com/400x300"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              {business.status && (
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(business.status)}`}>
                    {business.status}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{business.name}</h3>
              <p className="text-sm text-purple-600">{business.category || "Uncategorized"}</p>
              <div className="text-sm mt-2 space-y-1">
                <div className="flex items-center text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  <span className="truncate">
                    {business.address.street}, {business.address.city}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={14} className="mr-2" />
                  {business.contact.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe size={14} className="mr-2" />
                  {business.contact.website}
                </div>
              </div>
              <div className="flex mt-4 gap-2">
                <button className="bg-purple-50 text-purple-600 px-3 py-2 rounded text-sm flex-1">
                  <Eye size={14} className="mr-1 inline" /> View
                </button>
                <button
                  onClick={() => handleEditClick(business)}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm flex-1"
                >
                  <Edit size={14} className="mr-1 inline" /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center bg-white p-4 rounded shadow-sm border">
          <div className="text-xl font-bold text-purple-600">{businesses.length}</div>
          <div className="text-sm text-gray-600">Total Listings</div>
        </div>
        <div className="text-center bg-white p-4 rounded shadow-sm border">
          <div className="text-xl font-bold text-green-600">{countByStatus("active")}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="text-center bg-white p-4 rounded shadow-sm border">
          <div className="text-xl font-bold text-yellow-600">{countByStatus("pending")}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="text-center bg-white p-4 rounded shadow-sm border">
          <div className="text-xl font-bold text-red-600">{countByStatus("inactive")}</div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
      </div>

      {/* Add Modal */}
      <AddBusinessModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        fetchBusinesses={fetchBusinesses}
      />
    </div>
  );
};
