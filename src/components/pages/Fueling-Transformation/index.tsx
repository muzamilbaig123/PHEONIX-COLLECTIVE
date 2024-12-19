"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { gsap } from "gsap";
import { FuelingTransfo } from "@/config/FuelingTransformation"


const FuelingTransformation = ({
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
                {FuelingTransfo.map((value, index) => (
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
                                className={`relative z-10 flex flex-col justify-center items-center py-10 text-white duration-300 text-center 
              scale-95 border border-[#f0c509] border-opacity-20 rounded-xl transition-transform md:group-hover:scale-95 
              md:group-hover:bg-opacity-90 overflow-hidden 
              ${value.backImg ? 'bg-cover bg-center' : 'bg-black bg-opacity-100 backdrop-blur-md'}`}
                                style={value.backImg ? { backgroundImage: value.backImg } : {}}
                            >
                                {/* Overlay */}
                                {value.backImg && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
                                )}

                                {/* Content */}
                                <div className="relative z-10 flex justify-center items-center w-16 h-[200px] rounded-full mb-6 text-4xl font-bold text-white border-3 px-1 py-6 border-[#f3c60c]">
                                    <span className="absolute inset-0 rounded-full h-[200px] border-[1px] border-[#f3c60c] box-border shadow-[0_0_12px_2px_rgba(243,198,12,0.5),inset_0_0_12px_2px_rgba(243,198,12,0.5)]"></span>
                                    <span className="relative z-10 px-4">${value.id}</span>
                                </div>
                                <h2 className="text-[22px] 4xl:text-xl font-cambria mb-4 px-1 relative z-10">
                                    {value.title}
                                </h2>
                                <p className="px-6 text-[14px] 2xl:text-sm font-light mb-4 leading-relaxed relative z-10">
                                    {value.description.split(" ").slice(0, 25).join(" ")}
                                </p>
                            {/* <button className="font-cambria py-2 px-6 bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  Read More
                </button> */}
                            </div>



                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FuelingTransformation;
