import React, { useState } from "react";
import axios from "axios";

interface EditBusinessFormProps {
  business: any;
  onClose: () => void;
  onUpdate: (updatedBiz: any) => void;
}

const EditBusinessForm: React.FC<EditBusinessFormProps> = ({ business, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    _id: business._id,
    name: business.name || "",
    description: business.description || "",
    address: {
      street: business.address?.street || "",
      city: business.address?.city || "",
      state: business.address?.state || "",
      pincode: business.address?.pincode || "",
    },
    contact: {
      phone: business.contact?.phone || "",
      email: business.contact?.email || "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put(
        `https://burhanpur-city-backend-mfs4.onrender.com/api/bussiness/updateBuss/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(res.data.updatedBusiness || formData);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Edit Business</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="State"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="p-2 border rounded"
            />
          </div>

          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessForm;
