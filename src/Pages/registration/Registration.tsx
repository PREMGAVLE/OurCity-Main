import { useState, ChangeEvent, FormEvent } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";
import axios from "@/axois";
 
  // ✅ Make sure spelling is correct!

interface RegistrationProps {
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "user" | "owner";
}

const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword, role } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        name,
        email,
        phone,
        password,
        role,
        owner: role === "owner" ? name : "",
      };

      await axios.post("/Users/createUser", payload); // ✅ res removed
      toast.success("🎉 Registration successful!");
      setIsLogin(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const formattedPhone = loginPhone.replace(/\s+/g, "").trim();

    try {
      const res = await axios.post("/Users/adminLogin", {
        phone: formattedPhone,
        password,
      });

      console.log("API Response:", res.data.result);

      const token = res.data.result;
      if (!token) {
        setError("Token not found.");
        return;
      }
      localStorage.setItem("authToken", token);

      await axios.get("/Users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // ✅ userRes removed

      if (onClose) onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          >
            <FiX size={24} />
          </button>
        )}

        {/* Tabs */}
        <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
          <button
            className={`w-1/2 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              !isLogin ? "bg-purple-600 text-white shadow-md" : "text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              isLogin ? "bg-purple-600 text-white shadow-md" : "text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          {isLogin ? "Admin Login" : "Create Account"}
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        {/* Login Form */}
        {isLogin ? (
          <>
            <input
              type="tel"
              placeholder="Phone"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiLock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </>
        ) : (
          // Registration Form
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
