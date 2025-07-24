// // pages/DashboardLayout.tsx
// import React, { useState, useRef, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const DashboardLayout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/100");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [userData, setUserData] = useState<{ name: string } | null>(null);

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setSidebarOpen(false);
//   const handleImageClick = () => fileInputRef.current?.click();

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.result) {
//           const base64Image = reader.result.toString();
//           setProfileImage(base64Image);
//           localStorage.setItem("dashboardProfileImage", base64Image);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//   const savedImage = localStorage.getItem("dashboardProfileImage");
//   if (savedImage) setProfileImage(savedImage);

//   const fetchUser = async () => {
//     const token = localStorage.getItem("authToken");
//     const savedUser = localStorage.getItem("userData");

//     if (savedUser) {
//       setUserData(JSON.parse(savedUser));
//     }

//     if (!token) return;

//     try {
//       const res = await fetch(
//         "https://burhanpur-city-backend-mfs4.onrender.com/api/Users/me",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (data && data.name) {
//         setUserData(data);
//         localStorage.setItem("userData", JSON.stringify(data));
//       }
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   };

//   fetchUser();
// }, []);


//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">
//       <Header
//         profileImage={profileImage}
//         toggleSidebar={toggleSidebar}
//         handleImageClick={handleImageClick}
//         fileInputRef={fileInputRef}
//         handleImageChange={handleImageChange}
//         userName={userData?.name}
//       />

//       <div className="flex mx-auto px-6 py-4 gap-6 h-[calc(100vh-80px)] relative overflow-hidden">
//         <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

//         <main className="flex-1 overflow-y-auto pr-2 pb-10 scrollbar-none">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
