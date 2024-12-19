"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PortalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "power3.out" },
      onComplete,
    });

    timeline
      .set(contentRef.current, { opacity: 0 })
      .fromTo(
        portalRef.current,
        { scale: 0, opacity: 1 },
        { scale: 50, opacity: 0, delay: 0.3 }
      )
      .to(contentRef.current, { opacity: 1, duration: 0.8 }, "-=0.5");
  }, [onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        ref={portalRef}
        className="absolute inset-0 w-[200px] h-[200px] bg-yellow-500 rounded-full mx-auto my-auto z-50"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      ></div>

      <div
        ref={contentRef}
        className="w-full h-full flex justify-center items-center opacity-0"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Phoenix Collective
        </h1>
      </div>
    </div>
  );
};

export default PortalLoader;
