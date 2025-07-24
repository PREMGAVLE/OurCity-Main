import Footer from "@/components/common/footer/Footer";
import ArchitectureLanding from "./home_components/ArchitectureLanding";
import HistoricalTimeline from "./home_components/HistoricalTimeline";
import TopAttractions from "./home_components/TopAttractions";
import ContactForm from "./home_components/ContactForm";
import CategorySection from "../categorypart/CategorySection";

import NavbarMain from "@/components/common/navbar/NavbarMain";
// import DashboardMain from "../dashboard/dashboardMain";
import Plans from "../plans/Plans";
import ProductsSection from "../Products/ProductSection";

// import NavbarMain from "@/components/common/navbar/NavbarMain";
 


const Home: React.FC = () => {
  return (

    <div className="pt-2 h-0"> {/* ✅ Add padding-top to prevent overlap */}
      <NavbarMain />
  
      {/* <ArchitectureLanding />
       */}
<ArchitectureLanding />
{/* <Dashboard/> */}
      <CategorySection />
      <ProductsSection />
      <HistoricalTimeline />
  
      <TopAttractions />
      <Plans/>
      <ContactForm />
      <Footer />
    </div>

  );
};

export default Home;
