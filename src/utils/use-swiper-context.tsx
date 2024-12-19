"use client";

import React, { createContext, useContext, useRef } from "react";
import { Swiper as SwiperInstance } from "swiper/types";

type SwiperContextType = {
  swiperRef: React.MutableRefObject<SwiperInstance | null>;
};

const SwiperContext = createContext<SwiperContextType | null>(null);

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error("useSwiperContext must be used within a SwiperProvider");
  }
  return context;
};

export const SwiperProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <SwiperContext.Provider value={{ swiperRef }}>
      {children}
    </SwiperContext.Provider>
  );
};
