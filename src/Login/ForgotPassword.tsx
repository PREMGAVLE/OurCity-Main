import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [forgotPhone, setForgotPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!forgotPhone.trim() || !newPassword.trim()) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(
        "/Users/Updateuser",
        {
          phone: forgotPhone.trim(),
          password: newPassword,
        }
      );

      toast.success("Password updated successfully!");
      setForgotPhone("");
      setNewPassword("");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to update password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-purple-500 p-4">
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-purple-600">
          Forgot Password
        </h2>

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={forgotPhone}
          onChange={(e) => setForgotPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition duration-300"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
