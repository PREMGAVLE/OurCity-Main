import   { useEffect, useState } from "react";
import axios from "axios";
import RegisterBusinessForm from "./RegisterBusinessForm";
import EditBusinessForm from "./EditBusinessForm";
import { Edit, Trash2, Eye } from "lucide-react";

interface BusinessType {
  _id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

const Business = () => {
  const [showForm, setShowForm] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBiz, setEditingBiz] = useState<BusinessType | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. User might not be logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://burhanpur-city-backend-mfs4.onrender.com/api/bussiness/getMyBuss",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusinesses(response.data.result || []);
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleAddBusiness = (newBusiness: BusinessType) => {
    setBusinesses((prev) => [newBusiness, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this business?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(
        `https://burhanpur-city-backend-mfs4.onrender.com/api/bussiness/deleteBuss/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBusinesses((prev) => prev.filter((biz) => biz._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete business.");
    }
  };

  const handleEdit = (biz: BusinessType) => {
    setEditingBiz(biz);
  };

  const handleUpdateSuccess = (updated: BusinessType) => {
    setBusinesses((prev) =>
      prev.map((b) => (b._id === updated._id ? updated : b))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-1">
      {/* Header */}
      <div className="sticky bg-gradient-to-r from-purple-400 to-purple-800 text-white rounded-t-2xl py-4 px-4 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">🏢 Our Business</h2>
            <p className="mt-1 text-xs sm:text-sm opacity-90">Your registered business information</p>
          </div>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="font-semibold text-base sm:text-lg bg-white text-purple-800 px-4 py-2 rounded-md hover:bg-purple-100 transition w-full sm:w-auto"
          >
            ➕ Add Business
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <RegisterBusinessForm onAddBusiness={handleAddBusiness} />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Businesses", value: businesses.length.toString(), bg: "bg-purple-100" },
          { label: "Active", value: businesses.length.toString(), bg: "bg-green-100" },
          { label: "Leads", value: "24", bg: "bg-blue-100" },
          { label: "Revenue", value: "₹2.5L", bg: "bg-yellow-100" },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-xl p-4 shadow-sm ${stat.bg}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading businesses...</p>
        ) : businesses.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No businesses registered yet.</p>
        ) : (
          businesses.map((biz) => (
            <div
              key={biz._id}
              className="max-w-sm w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white"
            >
              {/* Banner */}
              <div className="bg-gradient-to-r from-purple-500 to-white-600 h-40 flex items-center justify-center relative">
                <div className="text-white text-3xl font-bold uppercase">{biz.name.charAt(0)}</div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">{biz.name}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-yellow-500">
                      <Eye className="h-5 w-4 " />
                    </button>
                    <button onClick={() => handleEdit(biz)} className="p-1 text-gray-400 hover:text-green-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(biz._id)} className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{biz.description}</p>

                {/* Address */}
                <div className="text-sm text-gray-700 mb-3">
                  <p className="font-medium mb-1 text-purple-700">📍 Address</p>
                  <p>{biz.address?.street}</p>
                  <p>
                    {biz.address?.city}, {biz.address?.state} - {biz.address?.pincode}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-gray-700 mb-4">
                  <p className="font-medium text-rose-700 mb-1">📞 Contact</p>
                  <p>{biz.contact?.phone}</p>
                  {biz.contact?.email && <p>{biz.contact.email}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Form Modal */}
      {editingBiz && (
        <EditBusinessForm
          business={editingBiz}
          onClose={() => setEditingBiz(null)}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default Business;
