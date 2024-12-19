"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import CustomInput from "./custom-input";
import CustomSelect from "./custom-select";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const smallBoxRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isIndividual, setIsIndividual] = useState(true);
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    businessName: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<
    "creditCard" | "bankAccount"
  >("creditCard");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    if (!value.trim() && name !== "phoneNumber" && name !== "address2") {
      return `${name.replace(/([A-Z])/g, " $1")} is required`;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Enter a valid email address";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value ? parseFloat(value) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    console.log("Amount:", amount);
    console.log("Custom Amount:", customAmount);

    const newErrors: Record<string, string> = {};
    let hasError = false;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) hasError = true;
      newErrors[key] = error;
    });

    setErrors(newErrors);

    if (!hasError) {
      console.log("Donation Submitted:", { formData, amount, paymentMethod });
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const smallBox = smallBoxRef.current;
      const modal = modalRef.current;

      if (smallBox && modal) {
        const tl = gsap.timeline();

        tl.fromTo(
          smallBox,
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
          .to(
            smallBox,
            {
              scaleX: window.innerWidth / smallBox.offsetWidth,
              scaleY: window.innerHeight / smallBox.offsetHeight,
              duration: 0.6,
              ease: "power4.out",
            },
            "+=0.1"
          )
          .fromTo(
            modal,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
      <div
        ref={smallBoxRef}
        className="absolute md:w-full w-80 h-96 md:max-w-3xl md:h-[28rem] rounded-lg bg-black flex justify-center items-center"
      ></div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <video
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/donate-overlay-small.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        ref={modalRef}
        className="bg-transparent text-gray-800 flex flex-col items-center justify-start px-5 py-20 lg:p-10 w-full h-full relative z-10 overflow-y-auto"
      >
        <h2 className="w-full lg:max-w-2xl text-white text-4xl lg:text-6xl font-bold font-cambria text-left mb-6 uppercase leading-[3rem] lg:leading-[5rem]">
          Help Us by Donating Today
        </h2>

        <div className="flex flex-wrap gap-4 mb-6 ">
          {[10, 25, 50, 75].map((value) => (
            <button
              key={value}
              onClick={() => handleAmountChange(value)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-lg ${
                amount === value ? "bg-[#202020] text-white" : "bg-gray-200"
              }`}
            >
              ${value}
            </button>
          ))}
          <div className="flex items-center">
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="bg-gray-200 px-6 py-3 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#202020]"
              placeholder="Other"
            />
          </div>
        </div>

        <div className="flex mb-6 bg-gray-200 px-1 py-1 rounded-full">
          <button
            onClick={() => setIsIndividual(true)}
            className={`px-4 py-2 rounded-full ${
              isIndividual ? "bg-[#202020] text-white" : "bg-gray-200"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setIsIndividual(false)}
            className={`px-4 py-2 rounded-full ${
              !isIndividual ? "bg-[#202020] text-white" : "bg-gray-200"
            }`}
          >
            Business/Organization
          </button>
        </div>

        <form
          className="w-full max-w-4xl space-y-8 mt-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              id="firstName"
              label="First Name *"
              type="text"
              value={formData.firstName}
              placeholder="John"
              errorMessage={errors.firstName}
              onChange={handleChange}
              isWhiteTheme
            />
            <CustomInput
              id="lastName"
              label="Last Name *"
              type="text"
              value={formData.lastName}
              placeholder="Doe"
              errorMessage={errors.lastName}
              onChange={handleChange}
              isWhiteTheme
            />
          </div>
          {!isIndividual && (
            <CustomInput
              id="businessName"
              label="Business Name *"
              type="text"
              value={formData.businessName}
              placeholder="Your Business Name"
              errorMessage={errors.businessName}
              onChange={handleChange}
              isWhiteTheme
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-8 md:space-y-0 md:gap-8">
            <CustomInput
              id="email"
              label="Email *"
              type="email"
              value={formData.email}
              placeholder="john@doe.com"
              errorMessage={errors.email}
              onChange={handleChange}
              isWhiteTheme
            />
            <CustomInput
              id="phoneNumber"
              label="Phone Number"
              type="text"
              value={formData.phoneNumber}
              placeholder="123-456-7890"
              errorMessage={errors.phoneNumber}
              onChange={handleChange}
              isWhiteTheme
            />
          </div>
          <CustomInput
            id="address"
            label="Address *"
            type="text"
            value={formData.address}
            placeholder="123 Main St"
            errorMessage={errors.address}
            onChange={handleChange}
            isWhiteTheme
          />
          <CustomInput
            id="address2"
            label="Address 2"
            type="text"
            value={formData.address2 || ""}
            placeholder="Apartment, suite, etc."
            errorMessage={errors.address2}
            onChange={handleChange}
            isWhiteTheme
          />
          <div className="grid grid-cols-1 md:grid-cols-3 space-y-8 md:space-y-0 md:gap-8">
            <CustomInput
              id="city"
              label="City *"
              type="text"
              value={formData.city}
              placeholder="City"
              errorMessage={errors.city}
              onChange={handleChange}
              isWhiteTheme
            />
            <CustomSelect
              id="state"
              label="State/Province *"
              value={formData.state}
              options={[
                { label: "State 1", value: "State 1" },
                { label: "State 2", value: "State 2" },
                // Add more options as necessary
              ]}
              errorMessage={errors.state}
              onChange={handleChange}
              isWhiteTheme
            />
            <CustomInput
              id="zipCode"
              label="Zip/Postal Code *"
              type="text"
              value={formData.zipCode}
              placeholder="12345"
              errorMessage={errors.zipCode}
              onChange={handleChange}
              isWhiteTheme
            />
          </div>
          <div className="mt-6 text-white">
            <h3 className="text-lg font-bold mb-4">
              Select your payment method
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => setPaymentMethod("creditCard")}
                />
                Credit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bankAccount"
                  checked={paymentMethod === "bankAccount"}
                  onChange={() => setPaymentMethod("bankAccount")}
                />
                Bank Account
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 border border-white text-white text-lg py-2 px-6 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Donate
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white text-xl font-bold"
        >
          BACK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DonationModal;
