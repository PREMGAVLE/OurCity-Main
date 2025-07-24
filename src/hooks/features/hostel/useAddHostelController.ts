import { useState, useEffect } from "react";
import init, {
  HostelManagement,
} from "../../../../public/wasm/rust_app_bl";
import {  useLocation, useNavigate } from "react-router-dom";

export const useAddHostelController = () => {
  interface HostelData {
    name: string;
    address: string;
    lat: number;
    lng: number;
    gender: string;
    photos: string[];
    building: string;
    floor_no: string;
    room_no: string;
    incharges: {
      name: string;
      email: string;
      phone: string;
      image: string;
      incharge_id: string;
    }[];
  }

  interface User {
    name: string;
    email: string;
    phone: string;
    image: string;
    incharge_id: string;
  }

  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedIncharges, setSelectedIncharges] = useState<User[]>([]);
  const [hostelData, setHostelData] = useState<HostelData>({
    name: "",
    address: "",
    lat: 255,
    lng: 5525,
    gender: "",
    photos: [],
    building: "",
    floor_no: "",
    room_no: "",
    incharges: [],
  });

  const [hostelManager, setHostelManager] = useState<HostelManagement | null>(null);
  const [hostels, setHostels] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [incharges, setIncharges] = useState<User[]>([]);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const initializeWasm = async () => {
      await init();
      const manager = new HostelManagement({});
      setHostelManager(manager);
      setIsInitialized(true);
    };

    initializeWasm();
  }, []);

  useEffect(() => {
    if (!isInitialized || !hostelManager) return;

    try {
      const incharges_data = hostelManager.get_hostel_incharge(query);
      if (Array.isArray(incharges_data)) {
        setIncharges([...incharges_data]);
      } else {
        console.warn("Invalid incharge data received.");
      }
    } catch (error) {
      console.error("Error fetching incharges:", error);
    }
  }, [query, hostelManager, isInitialized]);

  const fetchHostels = () => {
    if (!isInitialized || !hostelManager) return;

    try {
      const hostelData = hostelManager.get_hostels();
      if (Array.isArray(hostelData)) {
        setHostels(hostelData);
      } else {
        console.warn("Received invalid hostel data.");
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  const handleSubmit = () => {
    const formattedData = {
      ...hostelData,
      gender: selectedGender,
      photos: ["hostel_img1.jpg"], // Placeholder
      incharges: [...selectedIncharges],
    };

    addHostel(formattedData);
    console.log("🚀 Submitted:", formattedData);
  };

  const handleInputChange = (field: keyof HostelData, value: string) => {
    setHostelData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(value);
  };

  const addHostel = (data: HostelData) => {
    if (!isInitialized || !hostelManager) return;

    try {
      console.log("Adding Hostel Data:", data);
      const message = hostelManager.add_hostel(data);
      console.log("Rust Response:", message);
      fetchHostels();
    } catch (error) {
      console.error("Error adding hostel:", error);
    }
  };


  // AddHostelMemberList.tsx
    useEffect(() => {
    const saved = localStorage.getItem('selectedIncharges');
    if (saved) {
      setSelectedIncharges(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever selectedIncharges changes
  useEffect(() => {
    localStorage.setItem('selectedIncharges', JSON.stringify(selectedIncharges));
  }, [selectedIncharges]);

  const handleCancel = () => {
    navigate(-1);
  };


  // for member_selected.tsx
     const location = useLocation();

  const selectedInchargesFromState = location.state?.selectedIncharges || [];

   useEffect(() => {
      if (selectedInchargesFromState.length > 0) {
         setSelectedIncharges(selectedInchargesFromState);
      }
   }, [selectedInchargesFromState, setSelectedIncharges]);



  return {
    hostels,
    addHostel,
    fetchHostels,
    handleInputChange,
    handleSubmit,
    hostelData,
    setSelectedGender,
    selectedGender,
    incharges,
    selectedIncharges,
    setSelectedIncharges,
    setQuery,
    query,
    setIncharges,
    handleCancel,
  };
};
