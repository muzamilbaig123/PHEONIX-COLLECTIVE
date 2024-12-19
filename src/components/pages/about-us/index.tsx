"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = ({ isActive }: { isActive: boolean }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "power3.out" },
        });

        // Animate each letter in the title
        if (titleRef.current) {
          const letters = titleRef.current.querySelectorAll("span");
          tl.fromTo(
            letters,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: "power3.out" }
          );
        }

        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0 },
            "<0.1"
          );
        }

        textRefs.current.forEach((text, index) => {
          if (text) {
            tl.fromTo(
              text,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, delay: index * 0.3 },
              "<0.2"
            );
          }
        });
      });

      return () => ctx.revert();
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full px-8 lg:px-28 flex justify-center items-center"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-4 md:gap-8 lg:gap-16">
        <div
          ref={imageRef}
          className="flex-shrink-0 hover:scale-105 hover:brightness-110 transition-transform"
        >
          <Image
            src="/assets/images/fire-circle.svg"
            alt="A fiery phoenix circle representing transformation"
            width={200}
            height={200}
            className="w-40 h-40 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2
            ref={titleRef}
            className="text-xl md:text-3xl lg:text-4xl font-cambria text-yellow-500 mb-4 text-center"
          >
            {"About Us".split("").map((char, index) => (
              <span key={index} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p
            ref={(el) => {
              if (el) textRefs.current[0] = el;
            }}
            className="font-roboto_light text-xs md:text-base md:text-left leading-relaxed text-center"
          >
            The Phoenix Collective is named after the legendary phoenix—a
            creature of myth that is consumed by flames. We chose this symbol
            because it embodies the very essence of what we strive to achieve.
            In the heart of every person who faces despair, loss, or defeat,
            there lies a phoenix waiting to rise, to reclaim their life, and to
            soar.
          </p>
          <p
            ref={(el) => {
              if (el) textRefs.current[1] = el;
            }}
            className="font-roboto_light text-xs md:text-base md:text-left text-center leading-relaxed"
          >
            We are not just a nonprofit; we are a lifeline for those who feel
            like their world has crumbled. Our mission goes beyond merely
            helping—it&apos;s about transformation. Whether someone has lost
            their job, their hope, or their way, we step in to provide the
            resources, mentoring, and unwavering support they need to rebuild.
            We believe that every person deserves the chance to rise again, and
            we are here to make that possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
