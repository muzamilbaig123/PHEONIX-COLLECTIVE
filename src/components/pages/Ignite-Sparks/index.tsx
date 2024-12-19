"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "@/components/common/button";
import { TbExternalLink } from "react-icons/tb";
import IgniteSparksDonationModal from "@/components/common/IgniteSparks-Modal";

const IgniteSparksDonation = ({
  isActive,
}: {
  isActive: boolean;
  navigateToSlide: (slideIndex: number) => void;
}) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const openDonationModal = () => {
    setIsDonationModalOpen(true); // Modal open karega
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false); // Modal close karega
  };




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
          {"Ignite Sparks of Hope and Transform Lives"
            .split("")
            .map((char, index) => (
              <span key={index} className="inline-block">
                {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
              </span>
            ))}
        </h1>
          <h2>Be a Constant Light in Someone’s Life</h2>
        <p
          ref={textRef}
          className="md:text-base text-sm leading-6 lg:leading-7 font-roboto_light tracking-wide max-w-[90%] md:max-w-2xl lg:max-w-3xl text-center"
        >
          Transformation doesn’t happen overnight, and neither does lasting change. By joining The Phoenix Collective as part of our Circle of Givers of Light, your contributions—whether one-time or recurring—become the steady flame that empowers individuals and families to rise, rebuild, and thrive.
        </p>
        <p
          ref={textRef}
          className="md:text-base text-sm leading-6 lg:leading-7 font-roboto_light tracking-wide max-w-[90%] md:max-w-2xl lg:max-w-3xl text-center"
        >
          From $1 to $3,000 or through monthly giving, your generosity fuels sustainable transformation and creates a ripple effect of hope in communities around the globe. Together, we can ignite sparks of renewal and turn challenges into opportunities for a brighter future.
        </p>
        <div className="w-full flex justify-evenly items-start gap-8 px-4 sm:px-0">
      <Button
        variant="default"
        icon={<TbExternalLink size={18} />}
        className="hover:-translate-y-1 transition-transform duration-300"
        onClick={openDonationModal} // Modal open karne ka function
      >
        Donate Now
      </Button>

      {/* Donation Modal */}
      <IgniteSparksDonationModal
        isOpen={isDonationModalOpen} // State ke basis par modal render hoga
        onClose={closeDonationModal} // Modal close karne ka function
      />
        </div>
     </div>
    </div>
  );
};

export default IgniteSparksDonation;

