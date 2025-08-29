import { Shield } from "lucide-react";
import Button from "../../components/Button";
import React, { useEffect, useRef, useState } from "react";

export const OtpPage = () => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    //resend code timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //function to handle otp digit put by user
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value.replace(/\D/, ""); // Allow only digit
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    //move cursor to next box
    if (value && index < otpValues.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  //function to handle - erase wrong digit put, shift cursor backward
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otpValues];
      if (otpValues[index]) {
        // Clear current box if it has a digit
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }
    }

    // Prevent any non-digit keys except control keys like Backspace, Tab, Arrow keys
    if (
      !(
        (event.key >= "0" && event.key <= "9") ||
        event.key === "Backspace" ||
        event.key === "Tab" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-primary-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg animate__animated animate__fadeInLeft">
        <div className="grid place-items-center gap-2">
          <div className="flex justify-center items-center">
            <span className="p-3 rounded-full bg-brand-secondary-500 text-white">
              <Shield size={36} />
            </span>
          </div>
          <h2 className="font-bold text-2xl">Verify Your Account</h2>
          <p>Enter the 6-digit code sent to your email</p>
        </div>
        <form className="mt-8">
          <div className="flex justify-center space-x-2">
            {otpValues.map((val, index) => (
              <input
                type="text"
                maxLength={1}
                value={val}
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                key={index}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent"
              />
            ))}
          </div>
          <Button className="mt-8 mb-4 py-3 w-full text-white flex justify-center items-center gap-2">Verify Code</Button>
        </form>
        <p className="text-sm text-center">Resend code in {timeLeft}s</p>
      </div>
    </div>
  );
};
