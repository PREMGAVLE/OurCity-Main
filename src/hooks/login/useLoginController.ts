import { invoke } from "@tauri-apps/api/core";
import init, { get_user_info, Phone } from "../../../public/wasm/rust_app_bl";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isTauri } from "@/utills/checkTauri";
import { RegisterForm } from "@/data/formData";
import Platform from "../platform/Platform";
import API from "@/api/axiosInstance"
import { LOGIN_URL } from "@/api/urls";

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}
export default function useLoginController() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("useParams", location.state?.number);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>(location.state?.number||"");
  const [errorMessage, setErrorMessage] = useState<string>("");
  async function getModules() {
    try {
      const modules = await invoke('fetch_modules_without_config');
      console.log('Modules without JSON config:', modules);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    }
  }
  useEffect(() => {
    (async () => {
      await init(); 
      const res = get_user_info();
  
   
    console.log("user info>>>",res)
    })();
  }, []);
  
  // Validate mobile number (exactly 10 digits)
  const isValidPhoneNumber = (number: string): boolean => /^[0-9]{10}$/.test(number);

  const handleSubmit = async (): Promise<void> => {
    if (!isValidPhoneNumber(phoneNumber)) {
      console.log("abc")
      // toast("Invalid phone number", {
      //   description: "Please enter a valid 10-digit mobile number.",
      // });
      toast.warning("Warning! Please enter a valid 10-digit mobile number.")
      return;
    }

    setErrorMessage("");

    try {
      // const phoneData = new Phone(phoneNumber, countryCode);
      // const response = await phoneData.register(); // Ensure this is awaited if async
      // console.log("Response:", response);

      // toast.success(`OTP has been sent to ${countryCode} ${phoneNumber}`,);

      // navigate("/otp", { state: { number: phoneNumber } });
      
  await init(); // for wasm

  const tauriEnv = await isTauri();
     console.log(tauriEnv)
  if (tauriEnv) {
    // ✅ Use Tauri command
    console.log(phoneNumber)
    try {
    
    //  const check= await invoke('insert_template_command', {
    //   args: {
    //     enterprise: "My school",
    //     module: "ERP",
    //     resource: "Student Register",
    //     template_id: "template-007",
    //     view_type: "full",
    //     license: "FREE",
    //     roles: "admin,manager",
    //     json_config: JSON.stringify(RegisterForm),
    //   }
    // });
      // console.log("check>>>",check)
      const response: string = await invoke("register", {
        phone: phoneNumber,
        code: countryCode,
      });
     
      console.log("Tauri Registration response", response);
      if (response) {
        navigate("/otp", { state: { number: phoneNumber } });
      }
    } catch (error) {
      console.error("Tauri Registration error", error);
    }
  } else {
    // 🌐 Use wasm_bindgen Phone class
    try {
      const PhoneData = new Phone(phoneNumber, "+91", countryCode);
      const response = PhoneData.register();
      console.log("WASM Registration response", response);
      if (response) {
        navigate("/otp", { state: { number: phoneNumber } });
      }
    } catch (error) {
      console.error("WASM OTP error", error);
    }
   
  }
    } catch (error: unknown) {
      console.error("Error:", (error as Error)?.message);
      setErrorMessage("An error occurred while sending the OTP. Please try again.");
      toast.error("Error! Something went wrong.")
    }
  };

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        await init();
      } catch (error) {
        console.error("WASM Initialization Error:", error);
      }
    };
    initializeWasm();
  }, []);

   const [countryCodes, setCodes] = useState<CountryCode[]>([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      const response = await Platform().getCountryCodes();
      if (response.success) {
        setCodes(response.data.list);
      }
    };

    fetchCountryCodes();
  }, []);
  const handleSubmitt = () => {
    alert(`Submitted: ${countryCode} ${phoneNumber}`);
    // optionally store in localStorage or global state here
    navigate('/otp');
  };


  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [viewOTP, setViewOTP] = useState('');
  const handleButtonClick = async () => {
    if (!submitted) {
      setSubmitted(true);
      handleSubmit();
    }

    try {
      const res = await API.post(LOGIN_URL, { phone_number: phoneNumber });
      setMessage(res.data.message);
      setViewOTP(res?.data?.smsSent);
      setOtpSent(true);
      localStorage.setItem('phone_number', phoneNumber);
      navigate('/otp');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };
  return {
   handleSubmit,
    setCountryCode,
    setPhoneNumber,
    countryCode,
    phoneNumber,
    errorMessage,
    countryCodes,
    handleSubmitt,
    handleButtonClick,
    message
  };
}
