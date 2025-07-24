// import Home from "@/Pages/home/Home";
// import AuthPage from "@/Pages/login/AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";


const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<AuthPage/>} /> */}
     

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default PrivateRoutes;