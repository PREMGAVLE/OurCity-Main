import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaLifeRing,
  FaCog,
  FaStar,
  FaMoon,
  FaSignOutAlt,
  FaInbox,
  FaShoppingCart,
  FaIdCard,
} from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../ui/avatar";

interface Props {
  user: {
    name?: string;
    email?: string;
    role?: string;
    avatarUrl?: string;
  } | null;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  scrolled: boolean;
  onOpenRegister: () => void;
}

const UserMenu: React.FC<Props> = ({
  user,
  showDropdown,
  setShowDropdown,
  onLogout,
  scrolled,
  onOpenRegister,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDropdown]);

  if (!user) {
    return (
      <button onClick={onOpenRegister} aria-label="User Register">
        <FaUser fill={scrolled ? "#1f2937" : "black"} />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="focus:outline-none"
      >
        <Avatar className="w-10 h-10 border-2 border-purple-500 bg-indigo-100">
          <AvatarImage src={user.avatarUrl} alt={user.name || "User Avatar"} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || <FaUser />}
          </AvatarFallback>
        </Avatar>
      </button>

      {/* ✅ Desktop Dropdown */}
      {showDropdown && (
        <div>
          {/* DESKTOP VIEW */}
          <div className="hidden sm:block absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl z-50 p-4">
            {/* Top User Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatarUrl || "https://avatar.iran.liara.run/public/44"}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role || "User"}</p>
              </div>
              <span className="ml-auto bg-gray-200 text-xs px-2 py-0.5 rounded-full">PRO</span>
            </div>

            <div className="space-y-2">
              <Link to="/profile" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaUser className="mr-3" /> View Profile
              </Link>
              <Link to="/dash" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaChartBar className="mr-3" /> Dashboard
              </Link>
              <Link to="/help-center" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaLifeRing className="mr-3" /> Help Center
              </Link>
              <Link to="/account-settings" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaCog className="mr-3" /> Account Settings
              </Link>
            </div>

            <hr className="my-3" />

            <div className="space-y-2">
              <button className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-lg">
                <FaStar className="mr-3" /> Upgrade Plan
              </button>
              <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg">
                <span className="flex items-center">
                  <FaMoon className="mr-3" /> Dark Mode
                </span>
                <Switch
                  checked={false}
                  onChange={() => { }}
                  className="relative inline-flex h-5 w-10 items-center rounded-full bg-gray-300"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch>
              </div>
            </div>

            <hr className="my-3" />

            <button
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-gray-100 rounded-lg"
            >
              <FaSignOutAlt className="mr-3" /> Log Out
            </button>
          </div>

         {/* ✅ MOBILE BOTTOM SHEET */}
<div className="sm:hidden fixed inset-0 z-50 flex items-end">
  {/* Blur Backdrop */}
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
    onClick={() => setShowDropdown(false)}
  ></div>

  {/* Slide-Up Card */}
  <div
    className={`relative w-full bg-white rounded-t-2xl p-5 z-50 transform transition-all duration-500 ease-out
    ${showDropdown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
  >
    {/* Drag handle */}
    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

    {/* ❌ Cross Icon */}
    <button
      onClick={() => setShowDropdown(false)}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* User Info */}
    <div className="flex items-center mb-4">
      <img
        src={user.avatarUrl || "https://avatar.iran.liara.run/public/44"}
        alt="Avatar"
        className="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-500">{user.role || "User"}</p>
      </div>
    </div>

    {/* Links */}
    <div className="space-y-3">
      <Link to="/dash" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
        <FaChartBar className="mr-3" /> Dashboard
      </Link>
      <Link to="/profile" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
        <FaUser className="mr-3" /> Profile
      </Link>
      <Link to="/inquiries" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
        <FaInbox className="mr-3" /> Inquiries
      </Link>
      <Link to="/buy-trade-leads" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
        <FaShoppingCart className="mr-3" /> Buy Trade Leads
      </Link>
      <Link to="/membership" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
        <FaIdCard className="mr-3" /> My Membership
      </Link>
    </div>

    <button
      onClick={onLogout}
      className="flex items-center w-full px-3 py-3 mt-4 text-red-500 hover:bg-gray-100 rounded-lg"
    >
      <FaSignOutAlt className="mr-3" /> Log Out
    </button>
  </div>
</div>


        </div>
      )}
    </div>
  );
};

export default UserMenu;
