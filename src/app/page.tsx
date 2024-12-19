"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper as SwiperInstance } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Mousewheel, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HeroSection from "@/components/pages/hero";
import ValuesSection from "@/components/pages/values-and-culture";
import CoreValuesSection from "@/components/pages/core-values";
import CultureSection from "@/components/pages/culture";
import ValuesShapeSection from "@/components/pages/values-shape";
import AboutUsSection from "@/components/pages/about-us";
import MissionSection from "@/components/pages/mission-statement";
import Modal from "@/components/shared/modal";
import { useSwiperContext } from "@/utils/use-swiper-context";
import IgniteSparksDonation from "@/components/pages/Ignite-Sparks";

const Home: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialCheckComplete, setIsInitialCheckComplete] =
    useState<boolean>(false);
  const [swiperDirection, setSwiperDirection] = useState<
    "horizontal" | "vertical"
  >("horizontal");

  const [isValuesActive, setIsValuesActive] = useState<boolean>(false);
  const [isCoreValuesActive, setIsCoreValuesActive] = useState<boolean>(false);
  const [isCultureActive, setIsCultureActive] = useState<boolean>(false);
  const [isValuesShapeActive, setIsValuesShapeActive] =
    useState<boolean>(false);
  const [isAboutUsActive, setIsAboutUsActive] = useState<boolean>(false);
  const [isMissionActive, setIsMissionActive] = useState<boolean>(false);

  const preloaderRef = useRef<HTMLDivElement>(null);
  const videoSrc = "/assets/pheonix-compress.mp4";

  const [progress, setProgress] = useState(0);
  const [showBeginButton, setShowBeginButton] = useState(false);
  const { swiperRef } = useSwiperContext();

  useEffect(() => {
    const isPreloaderShown = sessionStorage.getItem("preloaderShown");

    if (!isPreloaderShown) {
      sessionStorage.setItem("preloaderShown", "true");
      setIsLoading(true);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowBeginButton(true);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }

    setIsInitialCheckComplete(true);
  }, []);

  const handleBeginClick = () => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setIsInitialCheckComplete(true);
      },
    });

    timeline.to(preloaderRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
    });
  };

  const handleSlideChange = (swiper: SwiperInstance): void => {
    const activeIndex = swiper.activeIndex;

    setIsAboutUsActive(activeIndex === 1);
    setIsMissionActive(activeIndex === 2);
    setIsValuesActive(activeIndex === 3);
    setIsCoreValuesActive(activeIndex === 4);
    setIsCultureActive(activeIndex === 5);
    setIsValuesShapeActive(activeIndex === 6);

    setIsVideoVisible(activeIndex === 0);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeContent, setActiveContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const updateSwiperDirection = () => {
      if (window.innerWidth < 768) {
        setSwiperDirection("vertical");
      } else {
        setSwiperDirection("horizontal");
      }
    };

    updateSwiperDirection();

    window.addEventListener("resize", updateSwiperDirection);

    return () => {
      window.removeEventListener("resize", updateSwiperDirection);
    };
  }, []);

  const handleCustomNavigation = (targetIndex: number) => {
    if (swiperInstance) {
      const currentSlide = swiperInstance.slides[swiperInstance.activeIndex];
      const targetSlide = swiperInstance.slides[targetIndex];

      gsap.set(targetSlide, {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });

      gsap.to(currentSlide, {
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          swiperInstance.slideTo(targetIndex, 0);

          gsap.set(currentSlide, { opacity: 1, scale: 1, filter: "none" });

          gsap.fromTo(
            targetSlide,
            {
              opacity: 0,
              visibility: "hidden",
              scale: 1,
              pointerEvents: "none",
            },
            {
              opacity: 1,
              visibility: "visible",
              scale: 1,
              pointerEvents: "all",
              duration: 1.2,
              ease: "power3.out",
            }
          );
        },
      });
    }
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperRef.current = swiperInstance;
    }
  }, [swiperInstance, swiperRef]);

  if (!isInitialCheckComplete && !isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isLoading ? (
        <div
          ref={preloaderRef}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >
          <div className="absolute top-10 text-center">
            <p className="text-white text-lg font-normal tracking-widest">
              PHOENIX
            </p>
            <p className="text-white text-lg font-normal tracking-widest">
              COLLECTIVE
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              className="relative w-52 h-52 cursor-pointer rounded-full flex items-center justify-center"
              onClick={handleBeginClick}
            >
              {showBeginButton && (
                <div className="absolute inset-[-20px] rounded-full border-[2px] border-white opacity-40 animate-pulse-slow"></div>
              )}

              <div
                className={`absolute inset-0 rounded-full border-[2px] border-white border-opacity-80 ${
                  showBeginButton ? "animate-spin-slow" : ""
                }`}
              ></div>
              <div className="absolute inset-1 rounded-full border-[1px] border-white opacity-50"></div>
              <div className="absolute inset-2 rounded-full border-[1px] border-white opacity-30"></div>
              <div className="absolute inset-3 rounded-full border-[1px] border-white opacity-20"></div>

              {showBeginButton ? (
                <span className="text-white text-sm font-semibold tracking-widest">
                  BEGIN
                </span>
              ) : (
                <span className="text-white text-lg font-normal absolute">
                  {progress}%
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-10 overflow-hidden"></div>
          <div
            className={`absolute inset-0 transition-opacity duration-500  ${
              isVideoVisible ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          <div className="absolute inset-0 flex justify-center items-center z-20">
            <Swiper
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              onSlideChange={handleSlideChange}
              direction={swiperDirection}
              slidesPerView={1}
              spaceBetween={30}
              centeredSlides={true}
              mousewheel={{
                releaseOnEdges: true,
                sensitivity: 3,
                thresholdDelta: 20,
                thresholdTime: 1000,
              }}
              modules={[Mousewheel, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <HeroSection />
              </SwiperSlide>
              <SwiperSlide>
                <AboutUsSection isActive={isAboutUsActive} />
              </SwiperSlide>
              <SwiperSlide>
                <MissionSection isActive={isMissionActive} />
              </SwiperSlide>
              <SwiperSlide>
                <ValuesSection
                  isActive={isValuesActive}
                  navigateToSlide={handleCustomNavigation}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CoreValuesSection
                  isCoreActive={isCoreValuesActive}
                  onCardClick={(content) => {
                    setActiveContent(content);
                    setIsModalOpen(true);
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CultureSection
                  isActive={isCultureActive}
                  onCardClick={(content) => {
                    setActiveContent(content);
                    setIsModalOpen(true);
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ValuesShapeSection isActive={isValuesShapeActive} />
              </SwiperSlide>

              {/* lastly add */}

              <SwiperSlide>
                <IgniteSparksDonation
                  isActive={isValuesActive}
                  navigateToSlide={handleCustomNavigation}
                />
              </SwiperSlide>

            </Swiper>

            <div className="absolute bottom-7 md:bottom-6 right-8 flex flex-col items-center gap-2 z-40">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (swiperInstance && swiperInstance.activeIndex > 0) {
                      handleCustomNavigation(swiperInstance.activeIndex - 1);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white transition cursor-pointer hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]"
                  aria-label="Previous Slide"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={() => {
                    if (
                      swiperInstance &&
                      swiperInstance.activeIndex <
                        swiperInstance.slides.length - 1
                    ) {
                      handleCustomNavigation(swiperInstance.activeIndex + 1);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white transition cursor-pointer hover:text-[#f3c60c] hover:border-[#f3c60c] hover:box-border hover:shadow-[0_0_10px_2px_rgba(243,198,12,0.5),inset_0_0_10px_2px_rgba(243,198,12,0.5)]"
                  aria-label="Next Slide"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </div>
              <p className="hidden md:block text-white text-xs font-roboto_light tracking-widest select-none">
                Explore More
              </p>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={activeContent}
          />
        </>
      )}
    </div>
  );
};

export default Home;
