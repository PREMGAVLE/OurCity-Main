// import { useEffect, useRef, useState } from "react";
// import init, { Phone } from "../../../public/wasm/rust_app_bl";
// import { useLocation, useNavigate } from "react-router-dom";
// import { invoke } from "@tauri-apps/api/core";
// import { isTauri } from "@/utills/checkTauri";
// // import isTauri  from "@/utills/auth";
// export default function useOtpController() {
//   const location = useLocation();
//   const [resendTimer, setResendTimer] = useState<number>(15);
//   const [canResend, setCanResend] = useState<boolean>(false);
//   console.log('useParams', location.state?.number);
//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const phoneNumber: string = location.state?.number;
//   const [errorMsg, setErrorMsg] = useState("");


//   const navigate = useNavigate();

//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   // const verify = async () => {
//   //   try {
//   //     const result = await invoke('verify_otp', {
//   //       otp:otp,
//   //       phone_number: phoneNumber,
//   //     });
      
//   //     console.log('Invoke Pass:', result);
//   //   } catch (e) {
//   //     console.error('Invoke failed:', e);
//   //   }
//   // };
 
//   useEffect(() => {
//     // fetchUsers()
//   }, []);
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (!canResend) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             setCanResend(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [canResend]);
//   // Update OTP value and move focus to the next input if a digit is entered.
//   const handleChange = (index: number, value: string) => {
//     if (/^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < otp.length - 1) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };
//   console.log(otp.join(""));

//   const handleKeyDown = (
//     index: number,
//     event: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (event.key === "Backspace" && otp[index] === "") {
//       if (index > 0) {
//         inputRefs.current[index - 1]?.focus();

//         const newOtp = [...otp];
//         newOtp[index - 1] = '';
//         setOtp(newOtp);
//       }
//     }
//   };

//   const handleVerifyOtp = async () => {
//     await init();
//     setErrorMsg("");
//     const finalOtp = otp.join("");
//     const tauriEnv = await isTauri();
//     console.log(tauriEnv);
//     if (tauriEnv) {
//       try {
//         const response: string = await invoke("verify_otp", { otp: finalOtp,  mobile:"788641611",
//           code:"12344", });
//         console.log("Tauri OTP response", response);
//         if (response) {
//           localStorage.setItem("token","qwertyuiop")
//           navigate("/chats");
//         }else {
//         setErrorMsg("otp are wrong please try again");
//       }
//       } catch (error) {
//         console.error("Tauri OTP error", error);
//       }
//     } else {
//       // 🌐 Use wasm_bindgen Phone class
//       try {
//         const PhoneData = new Phone(phoneNumber, "+91", finalOtp);
//         const response = PhoneData.verify_otp();
//         console.log("WASM OTP response", response);
//         if (response) {
//           localStorage.setItem("token","qwertyuiop")
//           navigate("/chats");
//         }else {
//         setErrorMsg("otp are wrong please try again");
//       }
//       } catch (error) {
//         console.error("WASM OTP error", error);
//         setErrorMsg("OTP verification are invalid");
//       }
//     }
//     // await init();
//     // console.log('otp>>>>', otp);
//     // const finalOtp = otp.join('');
//     // console.log('final otp>>>>', finalOtp);
//     // // Assuming the third parameter ('12345') is the OTP for now.
//     // const PhoneData = new Phone(phoneNumber, '+91', finalOtp);

//     // try {
//     //   const response = PhoneData.verify_otp();
//     //   console.log('otp response', response);
//     //   if (response.includes('verified')) {
//     //     navigate('/role-selection'); // Redirect after successful OTP verification
//     //   }
//     // } catch (error: unknown) {
//     //   console.log('error otp>>', error);
//     // }
    
//   };
 
//   const handleResendOtp = async () => {
//     if (!canResend) return;
//     await init(); // Ensure WASM is initialized

//     try {
//       const finalOtp = otp.join("");
//       const PhoneData = new Phone(phoneNumber, "91", finalOtp);
//       const response = PhoneData.register(); // Call the Rust function
//       console.log('otp is resend ', response);
//       setCanResend(false);
//       setResendTimer(15);
//     } catch (error: unknown) {
//       console.log('error otp resend >>', error);
//     }
//   };

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axiosInstance"
import { LOGIN_URL, OTP_URL } from "@/api/urls";
export default function useOtpController() {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem("phone_number") || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    try {
      const res = await API.post(OTP_URL, {
        phone_number: phoneNumber,
        otp: code,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
       localStorage.setItem("token",res.data.token)
      navigate("/chats");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await API.post(LOGIN_URL, { phone_number: phoneNumber });
      setResendTimer(30);
      setCanResend(false);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleEdit = () => {
    navigate("/", { state: { number: phoneNumber } });
  };

  const isOtpComplete = otp.every((digit) => digit.trim() !== "");

  return {
    // handleChange,
    // handleKeyDown,
    // otp,
    // setOtp,
    // phoneNumber,
    // inputRefs,
    // handleVerifyOtp,
    // handleResendOtp,
    // canResend,
    // resendTimer,
    // errorMsg,
     otp,
    errorMsg,
    canResend,
    resendTimer,
    inputRefs,
    phoneNumber,
    handleChange,
    handleKeyDown,
    handleVerifyOtp,
    handleResendOtp,
    handleEdit,
    isOtpComplete,
  };
}