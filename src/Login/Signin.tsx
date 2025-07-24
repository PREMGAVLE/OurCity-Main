import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginPhone, setLoginPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const navigate = useNavigate();

  // Load saved credentials on first render
  useEffect(() => {
    const savedPhone = localStorage.getItem("savedPhone");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedRemember && savedPhone && savedPassword) {
      setLoginPhone(savedPhone);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // -----------------login function-------------------
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  // Step 1: Frontend Validation
  if (!loginPhone.trim() || !password.trim()) {
    setError("Phone number and password are required.");
    toast.error("Please fill in both fields.");
    setLoading(false);
    return;
  }

  if (!/^\d{10}$/.test(loginPhone)) {
    setError("Phone number must be 10 digits.");
    toast.error("Enter a valid 10-digit phone number.");
    setLoading(false);
    return;
  }

  try {
    // Step 2: Call Login API
    const res = await axios.post(
      "https://burhanpur-city-backend-mfs4.onrender.com/api/Users/login",
      {
        phone: loginPhone.trim(),
        password,
      }
    );

    console.log("Login API Response:", res.data);

    // ✅ Correctly extract token and user
    const { token, user } = res.data.result;

    if (!token || !user?._id) {
      setError("Login failed. Missing token or user info.");
      toast.error("Login failed. Please try again.");
      return;
    }

    // Step 3: Save to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", user._id);
localStorage.setItem("userData", JSON.stringify(user)); // ✅ Correct key for DashboardLayout

    // Step 4: Remember Me
    if (rememberMe) {
      localStorage.setItem("savedPhone", loginPhone);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("savedPhone");
      localStorage.removeItem("savedPassword");
      localStorage.setItem("rememberMe", "false");
    }

    // Step 5: Redirect
    toast.success("Login Successful 🎉");
    navigate("/");
  } catch (err: any) {
    const msg = err.response?.data?.message || "Invalid credentials";
    setError(msg);
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  // ---------------signup function-----------------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Client-side validation
    if (
      !fullName.trim() ||
      !signupEmail.trim() ||
      !signupPhone.trim() ||
      !signupPassword.trim() ||
      !address.trim()
    ) {
      setError("All fields are required.");
      toast.error("Please fill out all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(signupEmail)) {
      setError("Invalid email format.");
      toast.error("Please enter a valid email.");
      return;
    }

    if (!/^\d{10}$/.test(signupPhone)) {
      setError("Phone number must be 10 digits.");
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://burhanpur-city-backend-mfs4.onrender.com/api/Users/createUser",
        {
          name: fullName,
          email: signupEmail,
          phone: signupPhone,
          password: signupPassword,
          address,
          role,
        }
      );

      // Step 2: Auto-login after successful signup
      const loginResponse = await axios.post(
        "https://burhanpur-city-backend-mfs4.onrender.com/api/Users/login",
        {
          phone: signupPhone.trim(),
          password: signupPassword,
        }
      );

      const token = loginResponse.data.result.token;

      if (!token) {
        toast.error("Login token not found after signup.");
        return;
      }

      localStorage.setItem("authToken", token);

      // Optional: Save credentials if needed
      if (rememberMe) {
        localStorage.setItem("savedPhone", signupPhone);
        localStorage.setItem("savedPassword", signupPassword);
        localStorage.setItem("rememberMe", "true");
      }

      // Step 3: Redirect to home
      toast.success("Signup & Login Successful 🎉");
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-purple-500 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-r from-purple-500 to-purple-800 text-white p-6 lg:p-10 flex flex-col justify-center items-center">
          <img
            src="/loginfor_image.png"
            alt="Login Illustration"
            className="w-40 h-auto mb-4 sm:w-52 md:w-64 lg:w-72"
          />
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome Back</h1>
          <h2 className="text-sm md:text-lg text-purple-200 mb-2">
            Dolor sit amet Consectetur
          </h2>
          <p className="text-xs md:text-sm text-center px-2 md:px-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-start min-h-[600px]">
          {/* Toggle Buttons */}

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-5 py-2 text-sm md:text-base rounded-l-full font-semibold transition duration-300 shadow-md ${
                isLogin
                  ? "bg-purple-400 text-white"
                  : "bg-gray-100 text-purple-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-5 py-2 text-sm md:text-base rounded-r-full font-semibold transition duration-300 shadow-md ${
                !isLogin
                  ? "bg-purple-400 text-white"
                  : "bg-gray-100 text-purple-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login or Signup Form */}
          {isLogin ? (
            <form
              onSubmit={handleLogin}
              className="space-y-4 w-full max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
              />
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer"
                >
                  {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember Me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-purple-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition duration-300"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <p className="text-center text-sm">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-purple-600 font-semibold underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleSignup}
              className="space-y-4 w-full max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
              />
              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-2.5 text-xl text-gray-500 cursor-pointer"
                >
                  {showSignupPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <select
                name="role"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition duration-300"
              >
                SIGN UP
              </button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-purple-600 font-semibold underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
