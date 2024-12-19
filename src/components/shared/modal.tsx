"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const Modal = ({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: { title: string; description: string };
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
        className="absolute md:w-full w-80 h-96 md:max-w-3xl md:h-[28rem] rounded-lg bg-[#f59a17] flex justify-center items-center"
      ></div>

      <div
        ref={modalRef}
        className="bg-[#f59a17] text-gray-800 flex flex-col items-center justify-start px-5 py-20 lg:p-10 w-full h-full relative z-10 overflow-y-auto"
      >
        <div>
          <h2 className="w-full lg:max-w-lg text-[#202020] text-4xl lg:text-7xl font-bold font-cambria text-left mb-6 uppercase leading-[3rem] lg:leading-[5rem]">
            {content.title}
          </h2>
          <p className="max-w-2xl text-xl lg:text-2xl text-left">
            {content.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-[#202020] text-xl font-bold"
        >
          BACK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
