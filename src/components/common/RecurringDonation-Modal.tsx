"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import ChooseMonthlyGifts from "../pages/chooseMonthlyGifts";
import EmpowerGrowth from "../pages/Empower-Growth";
import Link from "next/link";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecurringDonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const smallBoxRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isIndividual, setIsIndividual] = useState(true);

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

  const handleCardClick = () => {
    // Modal handling logic can be added here if needed in future
  };

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
        <h2 className="w-full lg:max-w-6xl text-white text-2xl lg:text-4xl font-bold font-cambria text-center mb-6 uppercase leading-[3rem] lg:leading-[4rem]">
         Why Join the Circle of Givers of Light?
        </h2>

        <div className="flex mb-12 bg-gray-200 px-1 py-1 rounded-full">
          <button
            onClick={() => setIsIndividual(true)}
            className={`px-4 py-2 rounded-full ${isIndividual ? "bg-[#202020] text-white" : "bg-gray-200"}`}
          >
             Choose Your Monthly Gift
              
          </button>
          <button
            onClick={() => setIsIndividual(false)}
            className={`px-4 py-2 rounded-full ${!isIndividual ? "bg-[#202020] text-white" : "bg-gray-200"}`}
          >
          Empower Growth
          </button>
        </div>
    <div>
    <Link
          href={"https://www.paypal.com/donate/?hosted_button_id=JRYWBGT8TH4Q2"}
          className="mt-8 px-8 py-4 bg-yellow-400 text-black text-xl font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
        >
          DONATE NOW
        </Link>
    </div>
        {isIndividual ? (
          <ChooseMonthlyGifts
            isCoreActive={false}
            onCardClick={handleCardClick}
          />
        ) : (
          <EmpowerGrowth
            isCoreActive={false}
            onCardClick={handleCardClick}
          />
        )}

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

export default RecurringDonationModal;
