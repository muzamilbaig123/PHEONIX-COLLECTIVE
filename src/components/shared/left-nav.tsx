"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import WriteLetterModal from "../common/write-letter-modal";
import RequestAssistanceModal from "../common/request-assistance-modal";
// import DonationModal from "../common/donation-modals";
import Link from "next/link";
import NewDonationModal from "../common/new-donation-modal";

// interface LeftNavProps {
//   links: { label: string; href: string; action?: () => void }[];
// }

const LeftNav = () => {
  const navRef = useRef<HTMLDivElement>(null);

  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const openModal = () => setIsLetterModalOpen(true);
  const closeModal = () => setIsLetterModalOpen(false);

  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);

  const openDonationModal = () => setIsDonationModalOpen(true);
  const closeDonationModal = () => setIsDonationModalOpen(false);

  const links = [
    { label: "Directors", href: "/board-of-directors" },
    {
      label: "Assistance",
      href: "#request-assistance",
      action: openRequestModal,
    },
    { label: "Donation", href: "#donation", action: openDonationModal },
    { label: "Letter", href: "#letter", action: openModal },
    { label: "Home", href: "/" },
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.children,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div
      ref={navRef}
      className="w-full h-full flex flex-col justify-center items-center gap-20 z-50"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="text-white text-nowrap text-sm 2xl:text-base tracking-normal -rotate-90 hover:text-[#f6e54e] transition focus:outline-none"
          onClick={() => {
            if (link.action) {
              link.action();
            }
          }}
        >
          {link.label}
        </Link>
      ))}

      {/* Modals */}
      <WriteLetterModal isOpen={isLetterModalOpen} onClose={closeModal} />
      <NewDonationModal
        isOpen={isDonationModalOpen}
        onClose={closeDonationModal}
      />
      <RequestAssistanceModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
      />
    </div>
  );
};

export default LeftNav;
