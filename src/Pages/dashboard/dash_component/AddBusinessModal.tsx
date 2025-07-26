import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "@/axois";
import toast from "react-hot-toast";

interface AddBusinessModalProps {
  open: boolean;
  onClose: () => void;
  fetchBusinesses: () => void;
  initialData?: any;
}

const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  open,
  onClose,
  fetchBusinesses,
  initialData = null,
}) => {
  const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
  const [subcategories, setSubcategories] = useState<Array<{ _id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    if (open) fetchCategories();

    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        subcategory: initialData.subcategory || "",
        description: initialData.description || "",
        street: initialData.address?.street || "",
        city: initialData.address?.city || "",
        state: initialData.address?.state || "",
        pincode: initialData.address?.pincode || "",
        phone: initialData.contact?.phone || "",
        email: initialData.contact?.email || "",
        facebook: initialData.socialLinks?.facebook || "",
        instagram: initialData.socialLinks?.instagram || "",
      });
      if (initialData.category) fetchSubcategories(initialData.category);
    } else {
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        description: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
      });
    }
  }, [open, initialData]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getCategory");
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const res = await axios.get(`/subcategory/getSubCategory/${categoryId}`);
      setSubcategories(res.data?.result || []);
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, category: value, subcategory: "" }));
    await fetchSubcategories(value);
  };

  const handleSubcategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subcategory: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("User not logged in");

    const payload = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      description: formData.description,
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
      socialLinks: {
        facebook: formData.facebook,
        instagram: formData.instagram,
      },
      owner: userId,
    };

    try {
      setLoading(true);
      if (initialData?._id) {
        await axios.put(`/bussiness/updateBuss/${initialData._id}`, payload);
        toast.success("Business updated successfully");
      } else {
        await axios.post("/bussiness/registerBuss", payload);
        toast.success("Business registered successfully");
      }
      fetchBusinesses();
      onClose();
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full overflow-y-auto max-h-[90vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {initialData ? "Update Business" : "Add New Business"}
          </DialogTitle>
          <DialogDescription>Fill in the business details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Business Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subcategory</Label>
              <Select value={formData.subcategory} onValueChange={handleSubcategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label>Street</Label>
              <Input name="street" value={formData.street} onChange={handleChange} />
            </div>
            <div>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <Label>State</Label>
              <Input name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input name="pincode" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Facebook</Label>
              <Input name="facebook" value={formData.facebook} onChange={handleChange} />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input name="instagram" value={formData.instagram} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the business"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading
                ? "Submitting..."
                : initialData
                ? "Update Business"
                : "Add Business"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBusinessModal;
