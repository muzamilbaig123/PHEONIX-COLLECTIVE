"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MissionSection = ({ isActive }: { isActive: boolean }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power3.out" },
        });

        if (titleRef.current) {
          const letters = titleRef.current.querySelectorAll("span");
          tl.fromTo(
            letters,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.03, ease: "power3.out" }
          );
        }

        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0 },
            "<0.2"
          );
        }

        if (textRef.current) {
          tl.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0 },
            "<0.3"
          );
        }

        if (videoRef.current) {
          tl.fromTo(
            videoRef.current,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0 },
            "<0.1"
          );
        }
      });

      return () => ctx.revert();
    }
  }, [isActive]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full px-8 lg:px-28 py-16 flex justify-center items-center text-white relative"
    >
      <div className="relative z-10 flex flex-col-reverse md:flex-col lg:flex-row items-center gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col items-center lg:items-start max-w-2xl">
          <h2
            ref={titleRef}
            className="text-xl md:text-3xl lg:text-4xl font-cambria text-[#f3c60c] mb-2"
          >
            {"MISSION STATEMENT".split("").map((char, index) => (
              <span key={index} className="inline-block">
                {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
              </span>
            ))}
          </h2>
          <h3
            ref={subtitleRef}
            className="lg:text-left text-center text-sm md:text-lg text-[#f3c60c] mb-2 font-cambria uppercase"
          >
            A Creature of Myth That Rises From its own Ashes
          </h3>
          <p
            ref={textRef}
            className="lg:text-left text-center font-roboto_light text-xs md:text-base leading-relaxed"
          >
            At The Phoenix Collective, we are driven by the belief that from the
            deepest struggles, the most radiant strength can emerge. Our mission
            is to be the spark that reignites hope, helping those who have been
            brought low by life&apos;s challenges rise from the ashes and
            reclaim their power. We exist to support, uplift, and transform
            lives, providing the tools and guidance needed to rebuild and soar
            to new heights. In a world where many feel abandoned or forgotten,
            we break through the barriers of traditional charity by offering
            personalized support to anyone in need. Because within every setback
            lies the potential for a greater comeback.
          </p>
        </div>

        <div
          ref={videoRef}
          className="relative flex-shrink-0 hover:scale-105 hover:brightness-110 transition-transform rounded-2xl"
        >
          <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] border-opacity-30 box-border shadow-[0_0_15px_2px_rgba(243,198,12,0.5),inset_0_0_3px_2px_rgba(243,198,12,0.5)] transition-transform duration-300 group-hover:scale-110"></span>
          <video
            src="/assets/videos/mission.mp4"
            width={300}
            height={300}
            loop
            controls
            className="w-48 h-48 lg:w-96 lg:h-96 object-contain rounded-full border border-[#f3c60c] border-opacity-30"
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "screen",
            }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;

