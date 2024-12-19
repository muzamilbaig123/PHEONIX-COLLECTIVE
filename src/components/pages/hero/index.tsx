"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection: React.FC = () => {
  const headingContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headingContainerRef.current) {
      const letters = headingContainerRef.current.querySelectorAll(".letter");

      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: -200,
          rotation: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: "bounce.out",
          stagger: 0.2,
          delay: 1,
        }
      );
    }
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="flex flex-col gap-y-6 items-center justify-center"
        ref={headingContainerRef}
      >
        <h1 className="2xl:text-7xl lg:text-6xl text-4xl uppercase font-cambria text-[#f3c60c]">
          {splitText("Phoenix")}
        </h1>
        <h1 className="2xl:text-7xl lg:text-4xl text-2xl font-roboto_light tracking-wide uppercase">
          {splitText("Collective")}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
