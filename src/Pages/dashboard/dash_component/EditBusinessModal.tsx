import React from "react";

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
  category: string;
  address: Address;
  contact: Contact;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  business: Business | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUpdate: () => void;
}

const EditBusinessModal: React.FC<Props> = ({
  isOpen,
  onClose,
  business,
  onChange,
  onUpdate,
}) => {
  if (!isOpen || !business) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Edit Business</h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <input name="name" value={business.name} onChange={onChange} placeholder="Name" className="w-full border p-2 rounded" />
          <textarea name="description" value={business.description} onChange={onChange} placeholder="Description" className="w-full border p-2 rounded" />
          <input name="category" value={business.category} onChange={onChange} placeholder="Category" className="w-full border p-2 rounded" />

          <input name="address.street" value={business.address.street} onChange={onChange} placeholder="Street" className="w-full border p-2 rounded" />
          <input name="address.city" value={business.address.city} onChange={onChange} placeholder="City" className="w-full border p-2 rounded" />
          <input name="address.state" value={business.address.state} onChange={onChange} placeholder="State" className="w-full border p-2 rounded" />
          <input name="address.pincode" value={business.address.pincode} onChange={onChange} placeholder="Pincode" className="w-full border p-2 rounded" />

          <input name="contact.phone" value={business.contact.phone} onChange={onChange} placeholder="Phone" className="w-full border p-2 rounded" />
          <input name="contact.email" value={business.contact.email} onChange={onChange} placeholder="Email" className="w-full border p-2 rounded" />
          <input name="contact.website" value={business.contact.website} onChange={onChange} placeholder="Website" className="w-full border p-2 rounded" />
        </div>

        <div className="flex justify-end mt-5">
          <button onClick={onUpdate} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessModal;
