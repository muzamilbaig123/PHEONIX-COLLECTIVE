"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import CustomInput from "./custom-input";
import { SendMessageAction } from "@/actions/letter.action";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface WriteLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WriteLetterModal: React.FC<WriteLetterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const smallBoxRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false); // For submission state

  const fields = [
    { name: "name", label: "Name *", type: "text" },
    {
      name: "email",
      label: "Email *",
      type: "email",
    },
    { name: "subject", label: "Subject *", type: "text" },
  ];

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email address";
      case "subject":
        return value.trim() ? "" : "Subject is required";
      case "message":
        return value.length >= 10
          ? ""
          : "Message must be at least 10 characters long";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, value);
      if (error) hasError = true;
      newErrors[fieldName] = error;
    });

    setErrors(newErrors);

    if (!hasError) {
      setIsSubmitting(true);
      try {
        const response = await SendMessageAction(formData);
        console.log("🚀 ~ SendMessageAction ~ response:", response);
        if (response.success) {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          toast.error("Failed to send the message. Please try again.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        console.error(error);
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
        className="bg-transparent text-gray-800 flex flex-col items-center justify-start px-5 py-20 lg:p-10 w-full h-full relative z-10 overflow-y-auto"
      >
        <h2 className="w-full lg:max-w-2xl text-white text-4xl lg:text-7xl font-bold font-cambria text-left mb-6 uppercase leading-[3rem] lg:leading-[5rem]">
          Write a Letter
        </h2>
        <form
          className="w-full max-w-xl text-left space-y-8 mt-10"
          onSubmit={handleSubmit}
        >
          {fields.map((field) => (
            <CustomInput
              key={field.name}
              id={field.name as keyof FormData}
              label={field.label}
              type={field.type}
              value={formData[field.name as keyof FormData]}
              errorMessage={errors[field.name as keyof FormData]}
              onChange={handleChange}
              isWhiteTheme
            />
          ))}
          <div className="relative flex flex-col">
            <textarea
              id="message"
              name="message"
              className={`peer block min-h-[auto] w-full px-3 py-[0.32rem] border-b-2 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 resize-none
      ${
        errors.message
          ? "border-rose-600 focus:border-rose-600"
          : "border-white focus:border-white"
      } bg-transparent text-white`}
              rows={5}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label
              htmlFor="message"
              className={`absolute left-0 -top-1 mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out
      ${
        formData.message
          ? "-translate-y-[0.9rem] scale-[0.8]"
          : "peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
      }
      ${errors.message ? "text-red-500" : "text-white"}`}
            >
              Message
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 border border-white text-lg py-2 px-6 rounded-full transition-colors ${
              isSubmitting
                ? "bg-white text-black cursor-not-allowed"
                : "text-white hover:bg-white hover:text-black"
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

export default WriteLetterModal;
