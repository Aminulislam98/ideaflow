"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1758873272412-7166447a94ae?q=80&w=1920&auto=format&fit=crop",
    tag: "Start Here",
    heading: "Your next big idea\nstarts here.",
    sub: "Share what's in your head. The world is waiting.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1770233621425-5d9ee7a0a700?q=80&w=1920&auto=format&fit=crop",
    tag: "Innovation",
    heading: "Technology is just\nan idea executed.",
    sub: "Explore the ideas shaping tomorrow's world.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1920&auto=format&fit=crop",
    tag: "Collaborate",
    heading: "Great ideas grow\nwith great people.",
    sub: "Join a community of thinkers, builders and creators.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1760008486599-e62d30e2ca95?q=80&w=1920&auto=format&fit=crop",
    tag: "Create",
    heading: "Every invention\nbegan as a thought.",
    sub: "Turn your spark into something the world can see.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600443546015-f9b924a5b416?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Build",
    heading: "The best time to\nshare your idea is now.",
    sub: "Start small. Think big. Share freely.",
  },
];

export default function BannerSwiper() {
  const swiperRef = useRef(null);

  return (
    <section className="w-full relative">
      <style>{`
        .banner-swiper .swiper-pagination {
          bottom: 24px;
        }
        .banner-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 9999px;
        }
        .banner-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 3px;
          background: #fff;
        }
      `}</style>

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="banner-swiper w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen overflow-hidden">
              {/* Background Image */}
              <Image
                fill
                src={slide.image}
                alt={slide.heading}
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-10">
                <span className="inline-block text-[11px] font-medium tracking-[1.5px] uppercase text-white/60 border border-white/20 rounded-full px-3 py-1 mb-5">
                  {slide.tag}
                </span>
                <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold text-white tracking-[-0.03em] leading-[1.1] whitespace-pre-line mb-4 max-w-3xl">
                  {slide.heading}
                </h1>
                <p className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-normal text-white/60 tracking-[-0.01em] leading-relaxed max-w-md mb-8">
                  {slide.sub}
                </p>
                <Link
                  href="/ideas"
                  className="inline-flex items-center gap-2 text-[13px] font-normal tracking-[-0.1px] text-black bg-white hover:bg-white/90 px-6 py-2.5 rounded-full transition-all duration-150"
                >
                  Explore Ideas
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation — bottom right */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          <HiArrowLeft className="text-[13px]" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          <HiArrowRight className="text-[13px]" />
        </button>
      </div>
    </section>
  );
}
