import React, { useEffect } from "react";
import RegisterPage from "@/Pages/registration/Registration";
import axios from "@/axois";

interface Props {
  onClose: () => void;
  setUser: (user: any) => void;
}

const RegisterModal: React.FC<Props> = ({ onClose, setUser }) => {
  const handleClose = async () => {
    onClose();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get("/Users/adminLogin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user after modal close", err);
      }
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-md mx-4 p-6 rounded-3xl
          bg-[rgba(221,214,243,0.2)] backdrop-blur-xl
          border border-purple-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          transition-all duration-300"
      >
        <RegisterPage onClose={handleClose} />
        {/* Optional close button */}
        {/* <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-purple-800 hover:text-purple-600 text-xl font-bold transition-transform hover:scale-125"
          aria-label="Close"
        >
          ✕
        </button> */}
      </div>
    </div>
  );
};

export default RegisterModal;