"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CoreData } from "@/config/data";
import { gsap } from "gsap";

const CoreValuesSection = ({
  isCoreActive,
  onCardClick,
}: {
  isCoreActive: boolean;
  onCardClick: (content: { title: string; description: string }) => void;
}) => {
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (isCoreActive) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power3.out" },
        });

        if (titleRef.current) {
          const letters = titleRef.current.querySelectorAll("span");
          tl.fromTo(
            letters,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.03,
              ease: "power3.out",
            }
          );
        }

        slidesRef.current.forEach((slide, index) => {
          if (slide) {
            tl.fromTo(
              slide,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, delay: index * 0.2 },
              "<0.3"
            );
          }
        });
      });

      return () => ctx.revert();
    }
  }, [isCoreActive]);

  return (
    <div
      ref={swiperContainerRef}
      className="w-full h-auto flex flex-col items-center justify-center px-4 py-12 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/background.jpg')" }}
    >
      <h1
        ref={titleRef}
        className="md:max-w-xl mt-5 md:mt-0 lg:text-4xl text-xl capitalize font-cambria text-[#f3c60c] mb-5 text-center"
      >
        {"Core Values of Phoenix Collective".split("").map((char, index) => (
          <span key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <Swiper
        grabCursor={true}
        breakpoints={{
          0: {
            direction: "horizontal",
            slidesPerView: 1,
          },
          768: {
            direction: "horizontal",
            slidesPerView: 2,
          },
          1024: {
            direction: "horizontal",
            slidesPerView: 3,
          },
        }}
        className="w-full px-8 py-10"
      >
        {CoreData.map((value, index) => (
          <SwiperSlide
            key={value.id}
            className="flex justify-center items-center px-4 py-6 2xl:px-10 2xl:py-14"
            onClick={() => onCardClick(value)}
          >
            <div
              ref={(el) => {
                if (el) slidesRef.current[index] = el;
              }}
              className="relative group"
            >
              <div
                className="absolute inset-6 bg-gradient-to-r from-[#f3c60c] via-[#f3c60c] to-[#f3c60c] 
             opacity-100 blur-[20px] transition-opacity duration-300 
             group-hover:opacity-100 md:opacity-0"
              ></div>
              <div
                className="relative z-10 flex flex-col justify-center items-center py-10 bg-black 
             bg-opacity-100 backdrop-blur-md text-white duration-300 text-center 
             scale-95 border border-[#f0c509] border-opacity-20 rounded-xl 
             transition-transform md:group-hover:scale-95 md:group-hover:bg-opacity-90"
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-full mb-6 text-4xl font-bold text-white border-3 border-[#f3c60c] relative font-cambria">
                  <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] box-border shadow-[0_0_12px_2px_rgba(243,198,12,0.5),inset_0_0_12px_2px_rgba(243,198,12,0.5)]"></span>
                  <span className="relative z-10">{value.id}</span>
                </div>
                <h2 className="text-lg 2xl:text-xl font-cambria mb-4 ">
                  {value.title}
                </h2>
                <p className="px-6 text-xs 2xl:text-sm font-light mb-4 leading-relaxed">
                  {value.description.split(" ").slice(0, 25).join(" ")}...
                </p>
                <button className="font-cambria py-2 px-6 bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  Read More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoreValuesSection;
