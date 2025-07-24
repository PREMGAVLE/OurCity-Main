import { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "sonner";
import MainRoutes from './routes/MainRoutes';
import PopAd from "./Pages/Adds/adds/PopAd";

import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", 
    });
  }, [pathname]);

  return null;
};


function App() {

  // ✅ Prevent scroll reset on refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);



  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        richColors
        expand
        closeButton
        className="max-w-[98%]"
      />
      <MainRoutes />
      <div className="min-h-screen">
        <PopAd />
      </div>
    </BrowserRouter>
  );
}

export default App;
