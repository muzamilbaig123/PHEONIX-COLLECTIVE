"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { gsap } from "gsap"
// import Button from "./button"
import Link from "next/link"

type DonationSection = {
  title: string
  items: string[]
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const donationData: DonationSection[] = [
  {
    title: "Embers of Renewal",
    items: [
      "Grocery Sparks: Provide groceries to individuals and families facing food insecurity.",
      "Home Light Fund: Help cover rent or utilities to keep someone safe and stable.",
    ],
  },
  {
    title: "Bridges of Hope",
    items: [
      "Unemployment Bridge Fund: Assist individuals transitioning from job loss.",
      "Pathways to Opportunity: Cover costs for career coaching, resumes, or training.",
    ],
  },
  {
    title: "Dreams of Renewal",
    items: [
      "Phoenix Getaways: Fund vacations or short retreats to help individuals recharge and find clarity during challenging times.",
      "Safe Rest Program: Cover hotel or Airbnb stays for those in temporary need of shelter.",
    ],
  },
  {
    title: "Heart of Celebration",
    items: [
      "Gift of Joy: Fund Christmas or birthday gifts for individuals or families, bringing light to special moments.",
      "Celebration Sparks: Help create magical celebrations for milestones like graduations or reunions.",
    ],
  },
  {
    title: "Acts of Kindness Initiative",
    items: [
      "Phoenix Kindness Fund: Provide small, impactful acts of kindness, from gas money to a meal for someone in need.",
      "Everyday Miracles: Fund spontaneous gestures of hope, such as paying for groceries or transportation.",
    ],
  },
  {
    title: "Lanterns of Wellness",
    items: [
      "Mental Health Renewal Fund: Cover the cost of counseling or therapy sessions for those in need of support.",
      "Wellness Spark Fund: Support wellness programs like yoga, meditation, or fitness memberships to promote resilience.",
    ],
  },
  {
    title: "The Phoenix Business Starters",
    items: [
      "Dream Builders Fund: Provide startup funding for individuals launching small businesses.",
      "Tools of Transformation: Cover the costs of supplies, equipment, or licenses to help someone turn their passion into a career.",
    ],
  },
  {
    title: "The Lightbringer Fund",
    items: [
      "Crisis Relief: Offer urgent financial aid for those facing sudden challenges like medical bills or unexpected emergencies.",
      "Renewal Assistance: Help someone get back on their feet after a setback with personalized support.",
    ],
  },
  {
    title: "Starlight Journeys",
    items: [
      "Reconnection Fund: Help loved ones reunite by covering travel expenses or accommodations.",
      "Phoenix Retreats: Fund wellness getaways designed to help individuals find peace and renewal.",
    ],
  },
  {
    title: "Rising Foundations",
    items: [
      "Phoenix Housing Support: Cover temporary shelter for those in transition or escaping difficult situations.",
      "Starting Fresh Fund: Help individuals secure long-term stability through deposits or initial payments for housing.",
    ],
  },
  {
    title: "Kindred Phoenix Program",
    items: [
      "Supporting Fellow Sparks: Fund other nonprofits by providing grants or direct support to amplify their impact.",
      "Collaboration for Good: Partner with organizations to bring resources, tools, and hope to even more communities.",
    ],
  },
]

const NewDonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const smallBoxRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const smallBox = smallBoxRef.current
      const modal = modalRef.current

      if (smallBox && modal) {
        const tl = gsap.timeline()
        tl.fromTo(smallBox, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
          .to(
            smallBox,
            {
              scaleX: window.innerWidth / smallBox.offsetWidth,
              scaleY: window.innerHeight / smallBox.offsetHeight,
              duration: 0.6,
              ease: "power4.out",
            },
            "+=0.1",
          )
          .fromTo(modal, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
      }
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
      <div
        suppressHydrationWarning
        ref={smallBoxRef}
        className="absolute w-full h-full max-w-3xl max-h-[28rem] rounded-lg bg-black flex justify-center items-center"
      ></div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <video className="w-full h-full object-cover opacity-50 mix-blend-overlay" autoPlay loop muted playsInline>
          <source src={typeof window !== "undefined" ? "/assets/donate-overlay-small.mp4" : ""} type="video/mp4" />
        </video>
      </div>

      <div
        ref={modalRef}
        className="bg-transparent text-white flex flex-col items-center justify-start px-5 py-10 lg:p-10 w-full h-full relative z-10 overflow-y-auto"
      >
        <h2 className="mt-8 w-full lg:max-w-2xl text-white text-4xl lg:text-6xl font-bold text-left mb-8 uppercase leading-[3rem] lg:leading-[5rem] font-cambria">
          Help Us by Donating Today{" "}
          <div className="w-full flex items-center gap-2 font-roboto">
            {/* <Link
              href={"https://www.paypal.com/donate/?hosted_button_id=JRYWBGT8TH4Q2"}
              className="mt-2 inline-block"
            >
              DONATE NOW
            </Link> */}
          </div>
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {donationData.map((section, index) => (
            <div
              key={index}
              className="p-6 border border-white backdrop-blur-sm rounded-3xl bg-opacity-10 bg-black  transition-transform ease-in-out duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-yellow-400 font-cambria">{section.title}</h3>
              <ul className="list-disc ml-4">
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-md text-gray-300 leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href={"https://www.paypal.com/donate/?hosted_button_id=JRYWBGT8TH4Q2"}
          className="mt-8 px-8 py-4 bg-yellow-400 text-black text-xl font-bold rounded-full hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
        >
          DONATE NOW
        </Link>

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white text-xl font-bold"
          aria-label="Close donation modal"
        >
          BACK
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default NewDonationModal

