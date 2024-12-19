"use client";

import React, { useEffect, useRef } from "react";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { gsap } from "gsap";

const RightBar = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div
      ref={buttonsRef}
      className="hidden fixed right-4 top-1/3 md:flex flex-col items-center gap-4 z-50"
    >
      <button
        className="w-10 h-10 rounded-full border border-white flex justify-center items-center text-white transition hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]"
        aria-label="External Link"
      >
        <FaTwitter className="text-lg" />
      </button>

      <button
        className="w-10 h-10 rounded-full border border-white flex justify-center items-center  text-white transition hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]"
        aria-label="Refresh"
      >
        <FaTiktok className="text-lg" />
      </button>

      <button
        className="w-10 h-10 rounded-full border border-white flex justify-center items-center transition text-white hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]"
        aria-label="Instagram"
      >
        <FaInstagram className="text-lg" />
      </button>
    </div>
  );
};

export default RightBar;
