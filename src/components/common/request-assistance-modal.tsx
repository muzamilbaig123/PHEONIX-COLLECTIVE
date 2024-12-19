"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import CustomInput from "./custom-input";
import CustomSelect from "./custom-select";
import { SendRequestAssistanceData } from "@/actions/request-assistance.action";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  businessName?: string;
}

interface RequestAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestAssistanceModal: React.FC<RequestAssistanceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
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

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isIndividual, setIsIndividual] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const smallBoxRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const validateField = (name: keyof FormData, value: string): string => {
    if (["address2", "phoneNumber"].includes(name)) return "";

    if (!value.trim()) {
      if (name === "businessName" && isIndividual) return "";
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
    const { name, value } = e.target as { name: keyof FormData; value: string };

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let hasError = false;

    Object.entries(formData).forEach(([key, value]) => {
      if (!isIndividual && key === "businessName" && !formData.businessName) {
        newErrors.businessName = validateField(key as keyof FormData, value);
        hasError = true;
      }
      if (key !== "businessName" || !isIndividual) {
        const fieldName = key as keyof FormData;
        const error = validateField(fieldName, value);
        if (error) hasError = true;
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      setIsSubmitting(true);
      try {
        const response = await SendRequestAssistanceData(formData);
        if (response.success) {
          toast.success("Request submitted successfully!");
          setFormData({
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
        } else {
          toast.error("Failed to submit the request. Please try again.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
      <div
        ref={smallBoxRef}
        className="absolute md:w-full w-80 h-96 md:max-w-3xl md:h-[28rem] rounded-lg bg-black flex justify-center items-center"
      ></div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <video
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          style={{
            filter: "hue-rotate(30deg) brightness(0.9) saturate(0.8)",
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/overlay-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        ref={modalRef}
        className="bg-transparent text-gray-800 flex flex-col items-center justify-start px-5 pt-20 pb-10 md:py-10 lg:p-10 w-full h-full relative overflow-y-auto z-20"
      >
        <h2 className="w-full lg:max-w-2xl text-white text-4xl lg:text-7xl font-bold font-cambria text-left mb-6 uppercase leading-[3rem] lg:leading-[5rem]">
          Tell us about yourself
        </h2>

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
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-8 md:space-y-0 md:gap-8">
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
              value={formData.businessName || ""}
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
              type="number"
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
            value={formData.address || ""}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 border text-lg py-2 px-6 rounded-full transition-colors ${
              isSubmitting
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {isSubmitting ? (
              <LuLoader2 className="animate-spin" size={24} />
            ) : (
              "Submit"
            )}
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

export default RequestAssistanceModal;
