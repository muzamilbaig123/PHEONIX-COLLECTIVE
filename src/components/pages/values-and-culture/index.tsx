"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const ValuesSection = ({
  isActive,
  navigateToSlide,
}: {
  isActive: boolean;
  navigateToSlide: (slideIndex: number) => void;
}) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (isActive) {
      const heading = headingRef.current;
      const text = textRef.current;

      if (!heading || !text) return;

      gsap.killTweensOf([heading, text, ...buttonRefs.current]);

      const letters = heading.querySelectorAll("span");

      gsap.fromTo(
        letters,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        text,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      buttonRefs.current.forEach((button, index) => {
        if (!button) return;
        gsap.fromTo(
          button,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1 + index * 0.2,
            ease: "power3.out",
          }
        );
      });
    }
  }, [isActive]);

  return (
    <div
      className="w-full h-full flex justify-center items-center"
      ref={sectionRef}
    >
      <div className="flex flex-col gap-y-6 items-center justify-center">
        <h1
          ref={headingRef}
          className="lg:text-4xl text-xl capitalize font-cambria text-[#f3c60c] max-w-xl text-center"
        >
          {"Values and Culture of the Phoenix Collective"
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
          At The Phoenix Collective, our values and culture are the lifeblood of
          our mission, shaping everything we do and ensuring that we not only
          assist individuals in rising from adversity but also embody the
          qualities we seek to inspire in others. Rooted in kindness,
          transformation, and deep compassion, we believe that every individual
          holds the power to rise from their own ashes, and it is our
          responsibility to help them unlock that potential.
        </p>

        <div className="w-full flex justify-evenly items-start gap-8 px-4 sm:px-0">
          <div
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={() => navigateToSlide(2)}
          >
            <div className="relative w-14 h-14 bg-transparent rounded-full flex justify-center items-center group">
              <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] box-border shadow-[0_0_4px_2px_rgba(243,198,12,0.5),inset_0_0_3px_2px_rgba(243,198,12,0.5)] transition-transform duration-300 group-hover:scale-110"></span>
              <Image
                src={"/assets/images/person.png"}
                alt="Person Icon"
                width={45}
                height={45}
              />
            </div>
            <p className="text-[0.5rem] sm:text-xs  max-w-52 sm:max-w-40 mt-2 text-white uppercase font-roboto_light">
              CORE VALUES OF THE PHOENIX COLLECTIVE
            </p>
          </div>

          <div
            className="flex flex-col items-center text-center mt-16 cursor-pointer"
            onClick={() => navigateToSlide(4)}
          >
            <div className="relative w-14 h-14 bg-transparent rounded-full flex justify-center items-center group">
              <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] box-border shadow-[0_0_4px_2px_rgba(243,198,12,0.5),inset_0_0_3px_2px_rgba(243,198,12,0.5)] transition-transform duration-300 group-hover:scale-110"></span>
              <Image
                src={"/assets/images/hand.png"}
                alt="Person Icon"
                width={40}
                height={40}
              />
            </div>
            <p className="text-[0.5rem] sm:text-xs  max-w-52 sm:max-w-40 mt-2 text-white uppercase font-roboto_light">
              HOW OUR VALUES SHAPE EVERYTHING WE DO
            </p>
          </div>

          <div
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={() => navigateToSlide(3)}
          >
            <div className="relative w-14 h-14 bg-transparent rounded-full flex justify-center items-center group">
              <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] box-border shadow-[0_0_4px_2px_rgba(243,198,12,0.5),inset_0_0_3px_2px_rgba(243,198,12,0.5)] transition-transform duration-300 group-hover:scale-110"></span>
              <Image
                src={"/assets/images/bird.png"}
                alt="Person Icon"
                width={50}
                height={50}
              />
            </div>
            <p className="text-[0.5rem] sm:text-xs max-w-52 sm:max-w-40 mt-2 text-white uppercase font-roboto_light">
              CULTURE OF THE PHOENIX COLLECTIVE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
