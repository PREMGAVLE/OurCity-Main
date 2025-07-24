import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./navComponent/NavLinks";
import Sidebar from "./navComponent/Sidebar";
import RegisterModal from "./navComponent/RegisterModel";
import Logo from "./navComponent/Logo";
import UserMenu from "./navComponent/UserMenu";
import MobileNavbar from "./navComponent/PhoneView/MobileNavbar"; // 👈 import
import axois from "@/axois";

interface User {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  role?: string;
}

const NavbarMain: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const res = await axois.get("/Users/userDetails", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) {
            setUser(res.data.result);
          }
        } catch {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md md:block hidden">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Logo scrolled={true} />
          <NavLinks scrolled={true} />
          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu
                user={user}
                showDropdown={showProfileDropdown}
                setShowDropdown={setShowProfileDropdown}
                onLogout={handleLogout}
                scrolled={true}
                onOpenRegister={() => setShowRegisterModal(true)}
              />
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="text-sm px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <MobileNavbar user={user} onLogout={handleLogout} />

      {/* Sidebar and Modal */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          setUser={setUser}
        />
      )}

      {/* Spacer for top navbar */}
      <div className="h-20 md:h-0" />
    </>
  );
};

export default NavbarMain;
