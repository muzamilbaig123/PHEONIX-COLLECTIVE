"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useSwiperContext } from "@/utils/use-swiper-context";

const BottomBar = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { swiperRef } = useSwiperContext();

  useEffect(() => {
    if (pathname === "/" && barRef.current) {
      gsap.fromTo(
        barRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [pathname]);

  if (pathname !== "/") {
    return null;
  }

  const handleLogoClick = () => {
    if (pathname === "/") {
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 w-full bg-transparent h-24 flex justify-between items-center px-4 md:px-28 z-20"
    >
      <div className="flex items-center gap-4">
        <p className="flex items-start justify-center gap-2 text-white font-roboto_light tracking-wider text-sm md:text-lg">
          <span className="mt-3">PHOENIX</span>
          <Image
            src="/assets/logo.svg"
            alt="Phoenix Logo"
            width={40}
            height={40}
            className="hover:scale-125 transition-transform duration-300 cursor-pointer"
            onClick={handleLogoClick}
          />
          <span className="mt-3">COLLECTIVE</span>
        </p>
      </div>
    </div>
  );
};

export default BottomBar;
