// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";
// // import { Testimonilas } from "@/config/data";
// // import { gsap } from "gsap";

// // const TestimonialsVideos = ({
// // //   isCoreActive,
// // //   onCardClick,
// // // }: {
// // //   isCoreActive: boolean;
// // //   onCardClick: (content: { title: string; description: string }) => void;
// // // }) => {
// // //   const swiperContainerRef = useRef<HTMLDivElement | null>(null);
// // //   const titleRef = useRef<HTMLHeadingElement | null>(null);
// // //   const slidesRef = useRef<HTMLDivElement[]>([]);

// // //   useEffect(() => {
// // //     if (isCoreActive) {
// // //       const ctx = gsap.context(() => {
// // //         const tl = gsap.timeline({
// // //           defaults: { duration: 1, ease: "power3.out" },
// // //         });

// // //         if (titleRef.current) {
// // //           const letters = titleRef.current.querySelectorAll("span");
// // //           tl.fromTo(
// // //             letters,
// // //             {
// // //               y: 20,
// // //               opacity: 0,
// // //             },
// // //             {
// // //               y: 0,
// // //               opacity: 1,
// // //               duration: 1,
// // //               stagger: 0.03,
// // //               ease: "power3.out",
// // //             }
// // //           );
// // //         }

// // //         slidesRef.current.forEach((slide, index) => {
// // //           if (slide) {
// // //             tl.fromTo(
// // //               slide,
// // //               { opacity: 0, y: 30 },
// // //               { opacity: 1, y: 0, delay: index * 0.2 },
// // //               "<0.3"
// // //             );
// // //           }
// // //         });
// // //       });

// // //       return () => ctx.revert();
// // //     }
// // //   }, [isCoreActive]);

// // //   return (
// // //     <div
// // //       ref={swiperContainerRef}
// // //       className="w-full h-auto flex flex-col items-center justify-center px-4 py-12 bg-cover bg-center bg-fixed"
// // //       style={{ backgroundImage: "url('/assets/background.jpg')" }}
// // //     >
// // //       {/* <h1
// // //         ref={titleRef}
// // //         className="md:max-w-xl mt-5 md:mt-0 lg:text-4xl text-xl capitalize font-cambria text-[#f3c60c] mb-5 text-center"
// // //       >
// // //         {"Real Voices, Real Impact".split("").map((char, index) => (
// // //           <span key={index} className="inline-block">
// // //             {char === " " ? "\u00A0" : char}
// // //           </span>
// // //         ))}
// // //       </h1> */}



// // //       {/* <Swiper
// // //         grabCursor={true}
// // //         breakpoints={{
// // //           0: {
// // //             direction: "horizontal",
// // //             slidesPerView: 1,
// // //           },
// // //           768: {
// // //             direction: "horizontal",
// // //             slidesPerView: 2,
// // //           },
// // //           1024: {
// // //             direction: "horizontal",
// // //             slidesPerView: 3,
// // //           },
// // //         }}
// // //         className="w-full px-8 py-10"
// // //       >
// // //         {Testimonilas.map((value, index) => (
// // //           <SwiperSlide
// // //             key={value.id}
// // //             className="flex justify-center items-center px-4 py-6 2xl:px-10 2xl:py-14"
// // //             onClick={() => onCardClick(value)}
// // //           >
// // //             <div
// // //               ref={(el) => {
// // //                 if (el) slidesRef.current[index] = el;
// // //               }}
// // //               className="relative group" style={{height: "400px", overflow: "hidden"}}
// // //             >
// // //               <div
// // //                 className="absolute inset-6 bg-gradient-to-r from-[#f3c60c] via-[#f3c60c] to-[#f3c60c] 
// // //              opacity-100 blur-[20px] transition-opacity duration-300 
// // //              group-hover:opacity-100 md:opacity-0"
// // //               ></div>
// // //               <div
// // //                 className="relative z-10 flex flex-col justify-start items-center py-10 bg-black 
// // //              bg-opacity-100 backdrop-blur-md text-white duration-300 text-center 
// // //              scale-95 border border-[#f0c509] border-opacity-20 rounded-xl 
// // //              transition-transform md:group-hover:scale-95 md:group-hover:bg-opacity-90" style={{height: "100%"}}
// // //               >
// // //                 <div className="flex justify-center items-center w-16 h-16 rounded-full mb-6 text-4xl font-bold text-white border-3 border-[#f3c60c] relative font-cambria">
// // //                   <span className="absolute inset-0 rounded-full border-[1px] border-[#f3c60c] box-border shadow-[0_0_12px_2px_rgba(243,198,12,0.5),inset_0_0_12px_2px_rgba(243,198,12,0.5)]"></span>
// // //                   <span className="relative z-10">{value.id}</span>
// // //                 </div>
// // //                 <h2 className="text-lg 2xl:text-xl font-cambria mb-4 px-2">
// // //                   {value.title}
// // //                 </h2>
// // //                 <p className="px-6 text-sm 2xl:text-sm font-light mb-4 leading-relaxed pt-6">
// // //                   {value.description.split(" ").slice(0, 25).join(" ")}...
// // //                 </p>
// // //                 <video src="assets/test1.mp4"></video>
// // //               </div>
// // //             </div>
// // //           </SwiperSlide>
// // //         ))}
// // //       </Swiper> */}



// // //         <Swiper
// // //           grabCursor={true}
// // //           breakpoints={{
// // //             0: {
// // //               direction: "horizontal",
// // //               slidesPerView: 1,
// // //             },
// // //             768: {
// // //               direction: "horizontal",
// // //               slidesPerView: 2,
// // //             },
// // //             1024: {
// // //               direction: "horizontal",
// // //               slidesPerView: 3,
// // //             },
// // //           }}
// // //           className="w-full px-8 py-10"
// // //         >
          
// // // <SwiperSlide>
// // //           <div style={{border: "2px solid red"}}>
// // //           <video src="assets/test1.mp4" height={"400px"} controls></video>
// // //           </div>

// // // </SwiperSlide>

// // //         </Swiper>


// // //     // </div>
// // //   );
// // };

// // export default TestimonialsVideos;



// // export default function TestimonialsVideos () {
// //   return (
// //     <>
// //       <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
// //         <div style={{width: "30%", height: "360px", aspectRatio: "4/3"}}>
// //           <video src="assets/test1.mp4" width={"100%"} height={"360px"}></video>
// //         </div>
// //         <div style={{width: "30%", height: "360px"}}>
// //           <video src="assets/test2.mp4" height={"360px"} width={"100%"}></video>
// //         </div>
// //         <div style={{width: "30%", height: "360px"}}>
// //           <video src="assets/test3.mp4" height={"360px"} width={"100%"}></video>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }




// 'use client'

// import React, { useRef, useCallback } from 'react'
// import { Play } from 'lucide-react'

// export default function TestimonialsVideos() {
//   const videos = [
//     'assets/test1.mp4',
//     'assets/test2.mp4',
//     'assets/test3.mp4'
//   ]

//   const VideoPlayer = ({ src }: { src: string }) => {
//     const videoRef = useRef<HTMLVideoElement>(null)

//     const enterFullscreen = useCallback(() => {
//       const element = videoRef.current
//       if (element) {
//         if (element.requestFullscreen) {
//           element.requestFullscreen()
//         } else if ((element as any).webkitRequestFullscreen) {
//           (element as any).webkitRequestFullscreen()
//         } else if ((element as any).msRequestFullscreen) {
//           (element as any).msRequestFullscreen()
//         }
//         element.play()
//       }
//     }, [])

//     return (
//       <div className="relative w-full h-full group bg-black border-[#f3c60c] box-border shadow-[0_0_4px_2px_rgba(243,198,12,0.5),inset_0_0_3px_2px_rgba(243,198,12,0.5)] transition-transform duration-300 group-hover:scale-110">
//         <video
//           ref={videoRef}
//           src={src}
//           className="absolute inset-0 w-full h-full object-cover transition-shadow duration-300 ease-in-out group-hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)]"
//         />
//         <button
//           onClick={enterFullscreen}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-4 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
//           aria-label="Play video"
//         >
//           <Play className="w-8 h-8 text-black" />
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 h-full">
//       <div className="grid grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <div 
//             key={index} 
//             className="w-[80%]"
//             style={{
//               height: "420px",
//               aspectRatio: "4/3"
//             }}
//           >
//             <VideoPlayer src={video} />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// import { useState, useEffect } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const TestimonialsVideos = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const videos = [
//     {
//       id: 1,
//       url: "assets/test1.mp4",
//       title: "Nature Video 1"
//     },
//     {
//       id: 2,
//       url: "assets/test2.mp4",
//       title: "Nature Video 2"
//     },
//     {
//       id: 3,
//       url: "assets/test3.mp4",
//       title: "Nature Video 3"
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === videos.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? videos.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full max-w-4xl mx-auto h-[80vh] overflow-hidden bg-gray-900 rounded-xl shadow-2xl">
//       <div className="relative w-full h-full">
//         <div
//           className="absolute w-full h-full transition-transform duration-500 ease-out"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//             perspective: "1000px"
//           }}
//         >
//           {videos.map((video, index) => (
//             <div
//               key={video.id}
//               className="absolute top-0 w-full h-full"
//               style={{
//                 left: `${index * 100}%`,
//                 transform: `translateZ(${index === currentIndex ? "0" : "-100px"}) rotateY(${(index - currentIndex) * 45}deg)`,
//                 transition: "all 0.5s ease-out"
//               }}
//             >
//               <video
//                 className="object-cover w-full h-full"
//                 src={video.url}
//                 title={video.title}
//                 autoPlay
//                 loop
//                 controls
//                 playsInline
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={prevSlide}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
//         >
//           <FaChevronLeft className="w-6 h-6" />
//         </button>

//         <button
//           onClick={nextSlide}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
//         >
//           <FaChevronRight className="w-6 h-6" />
//         </button>

//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {videos.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"}`}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsVideos;



"use client"

import { useState, useRef } from "react"
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa"

const TestimonialsVideos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  // Create a properly typed ref for the video elements
  const videoRefs = useRef<HTMLVideoElement[]>([])

  const videos = [
    {
      id: 1,
      url: "assets/videos/test1.mp4",
      title: "Nature Video 1"
    },
    {
      id: 2,
      url: "assets/videos/test2.mp4",
      title: "Nature Video 2"
    },
    {
      id: 3,
      url: "assets/videos/test3.mp4",
      title: "Nature Video 3"
    }
  ]

  const handleVideoPlay = () => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].play()
      setIsPlaying(true)
    }
  }

  const stopAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
    setIsPlaying(false)
  }

  const nextSlide = () => {
    stopAllVideos()
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    stopAllVideos()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[80%] overflow-hidden rounded-xl shadow-3xl box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
      <div className="relative w-full h-full">
        <div
          className="absolute w-full h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            perspective: "1000px"
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="absolute top-0 w-full h-full"
              style={{
                left: `${index * 100}%`,
                transform: `translateZ(${index === currentIndex ? "0" : "-100px"}) rotateY(${(index - currentIndex) * 45}deg)`,
                transition: "all 0.5s ease-out"
              }}
            >
              <video
                ref={el => {
                  if (el) {
                    videoRefs.current[index] = el
                  }
                }}
                className="object-cover w-full h-full"
                src={video.url}
                title={video.title}
                loop
                controls={isPlaying && index === currentIndex}
                playsInline
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && index === currentIndex && (
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30 hover:bg-black/40 transition-colors group"
                >
                  <FaPlay className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopAllVideos()
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsVideos

