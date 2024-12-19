"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ValuesShapeSection = ({ isActive }: { isActive: boolean }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (isActive) {
      const heading = headingRef.current;
      const text = textRef.current;

      if (!heading || !text) return;

      gsap.killTweensOf([heading, text]);

      const letters = heading.querySelectorAll("span");

      gsap.fromTo(
        letters,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.02, ease: "power3.out" }
      );

      gsap.fromTo(
        text,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full flex justify-center items-center"
    >
      <div className="flex flex-col gap-y-6 items-center justify-center">
        <h1
          ref={headingRef}
          className="lg:text-3xl text-xl capitalize font-cambria text-[#f3c60c] max-w-xl text-center"
        >
          {"How Our Values Shape Everything We Do"
            .split("")
            .map((char, index) => (
              <span key={index} className="inline-block">
                {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
              </span>
            ))}
        </h1>
        <p
          ref={textRef}
          className="md:text-base text-sm leading-6 lg:leading-7 font-roboto_light tracking-wide max-w-[90%] md:max-w-2xl lg:max-w-3xl text-center"
        >
          At The Phoenix Collective, our values guide not only how we interact
          with the individuals we serve but also how we approach everything we
          do—from decision-making at the board level to the way we engage with
          our donors and volunteers. Our mission is to be a beacon of hope for
          those in need, and through our commitment to kindness, transformation,
          empathy, and transparency, we are building a culture that embodies the
          change we wish to see in the world. Together, we rise, and together,
          we help others rise—stronger, braver, and more resilient than before.
        </p>
      </div>
    </div>
  );
};

export default ValuesShapeSection;
