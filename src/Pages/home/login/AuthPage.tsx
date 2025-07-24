import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login API
        const res = await axios.post(
          "https://burhanpur-city-backend.vercel.app/api/Users/adminLogin",
          {
            phone: username,
            password,
          }
        );
        localStorage.setItem("authToken", res.data.token);
        navigate("/home");
      } else {
        // Signup API
        const res = await axios.post(
          "https://burhanpur-city-backend.vercel.app/api/Users/register",
          {
            name: fullName,
            email,
            phone: username,
            password,
          }
        );
        localStorage.setItem("authToken", res.data.token);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check your credentials or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e7ff]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-purple-700 to-indigo-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-10 text-white flex flex-col justify-center">
          <div className="text-yellow-400 font-bold text-lg mb-2">Company Logo</div>
          <h1 className="text-4xl font-bold mb-2">Welcome</h1>
          <h2 className="text-2xl text-yellow-400 font-semibold mb-4">
            {isLogin ? "Login to your account" : "Create an account"}
          </h2>
          <p className="text-sm text-gray-200">
            {isLogin
              ? "Enter your credentials to access the dashboard."
              : "Sign up to start using our platform."}
          </p>
        </div>

        <div className="bg-white p-10 flex flex-col justify-center">
          <h3 className="text-gray-700 text-xl font-semibold mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h3>

          {!isLogin && (
            <>
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mb-4"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
            </>
          )}

          <Input
            type="tel"
            placeholder="Phone Number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="bg-yellow-400 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "LOGIN" : "SIGN UP"}
          </Button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            {isLogin ? (
              <>
                New here?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold cursor-pointer"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-semibold cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
