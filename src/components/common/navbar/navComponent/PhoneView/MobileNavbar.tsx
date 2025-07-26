import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  User,
  Menu,
  LogOut,
  Settings,
  Bell,
  Compass,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  user: any;
  onLogout: () => void;
}

const MobileNavbar: React.FC<Props> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
    setChatOpen(false);
    navigate(`/${tab.toLowerCase()}`);
  };

  return (
    <>
      {/* Floating Discover Button */}
      <div className="md:hidden fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => handleTabClick("Discover")}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center 
          ${activeTab === "Discover" ? "bg-purple-700 text-white" : "bg-orange-500 text-white"}`}
        >
          <Plus size={28} />
        </button>
      </div>

      {/* Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center h-16 relative">
          <button
            onClick={() => handleTabClick("Home")}
            className={`flex flex-col items-center ${
              activeTab === "Home"
                ? "text-white bg-purple-700 p-2 rounded-xl"
                : "text-gray-600"
            }`}
          >
            <Home size={22} />
            <span className="text-xs">Home</span>
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setChatOpen(!chatOpen);
                setActiveTab("Chats");
                setMenuOpen(false);
              }}
              className={`flex flex-col items-center ${
                activeTab === "Chats"
                  ? "text-white bg-purple-700 p-2 rounded-xl"
                  : "text-gray-600"
              }`}
            >
              <MessageCircle size={22} />
              <span className="text-xs">Chats</span>
            </button>

            {chatOpen && (
              <div className="absolute bottom-16 w-72 bg-white rounded-xl shadow-xl p-3 border z-50">
                <div className="mb-2 font-semibold text-gray-800">Messages</div>
                <ul className="space-y-2 max-h-64 overflow-auto text-sm">
                  {[
                    { name: "Alice Johnson", msg: "Hey! How are you doing?", time: "2m" },
                    { name: "Team Chat", msg: "Meeting at 3 PM today", time: "5m" },
                    { name: "Bob Smith", msg: "Thanks for your help!", time: "1h" },
                    { name: "Sarah Wilson", msg: "See you tomorrow!", time: "3h" },
                  ].map((chat, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-start hover:bg-gray-100 rounded-md p-2 cursor-pointer"
                      onClick={() => {
                        setChatOpen(false);
                        navigate("/chats");
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-semibold">
                          {chat.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{chat.name}</div>
                          <div className="text-gray-500 text-xs">{chat.msg}</div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">{chat.time}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setChatOpen(false);
                    navigate("/chats");
                  }}
                  className="mt-2 w-full text-center text-purple-700 text-sm font-semibold"
                >
                  View All Messages
                </button>
              </div>
            )}
          </div>

          {/* Spacing for floating button */}
          <div className="w-14" />

          <button
            // onClick={() => handleTabClick("Profile")}
            
            
            className={`flex flex-col items-center ${
              activeTab === "Profile"
                ? "text-white bg-purple-700 p-2 rounded-xl"
                : "text-gray-600"
            }`}
          >
            <User size={22} />
            <span className="text-xs">Profile</span>
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setChatOpen(false);
                setActiveTab("Menu");
              }}
              className={`flex flex-col items-center ${
                activeTab === "Menu"
                  ? "text-white bg-purple-700 p-2 rounded-xl"
                  : "text-gray-600"
              }`}
            >
              <Menu size={22} />
              <span className="text-xs">Menu</span>
            </button>

            {menuOpen && (
              <div className="absolute bottom-16 right-0 w-44 bg-white shadow-xl rounded-lg border z-50">
                <ul className="text-sm text-gray-800">
                  {[
                    { label: "Profile", icon: <User size={18} />, path: "/profile" },
                    { label: "Discover", icon: <Compass size={18} />, path: "/discover" },
                    { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
                    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
                  ].map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                      >
                        {item.icon} {item.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => {
                        onLogout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
