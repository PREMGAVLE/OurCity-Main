"use client";

import React, { useEffect,useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import axios from "@/axois";
// import axios from "axios";


type BusinessFormData = {
  name: string;
  description: string;
  category: string;
  address: string;
  contact: string;
};



type AddBusinessModalProps = {
  onAddBusiness: (data: BusinessFormData) => void;
};

const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ onAddBusiness }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<BusinessFormData>({
    name: "",
    description: "",
    category: "",
    address: "",
    contact: "",
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category/getCategory",{
            headers: {
          "Cache-Control": "no-cache", // 🔄 Force fresh data
        },

        });
           console.log("✅ API Response:", res);                  // Entire response
      console.log("✅ Categories Array:", res.data.data); 
        setCategories(res.data.data || []);
        

      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (open) fetchCategories();

  }, [open]);

  const handleSubmit = () => {
    onAddBusiness(formData);
    setFormData({
      name: "",
      description: "",
      category: "",
      address: "",
      contact: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base">  <Plus className="w-4 h-4" /> Add New Business</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[100vw] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Business</DialogTitle>
          <DialogDescription>
            Fill out the form to add a business to the list.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter business name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter business description"
              required
            />
          </div>

            <select
            // placeholder="Select Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Business address"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone or email"
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBusinessModal;
