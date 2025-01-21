"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "../common/button";
import { TbExternalLink } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import WriteLetterModal from "../common/write-letter-modal";
import RequestAssistanceModal from "../common/request-assistance-modal";
// import DonationModal from "../common/donation-modals";
import { usePathname, useRouter } from "next/navigation";
import { useSwiperContext } from "@/utils/use-swiper-context";
import NewDonationModal from "../common/new-donation-modal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsLetterModalOpen(true);
  };

  const closeModal = () => {
    setIsLetterModalOpen(false);
  };

  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };
  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  useEffect(() => {
    if (
      isMenuOpen &&
      menuRef.current &&
      linksRef.current &&
      buttonsRef.current &&
      socialIconsRef.current
    ) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.4,
          delay: 0.4,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        socialIconsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.2,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [isMenuOpen]);

  const { swiperRef } = useSwiperContext();

  const links = [
    { label: "Home", href: "/", action: () => router.push("/") },
    { label: "Letter", href: "#letter", action: openModal },
    { label: "Donation", href: "#donation", action: openDonationModal },
    {
      label: "Request Assistance",
      href: "#request-assistance",
      action: openRequestModal,
    },
    {
      label: "Board of Directors",
      href: "/board-of-directors",
      action: () => router.push("/board-of-directors"),
    },
  ];

  return (
    <>
      <div className="fixed h-24 w-full bg-transparent px-4 md:px-28 py-4 flex justify-between items-center z-30">
        <Image
          src={"/assets/logo.svg"}
          width={80}
          height={80}
          alt="logo"
          className="hover:scale-110 transition-transform duration-300 z-20 cursor-pointer"
          onClick={() => {
            if (pathname === "/") {
              if (swiperRef.current) {
                swiperRef.current.slideTo(0);
              }
            } else {
              router.push("/");
            }
          }}
        />

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="default"
            icon={<TbExternalLink size={18} />}
            className="hover:-translate-y-1 transition-transform duration-300"
            onClick={openModal}
          >
            Write A Letter
          </Button>
          <Button
            variant="default"
            icon={<TbExternalLink size={18} />}
            className="hover:-translate-y-1 transition-transform duration-300"
            onClick={openDonationModal}
          >
            Donate
          </Button>
          <Button
            variant="default"
            icon={<TbExternalLink size={18} />}
            className="hover:-translate-y-1 transition-transform duration-300"
            onClick={openRequestModal}
          >
            Volunteer
          </Button>
        </div>

        <div className="flex md:hidden items-center">
          <button
            className="text-white text-2xl focus:outline-none z-[999]"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX className="z-50" /> : <FiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-0 left-0 h-screen w-full bg-black bg-opacity-50 backdrop-blur-md z-30 flex flex-col items-center justify-center"
          >
            <div ref={linksRef} className="flex flex-col items-center gap-6">
              {links.map((link, index) => (
                <button
                  key={index}
                  className="text-white text-lg tracking-normal hover:text-yellow-500 transition"
                  onClick={() => {
                    toggleMenu();
                    link.action();
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div
              ref={buttonsRef}
              className="flex flex-col items-center gap-4 mt-8"
            >
              <Button
                variant="default"
                icon={<TbExternalLink size={18} />}
                onClick={openModal}
              >
                Write A Letter
              </Button>
              <Button
                variant="default"
                icon={<TbExternalLink size={18} />}
                onClick={openDonationModal}
              >
                Donate
              </Button>
              <Button
                variant="default"
                icon={<TbExternalLink size={18} />}
                onClick={openRequestModal}
              >
                Request Assistance
              </Button>
            </div>

            <div
              ref={socialIconsRef}
              className="flex flex-row items-center gap-4 mt-6"
            >
              <button
                className="w-10 h-10 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black text-white transition"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </button>

              <button
                className="w-10 h-10 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black text-white transition"
                aria-label="Tiktok"
              >
                <FaTiktok className="text-lg" />
              </button>

              <button
                className="w-10 h-10 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black transition text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>

      <WriteLetterModal isOpen={isLetterModalOpen} onClose={closeModal} />
      <NewDonationModal
        isOpen={isDonationModalOpen}
        onClose={closeDonationModal}
      />
      <RequestAssistanceModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
      />
    </>
  );
};

export default Navbar;


