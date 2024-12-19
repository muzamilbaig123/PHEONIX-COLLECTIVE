"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import DirectorModal from "@/components/shared/director-modal";

interface BoardMember {
  name: string;
  title: string;
  description: string;
  bio: string;
  image: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Eleanor Brightflame",
    title: "Keeper of the Bridge",
    description:
      "The eternal guardian who ensures safe passage and connection between realms.",
    bio: "Eleanor, with wisdom forged in the fires of experience, builds bridges—both literal and metaphorical. Her strategic vision enables the Phoenix Collective to transcend boundaries.",
    image: "/assets/images/hand.png",
  },
  {
    name: "Magnus Stoneseer",
    title: "Guardian of the Treasure Chest",
    description:
      "Protector of the sacred treasury, ensuring the lifeblood of the realm flows unbroken.",
    bio: "Magnus channels the strength of the mountains to safeguard the Collective’s resources, ensuring prosperity for generations to come.",
    image: "/assets/images/hand.png",
  },
  {
    name: "Seraphina Skywhisper",
    title: "Seeker of the Stars",
    description:
      "The illuminator of the path forward, uncovering hidden realms of possibility.",
    bio: "Seraphina’s intuitive brilliance allows her to find clarity in chaos. She charts the Collective’s course through the unknown, guided by the stars.",
    image: "/assets/images/hand.png",
  },
  {
    name: "Orion Flameguard",
    title: "Warden of Eternal Flames",
    description:
      "The keeper of the eternal fire, ensuring its flame never dies.",
    bio: "Orion protects the spirit and energy of the Phoenix Collective, fueling its everlasting passion and resolve.",
    image: "/assets/images/hand.png",
  },
];

const BoardOfDirectors: React.FC = () => {
  const [swiperDirection, setSwiperDirection] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [selectedDirector, setSelectedDirector] = useState<BoardMember | null>(
    null
  ); // Track selected director
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

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

  const handleCardClick = (member: BoardMember) => {
    setSelectedDirector(member); // Set the clicked director
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedDirector(null); // Clear the selected director
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="absolute inset-0 min-h-screen text-white flex flex-col items-center pt-28 px-6 md:px-20 z-20">
      <h1 className="lg:text-4xl text-xl capitalize font-cambria text-[#f3c60c] max-w-xl text-center">
        The Elite Council of The Phoenix Collective
      </h1>

      <Swiper
        modules={[FreeMode, Mousewheel]}
        direction={swiperDirection}
        spaceBetween={60}
        slidesPerView={swiperDirection === "horizontal" ? 3 : 1}
        mousewheel={{
          releaseOnEdges: true,
          sensitivity: 3,
        }}
        className="w-full max-w-screen-xl h-screen mt-10"
      >
        {boardMembers.map((member) => (
          <SwiperSlide
            key={member.name}
            className="!w-[300px] flex-shrink-0 relative bg-[#202020] rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => handleCardClick(member)} // Handle click
          >
            <div className="relative">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2 font-cinzel_decorative">
                {member.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {selectedDirector && (
        <DirectorModal
          isOpen={isModalOpen}
          onClose={closeModal}
          director={{
            name: selectedDirector.name,
            role: selectedDirector.title,
            description: selectedDirector.bio,
            image: selectedDirector.image,
          }}
        />
      )}
    </div>
  );
};

export default BoardOfDirectors;
