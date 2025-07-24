import Visitor from "@/hooks/platform/Visitor";
import { useEffect, useState } from "react";

 type Company = {
  name: string;
  logo: string;
  category: string;

};

const UseVisitorController = () => {
     const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchCompany = async () => {
      const response = await Visitor().getCompany();
      if (response.success) {
        setCompanies(response.data.list);
        console.log(">>>>Company>>>>", response.data.list);
      } else {
        console.error("Failed to fetch Company:", response.data.message);
      }
    };

    fetchCompany();
  }, []);
    
    return {
      companies,
      setCompanies,
    }
}

export default UseVisitorController;