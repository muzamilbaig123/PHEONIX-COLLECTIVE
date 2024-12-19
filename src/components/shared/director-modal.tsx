"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";

const DirectorModal = ({
  isOpen,
  onClose,
  director,
}: {
  isOpen: boolean;
  onClose: () => void;
  director: { name: string; role: string; description: string; image: string };
}) => {
  const smallBoxRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
        className="absolute md:w-full w-80 h-96 md:max-w-3xl md:h-[28rem] rounded-lg bg-[#202020] flex justify-center items-center"
      ></div>

      <div
        ref={modalRef}
        className="bg-[#202020] text-white flex flex-col items-center justify-start px-5 py-10 lg:p-10 w-full h-full md:max-w-3xl md:h-[28rem] relative z-10 overflow-y-auto rounded-lg"
      >
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-yellow-500 mb-6">
          <Image
            src={director.image}
            alt={director.name}
            width={24}
            height={24}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">
            {director.name}
          </h2>
          <p className="text-yellow-500 text-xl lg:text-2xl font-semibold mb-4">
            {director.role}
          </p>
          <p className="text-gray-300 text-md lg:text-lg leading-relaxed">
            {director.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-yellow-500 text-xl font-bold"
        >
          BACK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DirectorModal;
